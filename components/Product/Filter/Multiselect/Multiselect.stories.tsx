import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductFilterMultiselect, FilterMultiselectProps } from './Multiselect';

export default {
  component: ProductFilterMultiselect,
  title: 'Catalog/Multiselect',
} as Meta;

const Template: ComponentStory<typeof ProductFilterMultiselect> = (args: FilterMultiselectProps) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  return <ProductFilterMultiselect {...args} selected={selectedList} onChange={setSelectedList} />;
};
export const DefaultProductFilterMultiselect = Template.bind({});
const props: Partial<FilterMultiselectProps> = {
  title: 'Категории сыра',
  options: [
    {
      label: 'Мягкий',
      value: 'test1',
    },
    {
      label: 'Полутвердый',
      value: 'test2',
    },
    {
      label: 'Твёрдый',
      value: 'test3 ',
    },
  ],
  selected: [],
};

DefaultProductFilterMultiselect.args = props;
