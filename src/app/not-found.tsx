import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
          alt="Bus in mountains"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 -z-10"
        />
        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">404</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Page not found</h1>
            <p className="text-lg text-gray-700 mb-8">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
            <Link
              href="/"
              className="inline-block text-base font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 