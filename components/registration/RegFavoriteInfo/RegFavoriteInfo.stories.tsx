import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {RegFavoriteInfo, RegFavoriteInfoProps} from "./RegFavoriteInfo";

export default {
    component: RegFavoriteInfo,
    title: "registration/FavoriteInfo",
} as Meta;

const Template: ComponentStory<typeof RegFavoriteInfo> = (args: RegFavoriteInfoProps) => <RegFavoriteInfo {...args} />;
export const DefaultRegFavoriteInfo = Template.bind({});
const props: Partial<RegFavoriteInfoProps> = {};

DefaultRegFavoriteInfo.args = props;
