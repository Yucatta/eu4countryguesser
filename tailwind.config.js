module.exports = {
  theme: {
    extend: {
      animation: {
        "fade-out": "fadeOut 3s forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
};
