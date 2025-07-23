import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#how-it-works") {
      const section = document.getElementById("how-it-works");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="bg-black text-white">
      <section className="px-6 py-24 max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-md">
        <div className="grid md:grid-cols-2 items-center gap-12 text-center md:text-left">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 mb-6 leading-tight">
              Start Investing in Crypto with Just{" "}
              <span className="text-yellow-400">$1</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              CryptoInvest helps you grow your portfolio one micro-investment at
              a time. Secure, beginner-friendly, and fully automated.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-500 text-white px-8 py-4 text-lg rounded-xl shadow hover:bg-green-600 transition"
            >
              Get Started
            </button>
          </div>

          <motion.img
            src="https://images.ctfassets.net/s9n78lc7gxyk/3oI55Kulf37e3XOdjtTgLw/d843e6b295d49dd72153d71569d91b3d/3D_blockchain_world_coin_chart_with_Bitcoin_coin___value_icons_in_a_light_style__no_more_element__no_word__6_.jpg"
            alt="Crypto investment illustration"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </section>

      <section
        id="how-it-works"
        className="px-6 py-20 max-w-6xl mx-auto text-center mt-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-10">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-900 shadow-lg rounded-xl p-6 border-t-4 border-green-500">
            <h3 className="text-xl font-semibold mb-2 text-white">
              1. Sign Up
            </h3>
            <p className="text-gray-400">
              Create your free CryptoInvest account in just minutes—no technical
              skills needed.
            </p>
          </div>
          <div className="bg-gray-900 shadow-lg rounded-xl p-6 border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2 text-white">
              2. Choose Coins
            </h3>
            <p className="text-gray-400">
              Pick from top cryptocurrencies to build your micro-portfolio.
              Invest as little as $1.
            </p>
          </div>
          <div className="bg-gray-900 shadow-lg rounded-xl p-6 border-t-4 border-yellow-500">
            <h3 className="text-xl font-semibold mb-2 text-white">
              3. Watch It Grow
            </h3>
            <p className="text-gray-400">
              Sit back and track your growth with our real-time dashboard and
              insights.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-xl shadow p-6 text-left">
            <p className="text-gray-400 mb-4 italic">
              “I never thought investing in crypto could be this easy. I started
              with just $5 and now I’m learning and earning!”
            </p>
            <p className="font-semibold text-white">— Sarah, 25, Lagos</p>
          </div>
          <div className="bg-gray-900 rounded-xl shadow p-6 text-left">
            <p className="text-gray-400 mb-4 italic">
              “CryptoInvest simplified everything. The dashboard is so intuitive
              and I love watching my micro-portfolio grow.”
            </p>
            <p className="font-semibold text-white">— David, 32, Nairobi</p>
          </div>
          <div className="bg-gray-900 rounded-xl shadow p-6 text-left">
            <p className="text-gray-400 mb-4 italic">
              “As a student, I could never afford traditional investing. Now I
              invest small amounts regularly without stress.”
            </p>
            <p className="font-semibold text-white">— Amina, 20, Accra</p>
          </div>
        </div>
      </section>
    </main>
  );
}
