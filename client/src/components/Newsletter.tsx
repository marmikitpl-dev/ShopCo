const Newsletter = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Newsletter Card - Floating appearance */}
        <div className="bg-black rounded-3xl px-12 py-8 flex items-center justify-between">
          {/* Left side - Text */}
          <div className="flex-1">
            <h2 className="text-white text-4xl font-bold leading-tight">
              STAY UPTO DATE ABOUT
              <br />
              OUR LATEST OFFERS
            </h2>
          </div>

          {/* Right side - Form */}
          <div className="flex-1 max-w-md ml-12">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              {/* Subscribe Button */}
              <button className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
