module.exports = {
  // mode: 'jit',
  important: true,
  //Purging for Production is configured in PostCSS Config
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  corePlugins: {
    // ...
  },

  theme: {
    borderRadius: {
      small: "4px",
      large: "8px",
      full: "50%",
      none: "0"
    },
    fontSize: {
      zero: "0rem",
      "title-1": "42px",
      "title-2": "36px",
      "title-3": "32px",
      "title-4": "28px",
      "title-5": "24px",
      "title-6": "20px",
      "title-7": "18px",
      "body-1": "16px",
      "body-2": "15px",
      "body-3": "14px",
      "body-4": "13px",
      "body-5": "12px",
      "body-6": "11px",
      "body-7": "10px",
    },
    lineHeight: {
      tight: "125%",
      loose: "150%",
    },
    colors: {
      primary: "#27378C",
      secondary: "#FFD55A",
      black: "#000",
      white: "#fff",
      danger: "#F64B3C",
      success: "#4EC33D",
      warning: "#FFB726",
      info: "#65ACF0",
      surface: "#FBFBFB",
      transparent: "transparent", // used for making elements not shift, in case of some border being applied on hover
      grey: {
        100: "#F0F0F0",
        200: "#E0E0E0",
        300: "#CCCCCC",
        400: "#BABABA",
        500: "#8F8F8F",
        600: "#7A7A7A",
        700: "#545454",
        800: "#2E2E2E",
        900: "#1A1A1A",
      },
      red: {
        100: "#FAEDED",
        200: "#FAD4D4",
        300: "#FAB6B6",
        400: "#FA8E8E",
        500: "#F55353",
        600: "#DE1B1B",
        700: "#B80D0D",
        800: "#8F0E0E",
        900: "#661414",
      },
      yellow: {
        100: "#FFFCED",
        200: "#FFF3BF",
        300: "#FFEC99",
        400: "#FFE066",
        500: "#FFD43B",
        600: "#FAB005",
        700: "#F59F00",
        800: "#2E2E2E",
        900: "#E67700",
      },
      green: {
        100: "#DCFAE8",
        200: "#8EF5B7",
        300: "#46E385",
        400: "#1EC963",
        500: "#0AA648",
        600: "#038537",
        700: "#056B2E",
        800: "#075426",
        900: "#09401F",
      },
      blue: {
        100: "#EDF5FF",
        200: "#CFE0FC",
        300: "#ACCBFC",
        400: "#5691F0",
        500: "#3272D9",
        600: "#1D5BBF",
        700: "#27378C",
        800: "#1F2C70",
        900: "#172154",
      },
      teal: {
        100: "#E5FFF9",
        200: "#B7F7F3",
        300: "#6FDED6",
        400: "#4EC2BA",
        500: "#0EA197",
        600: "#08827A",
        700: "#086962",
        800: "#09524D",
        900: "#0C4746",
      },
    },
    extend: {
      spacing: {
        'sidebar': '280px',
        // "main":"calc(100vw - 280px)",
        'rightbar': '347px'
      },
      screens: {
        'md': `1000px`,
        'xs': '350px'
      },
      fontSize: {
        zero: "0rem",
      },
      gridTemplateColumns: {
        18: "repeat(18,minmax(0,1fr))",
      },
      gridColumnEnd: {
        19: "19",
      },
      borderWidth: {
        "1.5": "1.5px"
      }
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      borderWidth: ["focus", "disabled"],
      borderColor: ["disabled"],
      backgroundColor: ["disabled", "focus"]
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      // this function essentially adds all the colors mentioned above as css variables in the code
      // which can be very helpful
      // https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574

      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};