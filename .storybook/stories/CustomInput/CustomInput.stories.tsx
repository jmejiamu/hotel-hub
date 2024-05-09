import React from "react";
import { View } from "react-native";
import { CustomInput } from "./CustomInput";
import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "../../../src/theme/spacing";

const CustomInputMeta: Meta<typeof CustomInput> = {
  title: "CustomInput",
  component: CustomInput,
  args: {
    placeholder: "Code",
    size: "small", // Default size
    placeholderTextColor: "#FFF",
  },
  decorators: [
    (Story) => (
      <View style={{ marginHorizontal: spacing.size_small }}>
        <Story />
      </View>
    ),
  ],
};

export default CustomInputMeta;
export const Basic: StoryObj<typeof CustomInput> = {};
