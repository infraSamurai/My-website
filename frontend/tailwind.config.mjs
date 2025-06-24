/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6366f1',   // A slightly softer Indigo 500
          secondary: '#f472b6', // A softer Pink 400
          accent: '#fbbf24',    // A warm Amber 400
          neutral: {
            50: '#f9fafb',   // Gray 50
            100: '#f3f4f6',  // Gray 100
            200: '#e5e7eb',  // Gray 200
            300: '#d1d5db',  // Gray 300
            400: '#9ca3af',  // Gray 400
            500: '#6b7280',  // Gray 500
            600: '#4b5563',  // Gray 600
            700: '#374151',  // Gray 700
            800: '#1f2937',  // Gray 800 (New "dark box" color)
            900: '#111827',  // Gray 900 (New "dark background")
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config; 