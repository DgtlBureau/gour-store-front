import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import s from './Item.module.scss';

type Props = {
  activeStep: number;
};

const steps: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Item = ({ activeStep }: Props) => {
  return (
    <div className={s.stepsProgress}>
      {steps.map(step => {
        const isStepActive = activeStep >= step;
        return (
          <div className={`${s.step} ${isStepActive ? s.active : ''}`}>
            <div className={s.connector}></div>
            <div className={s.stepLabel}>{isStepActive && <DoneIcon />}</div>
          </div>
        );
      })}
    </div>
  );
};
