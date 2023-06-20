import React, {useMemo, useState} from 'react';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translation from './Promotion.i18n.json';

import { useGetPromotionListQuery } from '../../store/api/promotionApi';
import { LinkRef as Link } from '../../components/UI/Link/Link';
import { Path } from '../../constants/routes';
import { PromotionCard } from '../../components/Promotion/Card/Card';
import { Breadcrumbs, SxProps } from '@mui/material';
import { Typography } from '../../components/UI/Typography/Typography';
import sx from '../contacts/Contacts.styles';
import { Box} from '../../components/UI/Box/Box';
import catalogSx from '../../components/Catalog/Catalog.styles';
import promotionsSx from './Promotion.styles';
import { Pagination } from '../../components/UI/Pagination/Pagination';

const NOW = new Date();
export function Promotions() {
  const { t } = useLocalTranslation(translation);

  const [page, setPage] = useState(1);
  const changePage = (value: number) => {
      if (value !== page) {
          setPage(value);
      }
  };

  const { data: promotions } = useGetPromotionListQuery();


  const cardsPerPage = 4;

  const pageRange = {
      start: (page - 1) * cardsPerPage,
      end: page * cardsPerPage,
  };

  let activePromotions = promotions?.filter(it => {
      const start = new Date(it.start);
      const end = new Date(it.end);

      return NOW > start && NOW < end;
  });

  let oldPromotions = promotions?.filter(it => {
      const end = new Date(it.end);

      return NOW > end;
  });

  const pagesCount = Math.max(
      Math.ceil((activePromotions?.length || 0) / cardsPerPage),
      Math.ceil((oldPromotions?.length || 0) / cardsPerPage)
  );
  const isMultiPage = pagesCount > 1;


  activePromotions = activePromotions?.slice(pageRange.start, pageRange.end);
  oldPromotions = oldPromotions?.slice(pageRange.start, pageRange.end);

  const activePromotionCardList = useMemo(
      () =>
          activePromotions?.map(promotion => (
              <Link href={`/${Path.PROMOTIONS}/${promotion.id}`}>
                <PromotionCard
                    key={promotion.id}
                    image={promotion.cardImage.small}
                    onClickMore={() => console.log(promotion.id)}
                    changeWidth='280px'
                />
              </Link>
          )) || [],
      [activePromotions],
  );

  const oldPromotionCardList = useMemo(
      () =>
          oldPromotions?.map(promotion => (
              <Link href={`/${Path.PROMOTIONS}/${promotion.id}`}>
                <PromotionCard
                    key={promotion.id}
                    image={promotion.cardImage.small}
                    onClickMore={() => console.log(promotion.id)}
                    changeWidth='280px'
                />
              </Link>
          )) || [],
      [oldPromotions],
  );

  const hasPromotions = !!promotions?.length;
  const cardsGridSx = { ...catalogSx.cardsGrid, justifyContent: 'flex-start' } as SxProps;

  return (
    <PrivateLayout>
      <ShopLayout>
          <Breadcrumbs sx={{}} separator=">" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                  Главная
              </Link>
              <Typography variant="h6" sx={{fontWeight: 700}}>Акции</Typography>
          </Breadcrumbs>

          {!promotions?.length && (
              <Typography variant='h5' color='primary' sx={promotionsSx.emptyText}>
                  Акции отсутствуют
              </Typography>
          )}

          {!!activePromotionCardList?.length && (
              <>
                  <Typography variant="h5" sx={{fontWeight: 600, color: '#7E5F2F', marginTop: '30px'}}>
                      Действующие акции и скидки
                  </Typography>
                  <Box sx={{...promotionsSx.catalog, ...sx} as SxProps}>
                    <Box sx={cardsGridSx}>{activePromotionCardList}</Box>

                  </Box>
              </>
          )}

          {!!oldPromotionCardList?.length && (
          <>
              <Typography variant="h5" sx={{fontWeight: 600,color: '#7E5F2F',marginTop: '30px'}}>
                  Прошедшие акции и скидки
              </Typography>
              <Box sx={{ ...promotionsSx.catalog, ...sx } as SxProps}>
                <Box sx={cardsGridSx}>{oldPromotionCardList}</Box>

              </Box>
          </>
          )}

          <Pagination page={page} count={pagesCount} sx={promotionsSx.pagination} onChange={changePage} />


      </ShopLayout>
    </PrivateLayout>
  );
}

export default Promotions;
