import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { customCheckboxConfig } from "./components/checkboxStyles";

// custom themes in chakra UI
// https://chakra-ui.com/docs/theming/customize-theme
// https://www.easyreact.com/articles/chakra-ui-customisations

const myTheme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  colors: {
    primary: "#ffdd00",
    secondary: "#2FA07224",
    customGreen: {
      500: "#53DA69", // Your custom color
    },
  },
  components: {
    Button, // Has to match to the name of the component
    Checkbox: {
      ...customCheckboxConfig,
      baseStyle: () => ({
        control: {
          _checked: {
            bg: "customGreen.500",
            borderColor: "#49C25D",
            color: "#399649",
            _hover: {
              borderColor: "#49C25D",
              _checked: {
                bg: "customGreen.500",
              },
            },
          },
        },
      }),
    },
  },
});

export default myTheme;
