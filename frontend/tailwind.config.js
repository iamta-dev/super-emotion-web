module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [/^bg-/, /^text-/, /^hover:/, /^focus:/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "100vh": "100vh",
        "200vh": "200vh",
      },
      height: {
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "80vh": "80vh",
        "100vh": "100vh",
        "200vh": "200vh",
      },
      colors: {
        primary: {
          100: "#FFFFFF",
          300: "#fff5ff",
          400: "#d7b9dd",
          500: "#7f3f98",
          600: "#390053",
        },
        secondary: {
          300: "#fff8ec",
          400: "#e0ca98",
          500: "#c29c42",
          600: "#b0812a",
        },
        error: {
          300: "#ffe2e5",
          400: "#fa8e83",
          500: "#f64e60",
          600: "#91271f",
        },
        success: {
          300: "#BCD7BB",
          400: "#9CD89A",
          500: "#64BA60",
          600: "#3E763C",
        },
        background: "#F4F6F9",
      },
    },
  },
};
