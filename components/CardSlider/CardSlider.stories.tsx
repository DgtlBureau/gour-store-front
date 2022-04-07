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
  slidesPerView: 4,
  cardsList: [
    <TemplateCard title="test1" />,
    <TemplateCard title="test2" />,
    <TemplateCard title="test3" />,
    <TemplateCard title="test4" />,
    <TemplateCard title="test5" />,
    <TemplateCard title="test6" />,
    <TemplateCard title="test7" />,
    <TemplateCard title="test8" />,
  ],
};
