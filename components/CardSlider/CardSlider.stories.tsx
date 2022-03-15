import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {CardSlider, CardSliderProps} from "./CardSlider";

export default {
    component: CardSlider,
    title: "components/CardSlider",
} as Meta;

const Template: ComponentStory<typeof CardSlider> = (args: CardSliderProps) => <CardSlider {...args} />;
export const DefaultCardSlider = Template.bind({});
const props: Partial<CardSliderProps> = {
    cards: [
        <div key={1}/>
    ]
};

DefaultCardSlider.args = props;
