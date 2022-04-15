import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {MobileMenu, MobileMenuProps} from "./MobileMenu";

export default {
    component: MobileMenu,
    title: "Mobile/Menu",
} as Meta;

const Template: ComponentStory<typeof MobileMenu> = (args: MobileMenuProps) => <MobileMenu {...args} />;
export const DefaultMobileMenu = Template.bind({});
const props: Partial<MobileMenuProps> = {};

DefaultMobileMenu.args = props;
