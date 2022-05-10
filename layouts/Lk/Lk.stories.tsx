import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkLayout, LkLayoutProps} from "./Lk";

export default {
    component: LkLayout,
    title: "layouts/LkLayout",
} as Meta;

const Template: ComponentStory<typeof LkLayout> = (args: LkLayoutProps) => <LkLayout {...args} />;
export const DefaultLkLayout = Template.bind({});
const props: Partial<LkLayoutProps> = {};

DefaultLkLayout.args = props;
