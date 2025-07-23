export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-gray-100">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-4">About CryptoInvest</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Making crypto investing simple, secure, and accessible for everyone starting at just $1.
        </p>
      </section>

      <section className="bg-red-900 bg-opacity-20 p-6 md:p-10 rounded-xl shadow-inner border-l-4 border-red-500 mb-12 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-red-400 mb-2">The Problem</h3>
        <p className="text-gray-300 text-lg">
          Many people feel overwhelmed or excluded from cryptocurrency investing due to complexity,
          high entry costs, and fear of risk. Traditional investing platforms can be intimidating,
          especially for beginners without technical knowledge or large capital.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Our Solution</h3>
          <p className="text-gray-300 text-lg mb-4">
            CryptoInvest removes the barriers to entry by offering:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Micro-investing starting at $1 — no need for large upfront funds</li>
            <li>Automated portfolio tools to help grow your investments hands-free</li>
            <li>Beginner-friendly interface with real-time insights and learning resources</li>
            <li>Secure platform designed to protect your data and funds</li>
          </ul>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/isometric-cryptocurrency-concept-with-bitcoins-people-mining-3d-vector-illustration_1284-29932.jpg?semt=ais_hybrid&w=740"
            alt="CryptoInvest Illustration"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>
    </main>
  );
}
