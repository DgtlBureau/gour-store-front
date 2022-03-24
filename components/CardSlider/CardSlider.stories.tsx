import React, { CSSProperties } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardSlider } from './CardSlider';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';

export default {
  title: 'components/CardSlider',
  component: CardSlider,
} as ComponentMeta<typeof CardSlider>;

const Template: ComponentStory<typeof CardSlider> = function (args) {
  return <CardSlider {...args} />;
};

export const DefaultState = Template.bind({});

type CardProps = {
  title: string;
  image?: string;
};

export function TemplateCard({ title, image }: CardProps) {
  const wrapperBoxSx: CSSProperties = {
    width: '250px',
    height: '156px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#EBEBEB;',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '26px 18px 13px 18px',
    backgroundImage: image ? `url(${image})` : 'none',
  };
  return (
    <Box sx={{ ...wrapperBoxSx }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Button>подробнее</Button>
    </Box>
  );
}

DefaultState.args = {
  title: 'Акции и скидки',
  cardsList: [
    {
      id: 1,
      element: <TemplateCard title="test1" />,
    },
    {
      id: 2,
      element: <TemplateCard title="test2" />,
    },
    {
      id: 3,
      element: <TemplateCard title="test3" />,
    },
    {
      id: 4,
      element: <TemplateCard title="test4" />,
    },
    {
      id: 5,
      element: <TemplateCard title="test5" />,
    },
    {
      id: 6,
      element: <TemplateCard title="test6" />,
    },
    {
      id: 7,
      element: <TemplateCard title="test7" />,
    },
    {
      id: 8,
      element: <TemplateCard title="test8" />,
    },
    {
      id: 9,
      element: <TemplateCard title="test9" />,
    },
    {
      id: 10,
      element: <TemplateCard title="test10" />,
    },
    {
      id: 11,
      element: <TemplateCard title="test11" />,
    },
  ],
};
