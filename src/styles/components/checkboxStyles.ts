import {
  // definePartsStyle,
  // defineMultiStyleConfig,
  checkboxAnatomy,
} from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

// Define the circular variant
const circularStyle = definePartsStyle({
  control: defineStyle({
    borderRadius: "full",
  }),
});

// Define the sizes
const sizeStyles = {
  xl: definePartsStyle({
    control: defineStyle({ boxSize: 8 }),
    label: defineStyle({ fontSize: "xl" }),
  }),
  "2xl": definePartsStyle({
    control: defineStyle({ boxSize: 10 }),
    label: defineStyle({ fontSize: "2xl" }),
  }),
};

// Create a theme configuration with your new styles
export const customCheckboxConfig = defineMultiStyleConfig({
  variants: { circular: circularStyle },
  sizes: sizeStyles,
});
