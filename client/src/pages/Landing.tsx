import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first container with minimal top padding */}
      <div className="mx-auto px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8 lg:pt-8 lg:pb-20 max-w-7xl">
        {/* Welcome Message - Mobile optimized */}
        {isAuthenticated && user && (
          <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200 sm:mb-8 sm:p-4">
            <div className="text-sm text-blue-800 sm:text-base font-sans">
              👋 Welcome back, {user.firstName}!
            </div>
          </div>
        )}

        {/* Hero Section - Mobile-first responsive */}
        <section className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Mobile: smaller text, tablet/desktop: larger */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4 font-heading sm:text-4xl lg:text-5xl xl:text-6xl">
            Discover Products You'll Love
          </h1>
          <p className="text-base text-gray-600 mb-6 font-sans max-w-2xl mx-auto sm:text-lg sm:mb-8 lg:text-xl">
            Curated selections, great prices, and a smooth shopping experience.
          </p>
          
          {/* Mobile: stacked buttons, tablet+: side by side */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <button className="w-full rounded-lg bg-gray-900 px-6 py-4 text-white hover:bg-gray-800 transition font-sans font-medium text-base sm:w-auto sm:px-8 sm:py-3 touch-manipulation">
              Shop Now
            </button>
            <button className="w-full rounded-lg border border-gray-300 px-6 py-4 text-gray-900 hover:bg-gray-50 transition font-sans font-medium text-base sm:w-auto sm:px-8 sm:py-3 touch-manipulation">
              Learn More
            </button>
          </div>
        </section>

        {/* Features Section - Mobile-first grid */}
        <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
            <div className="text-2xl mb-3 sm:text-3xl">🚚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading sm:text-xl">Free Shipping</h3>
            <p className="text-sm text-gray-600 font-sans sm:text-base">Enjoy free shipping on orders over $50 across select regions.</p>
          </div>
          
          {/* Feature Card 2 */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
            <div className="text-2xl mb-3 sm:text-3xl">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading sm:text-xl">Secure Checkout</h3>
            <p className="text-sm text-gray-600 font-sans sm:text-base">Industry-standard encryption to keep your payments and data safe.</p>
          </div>
          
          {/* Feature Card 3 */}
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="text-2xl mb-3 sm:text-3xl">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading sm:text-xl">Easy Returns</h3>
            <p className="text-sm text-gray-600 font-sans sm:text-base">Hassle-free returns within 30 days on eligible items.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
