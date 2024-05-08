import React from "react";
import { View } from "react-native";
import { CustomButton } from "./CustomButton";
import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "../../../src/theme/spacing";

const CustomButtonMeta: Meta<typeof CustomButton> = {
  title: "CustomButton",
  component: CustomButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Hello world",
    size: "small", // Default size
  },
  decorators: [
    (Story) => (
      <View style={{ marginHorizontal: spacing.size_small }}>
        <Story />
      </View>
    ),
  ],
};

export default CustomButtonMeta;
export const Basic: StoryObj<typeof CustomButton> = {};
export const Medium: StoryObj<typeof CustomButton> = {
  args: {
    size: "medium",
  },
};
export const Large: StoryObj<typeof CustomButton> = {
  args: {
    size: "large",
  },
};
