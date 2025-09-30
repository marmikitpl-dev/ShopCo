import verticalStripedImg from '../../../assets/images/products/VerticalStripped.png'
import courageImg from '../../../assets/images/products/Courage.png'
import bermudaImg from '../../../assets/images/products/Bermuda.png'
import fadedSkinnyJeansImg from '../../../assets/images/products/FadedSkinnyJeans.png'

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
}

const TopSelling = () => {
  // Hardcoded data - easily replaceable with API data
  const products: Product[] = [
    {
      id: 1,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      discount: 20,
      rating: 5.0,
      image: verticalStripedImg
    },
    {
      id: 2,
      name: "Courage Graphic T-shirt",
      price: 145,
      rating: 4.0,
      image: courageImg
    },
    {
      id: 3,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      rating: 3.0,
      image: bermudaImg
    },
    {
      id: 4,
      name: "Faded Skinny Jeans",
      price: 210,
      rating: 4.5,
      image: fadedSkinnyJeansImg
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">TOP SELLING</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image */}
              <div className="bg-gray-100 rounded-2xl mb-4 overflow-hidden aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-black">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-600">{product.rating}/5</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-black">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>
                      <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="border-2 border-gray-200 text-black px-12 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;