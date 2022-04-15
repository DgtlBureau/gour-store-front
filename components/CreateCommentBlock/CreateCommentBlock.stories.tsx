import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {CreateCommentBlock, CreateCommentBlockProps} from "./CreateCommentBlock";

export default {
    component: CreateCommentBlock,
    title: "Comment/CreateBlock",
} as Meta;

const Template: ComponentStory<typeof CreateCommentBlock> = (args: CreateCommentBlockProps) =>
    <CreateCommentBlock {...args} />;
export const DefaultCreateCommentBlock = Template.bind({});
const props: Partial<CreateCommentBlockProps> = {};

DefaultCreateCommentBlock.args = props;
