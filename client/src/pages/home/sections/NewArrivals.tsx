import tapeDetailsImg from '../../../assets/images/products/TapeDetails.png'
import skinnyFitJeansImg from '../../../assets/images/products/SkinnyFitJeans.png'
import checkeredShirtImg from '../../../assets/images/products/CheckeredShirt.png'
import sleeveStripedImg from '../../../assets/images/products/SleevStripedT.png'

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
}

const NewArrivals = () => {
  // Hardcoded data - easily replaceable with API data
  const products: Product[] = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      price: 120,
      rating: 4.5,
      image: tapeDetailsImg
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      image: skinnyFitJeansImg
    },
    {
      id: 3,
      name: "Checkered Shirt",
      price: 180,
      rating: 4.5,
      image: checkeredShirtImg
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      image: sleeveStripedImg
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-6">NEW ARRIVALS</h2>
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

export default NewArrivals;