import React from "react";
import { View } from "react-native";

import { Avatar } from "./Avatar";

import type { Meta, StoryObj } from "@storybook/react";
import { spacing } from "../../../src/theme/spacing";

const AvatarMeta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  //   args: {
  //     size: "small", // Default size
  //   },
  decorators: [
    (Story) => (
      <View style={{ marginHorizontal: spacing.size_small }}>
        <Avatar imageUrl={require("../../../assets/def-cal.jpg")} />
      </View>
    ),
  ],
};

export default AvatarMeta;

export const Basic = {};
