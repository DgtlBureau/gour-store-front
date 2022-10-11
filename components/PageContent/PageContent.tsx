import { useRouter } from 'next/router';
import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { pageSx } from './PageContent.styles';

type Props = {
  title?: string;
  description?: string;
};

export const PageContent = ({ title, description }: Props) => {
  return (
    <Box>
      <Typography sx={pageSx.title} variant='h4'>
        {title || 'Страница находится в разработке 🔧'}
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: description || '' }} />
    </Box>
  );
};
