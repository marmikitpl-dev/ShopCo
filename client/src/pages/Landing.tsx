export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Discover Products You’ll Love
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Curated selections, great prices, and a smooth shopping experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="rounded-md bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition">
              Shop Now
            </button>
            <button className="rounded-md border border-gray-300 px-6 py-3 text-gray-900 hover:bg-white/60 transition">
              Learn More
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600">Enjoy free shipping on orders over $50 across select regions.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Checkout</h3>
            <p className="text-gray-600">Industry-standard encryption to keep your payments and data safe.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-gray-600">Hassle-free returns within 30 days on eligible items.</p>
          </div>
        </section>
      </div>
    </div>
  )
}


