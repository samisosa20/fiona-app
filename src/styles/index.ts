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
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });


export default theme;