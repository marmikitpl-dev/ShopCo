import heroImage from '../../../assets/images/hero/hero_image.png'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white min-h-[600px]">
      {/* Background image */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[75%_center]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl flex items-center px-8 py-16 min-h-[inherit]">
        <div className="max-w-xl">
          <h1 className="font-heading text-5xl font-extrabold tracking-[0.01em] text-gray-900 leading-tight">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>
          <p className="mt-4 max-w-lg text-base text-gray-600 leading-relaxed">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <div className="mt-6">
            <button className="rounded-full bg-gray-900 px-8 py-3 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md">
              Shop Now
            </button>
          </div>

          {/* Stats */}
          <dl className="mt-8 grid grid-cols-3 gap-6">
            <div>
              <dt className="text-2xl font-bold text-gray-900">200+</dt>
              <dd className="mt-1 text-xs text-gray-500">International Brands</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-gray-900">2,000+</dt>
              <dd className="mt-1 text-xs text-gray-500">High-Quality Products</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-gray-900">30,000+</dt>
              <dd className="mt-1 text-xs text-gray-500">Happy Customers</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}


