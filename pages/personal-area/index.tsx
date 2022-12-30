import React from 'react';

import { Grid } from '@mui/material';

import { useGetCategoryListWithDiscountQuery } from 'store/api/categoryApi';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetOrdersListQuery } from 'store/api/orderApi';
import { useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';

import { PALayout } from 'layouts/PA/PA';
import { PrivateLayout } from 'layouts/Private/Private';

import { useAppNavigation } from 'components/Navigation';
import { PAAddressCard } from 'components/PA/Main/AddressCard/AddressCard';
import { PACredentialsCard } from 'components/PA/Main/CredentialsCard/CredentialsCard';
import { PADiscountsCard } from 'components/PA/Main/DiscountsCard/DiscountsCard';
import { PAOrdersCard } from 'components/PA/Main/OrdersCard/OrdersCard';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import {
  formatCategoriesWithMaxDiscount,
  getFormattedAddressesList,
  getFormattedOrdersList,
} from './personalAreaHelper';

export function Main() {
  const { currency, language } = useAppNavigation();

  const { data: currentUser, isLoading: currentUserIsLoading } = useGetCurrentUserQuery();
  const { data: addressList = [], isLoading: addressListIsLoading } = useGetOrderProfilesListQuery();
  const { data: ordersData, isLoading: ordersListIsLoading } = useGetOrdersListQuery({ length: 15 });
  const { categoriesWithDiscounts, isLoading: categoriesIsLoading } = useGetCategoryListWithDiscountQuery(undefined, {
    selectFromResult: state => ({ ...state, categoriesWithDiscounts: formatCategoriesWithMaxDiscount(state.data) }),
  });

  const isLoading = currentUserIsLoading || addressListIsLoading || ordersListIsLoading || categoriesIsLoading;

  const orders = getFormattedOrdersList(ordersData?.orders || [], currency);
  const addresses = getFormattedAddressesList(addressList, language);

  return (
    <PrivateLayout>
      <PALayout>
        {isLoading && <ProgressLinear sx={{ marginBottom: '10px' }} />}

        <Grid container spacing={2}>
          {!!currentUser && (
            <Grid item xs={12} sm={6}>
              <PACredentialsCard
                name={`${currentUser.firstName} ${currentUser.lastName}`}
                phone={currentUser.phone}
                email={currentUser.email}
                photo={currentUser.avatar?.small}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <PAAddressCard isLoading={addressListIsLoading} addresses={addresses} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PAOrdersCard isLoading={ordersListIsLoading} orders={orders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PADiscountsCard isLoading={categoriesIsLoading} discounts={categoriesWithDiscounts} />
          </Grid>
        </Grid>
      </PALayout>
    </PrivateLayout>
  );
}

export default Main;
