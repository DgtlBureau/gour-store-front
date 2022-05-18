import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkProfileEditor, LkProfileEditorProps} from "./LkProfileEditor";

export default {
    component: LkProfileEditor,
    title: "components/LkProfile/LkProfileEditor",
} as Meta;

const Template: ComponentStory<typeof LkProfileEditor> = (args: LkProfileEditorProps) => <LkProfileEditor {...args} />;
export const DefaultLkProfileEditor = Template.bind({});
const props: Partial<LkProfileEditorProps> = {};

DefaultLkProfileEditor.args = props;
