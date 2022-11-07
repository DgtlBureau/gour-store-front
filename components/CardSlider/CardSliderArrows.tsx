import { ButtonGroup } from '@mui/material';

import { Button } from 'components/UI/Button/Button';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import sliderSx from './CardSlider.styles';

type CardSliderArrowsProps = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export function CardSliderArrows({ isPrevDisabled, isNextDisabled, onClickPrev, onClickNext }: CardSliderArrowsProps) {
  return (
    <ButtonGroup sx={sliderSx.arrows}>
      <Button variant='outlined' disabled={isPrevDisabled} onClick={onClickPrev}>
        <ArrowForwardIosIcon fontSize='small' sx={sliderSx.backArrow} />
      </Button>

      <Button variant='outlined' disabled={isNextDisabled} onClick={onClickNext}>
        <ArrowForwardIosIcon fontSize='small' />
      </Button>
    </ButtonGroup>
  );
}
