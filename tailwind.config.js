/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                purple: "hsl(280 80% 43.5%)",
                "magenta-light": "hsl(290 100% 72%)",
                magenta: "hsl(286 73% 55%)",
                brand: {
                    purple: "#7B21BA",
                    magenta: "#B339D4",
                    "magenta-light": "#D497FF",
                    "purple-light": "#7B26F0"
                }
            },
            backgroundImage: {
                "gradient-button": "linear-gradient(19deg, #FEBEFA 6.78%, #B339D4 34.87%, #7B21BA 61.32%, #7B26F0 91.07%)",
                "gradient-glass": "linear-gradient(198deg, rgba(38, 38, 38, 0.30) 10.03%, rgba(19, 19, 19, 0.30) 75.61%)",
                "radial-glow": "radial-gradient(50% 50% at 50% 50%, #D497FF 0%, #7B21BA 100%)",
                "gradient-purple": "linear-gradient(135deg, #B339D4 0%, #7B21BA 50%, #4B0BA3 100%)",
                "gradient-purple-dark": "linear-gradient(135deg, #7B21BA 0%, #4B0BA3 50%, #2D0861 100%)",
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'monospace'],
            },
        },
    },
    plugins: [],
}