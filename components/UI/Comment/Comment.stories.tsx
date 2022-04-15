import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Comment, CommentProps } from './Comment';

export default {
  component: Comment,
  title: 'UI/Comment',
} as Meta;

const Template: ComponentStory<typeof Comment> = function (args: CommentProps) {
  return (
    <div style={{ background: '#EBEBEB', padding: '20px' }}>
      <Comment {...args} />
    </div>
  );
};
export const DefaultComment = Template.bind({});
DefaultComment.args = {
  title: 'Толя Володин',
  grade: 3.7,
  date: '22.02.2022',
  text: 'МММММ, вкуснятина))) балдёж...',
};
