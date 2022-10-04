import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { CommentCard } from './Card';

export default {
  component: CommentCard,
  title: 'Comment/Card',
} as Meta;

const Template: ComponentStory<typeof CommentCard> = args => (
  <div style={{ background: '#F4E7CE', padding: '20px' }}>
    <CommentCard {...args} />
  </div>
);
export const DefaultCommentCard = Template.bind({});
DefaultCommentCard.args = {
  title: 'Толя Володин',
  grade: 3.7,
  date: '22.02.2022',
  text: 'МММММ, вкуснятина))) балдёж...',
};
