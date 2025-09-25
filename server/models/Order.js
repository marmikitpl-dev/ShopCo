import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productSku: {
    type: String,
    required: true,
    trim: true
  },
  productImage: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [0, 'Unit price cannot be negative']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  variants: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }]
});

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true,
    default: 'United States'
  },
  phone: {
    type: String,
    trim: true
  }
});

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery', 'bank_transfer'],
    default: 'credit_card'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    trim: true
  },
  paymentIntentId: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Payment amount cannot be negative']
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true
  },
  paidAt: Date,
  refundedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Refunded amount cannot be negative']
  },
  refundedAt: Date
});

const shippingSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['standard', 'express', 'overnight', 'pickup'],
    default: 'standard'
  },
  carrier: {
    type: String,
    trim: true
  },
  trackingNumber: {
    type: String,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    min: [0, 'Shipping cost cannot be negative'],
    default: 0
  },
  estimatedDelivery: Date,
  shippedAt: Date,
  deliveredAt: Date
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  taxAmount: {
    type: Number,
    required: true,
    min: [0, 'Tax amount cannot be negative'],
    default: 0
  },
  shippingAmount: {
    type: Number,
    required: true,
    min: [0, 'Shipping amount cannot be negative'],
    default: 0
  },
  discountAmount: {
    type: Number,
    min: [0, 'Discount amount cannot be negative'],
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true
  },
  billingAddress: {
    type: addressSchema,
    required: true
  },
  shippingAddress: {
    type: addressSchema,
    required: true
  },
  payment: paymentSchema,
  shipping: shippingSchema,
  couponCode: {
    type: String,
    trim: true,
    uppercase: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  internalNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Internal notes cannot be more than 1000 characters']
  },
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],
  cancelledAt: Date,
  cancelReason: {
    type: String,
    trim: true
  },
  refundedAt: Date,
  refundReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for order total items count
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for full customer name
orderSchema.virtual('customerName').get(function() {
  return `${this.billingAddress.firstName} ${this.billingAddress.lastName}`;
});

// Pre-save middleware to generate order number and calculate totals
orderSchema.pre('save', async function(next) {
  // Generate order number if new order
  if (this.isNew && !this.orderNumber) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }

  // Calculate totals
  if (this.isModified('items') || this.isModified('shippingAmount') || this.isModified('taxAmount') || this.isModified('discountAmount')) {
    this.subtotal = this.items.reduce((total, item) => total + item.totalPrice, 0);
    this.totalAmount = this.subtotal + this.shippingAmount + this.taxAmount - this.discountAmount;
  }

  // Add status to history if status changed
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: `Order status changed to ${this.status}`
    });
  }

  next();
});

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function(startDate, endDate) {
  const matchStage = {};
  if (startDate && endDate) {
    matchStage.createdAt = { $gte: startDate, $lte: endDate };
  }

  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$totalAmount' },
        averageOrderValue: { $avg: '$totalAmount' },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);

  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  };
};

// Instance method to update status
orderSchema.methods.updateStatus = function(newStatus, note = '', updatedBy = null) {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    timestamp: new Date(),
    note,
    updatedBy
  });

  // Set specific timestamps based on status
  switch (newStatus) {
    case 'shipped':
      this.shipping.shippedAt = new Date();
      break;
    case 'delivered':
      this.shipping.deliveredAt = new Date();
      break;
    case 'cancelled':
      this.cancelledAt = new Date();
      break;
    case 'refunded':
      this.refundedAt = new Date();
      break;
  }

  return this.save();
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
