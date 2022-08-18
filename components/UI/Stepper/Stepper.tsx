import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '../Box/Box';
import s from './Stepper.module.scss';

type Props = {
  activeStep: number;
  stepsCount: number;
  percent: number;
};

export function Stepper({ activeStep, stepsCount, percent }: Props) {
  const getStepsByCount = (count: number) => {
    const steps = [];
    for (let i = 1; i <= count; i++) {
      const isActive = i <= activeStep;
      <div className={`${s.step} ${isActive ? s.active : ''}`}>
        <div className={s.connector} />
        <div className={s.stepLabel}>{isActive && <DoneIcon />}</div>
      </div>;
      steps.push({
        index: i,
        isActive,
      });
    }
    return steps;
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: {
            xs: 'none',
            md: 'flex',
          },
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        {getStepsByCount(stepsCount).map(step => (
          <div key={step.index} className={s.step} style={{ width: `calc(100%/${stepsCount})` }}>
            <div className={`${s.connector} ${step.isActive ? s.active : ''}`} />
            <div className={`${s.stepLabel} ${step.isActive ? s.active : ''}`}>{step.isActive && <DoneIcon />}</div>
          </div>
        ))}
      </Box>

      <Box
        sx={{
          width: '100%',
          display: {
            xs: 'block',
            md: 'none',
          },
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className={`${s.step} ${s.mobile}`}>
          <div className={`${s.stepLabel} ${s.active}`}>{activeStep}</div>
          <div className={s.connector}>
            <div className={s.connectorPercentage} style={{ width: `${percent}%` }} />
          </div>
          <div className={s.stepLabel}>{activeStep + 1}</div>
        </div>
      </Box>
    </>
  );
}
