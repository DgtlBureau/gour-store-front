import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {FilterMultiselect, FilterMultiselectProps} from "./FilterMultiselect";

export default {
    component: FilterMultiselect,
    title: "components/FilterMultiselect",
} as Meta;

const Template: ComponentStory<typeof FilterMultiselect> = (args: FilterMultiselectProps) =>
    <FilterMultiselect {...args} />;
export const DefaultFilterMultiselect = Template.bind({});
const props: Partial<FilterMultiselectProps> = {};

DefaultFilterMultiselect.args = props;
