import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  LkOrderProfileItem,
  LkOrderProfileItemProps,
} from './LkOrderProfileItem';

export default {
  component: LkOrderProfileItem,
  title: 'components/LkOrderProfiles/LkOrderProfileItem',
} as Meta;

const Template: ComponentStory<typeof LkOrderProfileItem> = (
  args: LkOrderProfileItemProps
) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <LkOrderProfileItem
      {...args}
      isOpened={isOpened}
      onClick={() => {
        setIsOpened(true);
      }}
      onClose={() => {
        setIsOpened(false);
      }}
    />
  );
};
export const DefaultLkOrderProfileItem = Template.bind({});
const props: Partial<LkOrderProfileItemProps> = {
  orderProfile: {
    title: 'Дом',
    cityId: 0,
    street: 'Проспект Кузнецова',
    house: '17',
    apartment: '726',
    entrance: '2',
    floor: '11',
    isMain: false,
  },
  cities: [
    {
      label: 'Москва',
      value: 1,
    },
    {
      label: 'Санкт-Петербург',
      value: 2,
    },
  ],
};

DefaultLkOrderProfileItem.args = props;
