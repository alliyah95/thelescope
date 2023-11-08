/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "ths-pink": {
                    300: "#F29393",
                },
                "ths-purple": {
                    300: "#7584CB",
                },
                "ths-blue": {
                    300: "#044AFE",
                },
                "ths-black": "#010204",
            },
        },
    },
    plugins: [],
};
