import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0,
    min: [0, 'Level cannot be negative']
  },
  image: {
    url: {
      type: String,
      trim: true
    },
    alt: {
      type: String,
      trim: true
    }
  },
  icon: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot be more than 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot be more than 160 characters']
    }
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
categorySchema.index({ name: 1 });
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1, isActive: 1 });
categorySchema.index({ level: 1, sortOrder: 1 });

// Virtual for full path (breadcrumb)
categorySchema.virtual('fullPath', {
  ref: 'Category',
  localField: 'parent',
  foreignField: '_id',
  justOne: true
});

// Virtual for children categories
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for product count
categorySchema.virtual('productCount', {
  ref: 'Product',
  localField: 'name',
  foreignField: 'category',
  count: true
});

// Pre-save middleware to generate slug and set level
categorySchema.pre('save', async function(next) {
  // Generate slug if name is modified
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Set level based on parent
  if (this.isModified('parent')) {
    if (this.parent) {
      const parentCategory = await this.constructor.findById(this.parent);
      if (parentCategory) {
        this.level = parentCategory.level + 1;
      }
    } else {
      this.level = 0;
    }
  }

  next();
});

// Static method to get category tree
categorySchema.statics.getCategoryTree = async function(parentId = null) {
  const categories = await this.find({ 
    parent: parentId, 
    isActive: true 
  }).sort({ sortOrder: 1, name: 1 });

  const categoryTree = [];
  for (const category of categories) {
    const children = await this.getCategoryTree(category._id);
    categoryTree.push({
      ...category.toObject(),
      children
    });
  }

  return categoryTree;
};

// Static method to get all descendants
categorySchema.statics.getDescendants = async function(categoryId) {
  const descendants = [];
  const children = await this.find({ parent: categoryId });
  
  for (const child of children) {
    descendants.push(child);
    const childDescendants = await this.getDescendants(child._id);
    descendants.push(...childDescendants);
  }
  
  return descendants;
};

const Category = mongoose.model('Category', categorySchema);

export default Category;
