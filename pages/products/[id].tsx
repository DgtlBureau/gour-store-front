import { Stack } from '@mui/material';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { CreateCommentBlock } from 'components/CreateCommentBlock/CreateCommentBlock';
import { ProductInformation } from 'components/Product/Information/Information';
import { ProductReviews } from 'components/Product/Reviews/Reviews';
import { Box } from 'components/UI/Box/Box';
import { ImageSlider } from 'components/UI/ImageSlider/ImageSlider';
import { Typography } from 'components/UI/Typography/Typography';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';
import { useGetProductQuery } from 'store/api/productApi';
import { ShopLayout } from '../../layouts/ShopLayout';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const productId = id ? +id : 0;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductQuery(productId, { skip: !id });
  console.log(product);

  const characteristics: { label: string; value: string | number }[] =
    Object.keys(product?.characteristics || {}).map(key => ({
      label: key,
      value: product?.characteristics[key] || '',
    }));

  const comments =
    product?.productGrades?.map((grade, i) => ({
      id: grade.id,
      clientName: grade.client.role,
      value: grade.value,
      date: grade.createdAt,
      comment: grade.comment,
    })) || [];

  return (
    <ShopLayout>
      <div>
        {id}
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ width: '580px', margin: '0 40px 0 0' }}>
            <ImageSlider
              images={[
                {
                  small:
                    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
                  full: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
                },
                {
                  small:
                    'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
                  full: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
                },
              ]}
            />
          </Box>
          <Stack width="100%">
            <Typography variant="h5" sx={{ margin: '0 0 35px 0' }}>
              {product?.title?.ru || ''}
            </Typography>
            <ProductInformation
              rating={0}
              gradesCount={0}
              commentsCount={0}
              characteristics={characteristics}
              onClickComments={() => {}}
            />
          </Stack>
        </Stack>

        <Typography sx={{ margin: '100px 0 0 0' }} variant="h5">
          Описание товара
        </Typography>
        <Typography variant="body1">{product?.description.ru || ''}</Typography>

        {/* <CardSlider title="Похожие товары" cardsList={[]} /> */}

        <ProductReviews sx={{ margin: '100px 0 40px 0' }} reviews={comments} />

        <CreateCommentBlock
          onCreate={(comment: { grade: number; text: string }) => {
            console.log(comment);
          }}
        />
      </div>
    </ShopLayout>
  );
}
