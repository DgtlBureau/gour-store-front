import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {Footer, FooterProps} from "./Footer";

export default {
    component: Footer,
    title: "Footer",
} as Meta;

const Template: ComponentStory<typeof Footer> = (args: FooterProps) => <Footer {...args} />;
export const DefaultFooter = Template.bind({});
const props: Partial<FooterProps> = {};

DefaultFooter.args = props;
