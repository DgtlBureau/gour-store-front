import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { CommentCreateBlock, CommentCreateBlockProps } from './CreateBlock';

export default {
  component: CommentCreateBlock,
  title: 'Comment/CreateBlock',
} as Meta;

const Template: ComponentStory<typeof CommentCreateBlock> = function (args: CommentCreateBlockProps) {
  return <CommentCreateBlock {...args} />;
};

export const PositiveCommentCreateBlock = Template.bind({});
PositiveCommentCreateBlock.args = {} as Partial<CommentCreateBlockProps>;

export const NegativeCommentCreateBlock = Template.bind({});
NegativeCommentCreateBlock.args = {
  onCreate: () => Promise.reject(),
};
