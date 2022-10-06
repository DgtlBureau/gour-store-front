import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UploadImage } from './UploadImage';

export default {
  title: 'UI/UploadImage',
  component: UploadImage,
} as ComponentMeta<typeof UploadImage>;

const Template: ComponentStory<typeof UploadImage> = args => <UploadImage {...args} />;

export const DefaultState = Template.bind({});

DefaultState.args = {
  id: 'uploadImage',
  allowedFileTypes: ['image/jpeg', 'image/png'],
};
