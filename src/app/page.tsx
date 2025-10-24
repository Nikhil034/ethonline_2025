export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Yellow Instant Tip
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gas-free micro-transactions powered by Yellow SDK
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to Yellow Instant Tip
            </h2>
            <p className="text-gray-600 mb-4">
              This is a test page to verify the Next.js setup is working correctly.
            </p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Next.js is working properly!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
