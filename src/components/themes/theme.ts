import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    "bg-dark": "#282c34",
  },
  shadows: {
    light: {
      sm: "0 2px 8px -1px rgb(255 255 255 / 8%), 0 2px 6px -1px rgb(255 255 255 / 6%)",
    },
  },
  sizes: {
    full: "100%",
    headerHeight: "60px",
  },
  styles: {
    global: {
      html: { height: "100%" },
      body: { height: "100%" },
      "#root": { height: "100%" },
      "*::-webkit-scrollbar": { width: "4px", height: "4px" },
      "*::-webkit-scrollbar-track": { background: "transparent", borderColor: "transparent" },
      "*::-webkit-scrollbar-thumb": { background: "#7d9586", borderRadius: "10vh" },
    },
  },
  components: {
    Container: {
      baseStyle: {
        width: "min(100%, 100vw)",
        height: "min(100%, 100vh)",
      },
      variants: {
        outermost: {
          width: "min(100%, 100vw)",
          maxWidth: "100%",
          height: "min(100%, 100vh)",
          maxHeight: "100%",
          overflow: "hidden",
          padding: "0",
          margin: "0",
        },
      },
    },
    Tabs: {
      parts: ["tab"],
      baseStyle: {
        tab: {
          _active: {
            background: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
