import { NativeBaseProvider, extendTheme } from "native-base";

const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        100: "#737373",
        200: "#666667",
        300: "#59595B",
        400: "#4C4C4F",
        500: "#3F3F43",
        600: "#333237",
        700: "#26252B",
        800: "#19181F",
      },
      neon: {
        pink: "#FF11778",
        red: "#FE0000",
        yellow: "#FFF205",
        cyan: "#01FFF4",
        blue: "#000AFF",
        green: "#7CFF01",
      },
      bg: '#201D2C',
      contrast: '#242836'
    },
    fontConfig: {
      100: {
        normal: "Poppins-Thin",
      },
      200: {
        normal: "Poppins-ExtraLight",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-Semibold",
      },
      700: {
        normal: "Poppins-Bold",
      },
      800: {
        normal: "Poppins-ExtraBold",
      },
      900: {
        normal: "Poppins-Black",
      },
    },
    fonts: {
      heading: "Poppins",
      body: "Poppins",
      mono: "Poppins",
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });


export default theme;