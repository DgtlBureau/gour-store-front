import React from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails as MUIAccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from '@mui/material';

import ExpandIcon from '@mui/icons-material/ExpandMore';

import { defaultTheme as theme } from '../../../themes';

const accordionSx = {
  marginBottom: '10px',
  padding: '20px',
  border: '1px solid',
  borderRadius: '6px',
  borderColor: 'secondary.main',
  boxShadow: 'none',
  background: theme.palette.common.white,
  '&:before': {
    content: 'none',
  },
  '&.Mui-expanded': {
    margin: '0 0 10px 0',
    borderColor: 'accent.main',
  },
};

const summarySx = {
  margin: 0,
  padding: 0,
  '&.Mui-expanded': {
    minHeight: '48px',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
};

const detailsSx = {
  marginTop: '20px',
  padding: 0,
};

export function Accordion({ sx, ...props }: AccordionProps) {
  return <MUIAccordion {...props} sx={{ ...accordionSx, ...sx }} />;
}

export function AccordionSummary({ sx, ...props }: AccordionSummaryProps) {
  return (
    <MUIAccordionSummary
      {...props}
      expandIcon={<ExpandIcon htmlColor={theme.palette.text.muted} />}
      sx={{ ...summarySx, ...sx }}
    />
  );
}

export function AccordionDetails({ sx, ...props }: AccordionDetailsProps) {
  return <MUIAccordionDetails {...props} sx={{ ...detailsSx, ...sx }} />;
}
