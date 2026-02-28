module.exports = {
  content: ["./src/**/*.{njk,html,js}"],
  safelist: [
    "bg-blue-100",   "text-blue-700",
    "bg-purple-100", "text-purple-700",
    "bg-pink-100",   "text-pink-700",
    "bg-teal-100",   "text-teal-700",
    "bg-red-100",    "text-red-700",
    "bg-green-100",  "text-green-700",
    "bg-indigo-100", "text-indigo-700",
    "bg-amber-100",  "text-amber-700",
    "bg-orange-100", "text-orange-700",
    "bg-gray-100",   "text-gray-600",
  ],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography")]
};
