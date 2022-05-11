import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {PasswordChangeModal, PasswordChangeModalProps} from "./PasswordChangeModal";

export default {
    component: PasswordChangeModal,
    title: "components/LkProfile/PasswordChangeModal",
} as Meta;

const Template: ComponentStory<typeof PasswordChangeModal> = (args: PasswordChangeModalProps) =>
    <PasswordChangeModal {...args} />;
export const DefaultPasswordChangeModal = Template.bind({});
const props: Partial<PasswordChangeModalProps> = {};

DefaultPasswordChangeModal.args = props;
