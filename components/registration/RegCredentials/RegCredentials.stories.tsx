import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {RegCredentials, RegCredentialsProps} from "./RegCredentials";

export default {
    component: RegCredentials,
    title: "components/registration/RegCredentials",
} as Meta;

const Template: ComponentStory<typeof RegCredentials> = (args: RegCredentialsProps) => <RegCredentials {...args} />;
export const DefaultRegCredentials = Template.bind({});
const props: Partial<RegCredentialsProps> = {};

DefaultRegCredentials.args = props;
