import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {RegCitySelect, RegCitySelectProps} from "./RegCitySelect";

export default {
    component: RegCitySelect,
    title: "components/registration/RegCitySelect",
} as Meta;

const Template: ComponentStory<typeof RegCitySelect> = (args: RegCitySelectProps) => <RegCitySelect {...args} />;
export const DefaultRegCitySelect = Template.bind({});
const props: Partial<RegCitySelectProps> = {};

DefaultRegCitySelect.args = props;
