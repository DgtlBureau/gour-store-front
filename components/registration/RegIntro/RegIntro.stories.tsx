import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {RegIntro, RegIntroProps} from "./RegIntro";

export default {
    component: RegIntro,
    title: "components/registration/RegIntro",
} as Meta;

const Template: ComponentStory<typeof RegIntro> = (args: RegIntroProps) => <RegIntro {...args} />;
export const DefaultRegIntro = Template.bind({});
const props: Partial<RegIntroProps> = {};

DefaultRegIntro.args = props;
