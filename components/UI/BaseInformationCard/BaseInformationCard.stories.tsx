import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  BaseInformationCard,
  BaseInformationCardProps,
} from './BaseInformationCard';

export default {
  component: BaseInformationCard,
  title: 'components/UI/BaseInformationCard',
} as Meta;

const Template: ComponentStory<typeof BaseInformationCard> = (
  args: BaseInformationCardProps
) => <BaseInformationCard {...args} />;
export const DefaultBaseInformationCard = Template.bind({});
const props: Partial<BaseInformationCardProps> = {};

DefaultBaseInformationCard.args = props;
