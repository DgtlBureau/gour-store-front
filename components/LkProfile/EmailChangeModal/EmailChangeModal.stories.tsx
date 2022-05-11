import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {EmailChangeModal, EmailChangeModalProps} from "./EmailChangeModal";

export default {
    component: EmailChangeModal,
    title: "components/LkProfile/PasswordChangeModal",
} as Meta;

const Template: ComponentStory<typeof EmailChangeModal> = (args: EmailChangeModalProps) =>
    <EmailChangeModal {...args} />;
export const DefaultPasswordChangeModal = Template.bind({});
const props: Partial<EmailChangeModalProps> = {};

DefaultPasswordChangeModal.args = props;
