import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkProfileAvatarEditor, LkProfileAvatarEditorProps} from "./LkProfileAvatarEditor";

export default {
    component: LkProfileAvatarEditor,
    title: "components/LkProfile/LkProfileAvatarEditor",
} as Meta;

const Template: ComponentStory<typeof LkProfileAvatarEditor> = (args: LkProfileAvatarEditorProps) =>
    <LkProfileAvatarEditor {...args} />;
export const DefaultLkProfileAvatarEditor = Template.bind({});
const props: Partial<LkProfileAvatarEditorProps> = {};

DefaultLkProfileAvatarEditor.args = props;
