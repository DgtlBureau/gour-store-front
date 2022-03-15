import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {Header, HeaderProps} from "./Header";

export default {
    component: Header,
    title: "components/Header",
} as Meta;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => <Header {...args} />;
export const DefaultHeader = Template.bind({});
const props: Partial<HeaderProps> = {};

DefaultHeader.args = props;
