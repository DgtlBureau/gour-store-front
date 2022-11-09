import React from 'react';

import { Card, CardActions, CardContent, CardMedia } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { Path } from 'constants/routes';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './Card.i18n.json';

import sx from './Card.styles';
import { CartCardDocket as Docket } from './Docket';

import PlusIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import MinusIcon from '@mui/icons-material/Remove';
import defaultImg from 'assets/images/default.svg';

type Props = {
  id: number;
  title: string;
  price: number;
  amount: number;
  gram: number;
  productImg: string;
  backgroundImg?: string;
  discount?: number;
  currency?: Currency;
  onAdd: () => void;
  onSubtract: () => void;
  onDelete: () => void;
};

export function CartCard({
  id,
  title,
  price,
  amount,
  gram,
  productImg,
  backgroundImg,
  discount,
  currency = 'cheeseCoin',
  onDelete,
  onAdd,
  onSubtract,
}: Props) {
  const { t } = useLocalTranslation(translations);

  const screenWidth = window.screen.width;

  const backgroundImage = `url('${backgroundImg}')`;

  return (
    <Card sx={sx.card}>
      <Link href={`/${Path.PRODUCTS}/${id}`}>
        <CardMedia sx={{ ...sx.previewImg, backgroundImage }} component='img' image={productImg || defaultImg} alt='' />
      </Link>

      <Box sx={sx.info}>
        <CardContent sx={sx.content}>
          <Box sx={sx.contentTitle}>
            <Link href={`/${Path.PRODUCTS}/${id}`} sx={{ textDecoration: 'none', userSelect: 'none' }}>
              <Typography variant='h6' sx={sx.title}>
                {title}
              </Typography>
            </Link>

            {screenWidth > 600 ? (
              <Docket currency={currency} discount={discount} price={price} amount={amount} />
            ) : (
              <IconButton size='small' onClick={onDelete} sx={sx.cancelBtn}>
                <CancelIcon />
              </IconButton>
            )}
          </Box>
          <Typography variant='body2' sx={sx.contentGram}>
            {gram} грам
          </Typography>
        </CardContent>

        <CardActions sx={sx.actions}>
          <Button variant='text' onClick={onDelete} sx={sx.deleteBtn}>
            {t('delete')}
          </Button>

          <Box sx={sx.edit}>
            <IconButton onClick={onSubtract} disabled={amount === 1}>
              <MinusIcon />
            </IconButton>

            <Typography variant='body2' sx={sx.weight}>
              {amount * gram} {t('g')}
            </Typography>

            <IconButton onClick={onAdd}>
              <PlusIcon />
            </IconButton>
          </Box>

          {screenWidth <= 600 && <Docket currency={currency} discount={discount} price={price} amount={amount} />}
        </CardActions>
      </Box>
    </Card>
  );
}
