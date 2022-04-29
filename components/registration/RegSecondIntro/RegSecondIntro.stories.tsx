import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {RegSecondIntro, RegSecondIntroProps} from "./RegSecondIntro";

export default {
    component: RegSecondIntro,
    title: "components/registration/RegSecondIntro",
} as Meta;

const Template: ComponentStory<typeof RegSecondIntro> = (args: RegSecondIntroProps) => <RegSecondIntro {...args} />;
export const DefaultRegSecondIntro = Template.bind({});
const props: Partial<RegSecondIntroProps> = {};

DefaultRegSecondIntro.args = props;
