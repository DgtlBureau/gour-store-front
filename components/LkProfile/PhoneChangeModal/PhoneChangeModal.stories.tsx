import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {PhoneChangeModal, PhoneChangeModalProps} from "./PhoneChangeModal";

export default {
    component: PhoneChangeModal,
    title: "components/LkProfile/PhoneChangeModal",
} as Meta;

const Template: ComponentStory<typeof PhoneChangeModal> = (args: PhoneChangeModalProps) =>
    <PhoneChangeModal {...args} />;
export const DefaultPhoneChangeModal = Template.bind({});
const props: Partial<PhoneChangeModalProps> = {};

DefaultPhoneChangeModal.args = props;
