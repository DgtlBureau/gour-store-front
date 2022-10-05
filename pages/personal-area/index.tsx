import React from 'react';

import { Grid } from '@mui/material';

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

import { Currency } from 'types/entities/Currency';

import { getFormattedAddressesList, getFormattedOrdersList } from './personalAreaHelper';

export function Main() {
  const { language, goToCredentials, goToAddresses, goToOrders, goToDiscounts } = useAppNavigation();

  const { data: currentUser, isLoading: currentUserIsLoading } = useGetCurrentUserQuery();
  const { data: addressList = [], isLoading: addressListIsLoading } = useGetOrderProfilesListQuery();
  const { data: ordersList = [], isLoading: ordersListIsLoading } = useGetOrdersListQuery();

  const isLoading = currentUserIsLoading || addressListIsLoading || ordersListIsLoading;

  const currency: Currency = 'cheeseCoin';

  const orders = getFormattedOrdersList(ordersList, currency);
  const addresses = getFormattedAddressesList(addressList, language);

  return (
    <PrivateLayout>
      <PALayout>
        {isLoading && <ProgressLinear />}

        <Grid container spacing={2}>
          {!!currentUser && (
            <Grid item xs={12} sm={6}>
              <PACredentialsCard
                name={`${currentUser.firstName} ${currentUser.lastName}`}
                phone={currentUser.phone}
                email={currentUser.email}
                photo={currentUser.avatar?.small}
                onClickMore={goToCredentials}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <PAAddressCard addresses={addresses} onClickMore={goToAddresses} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PAOrdersCard orders={orders} onClickMore={goToOrders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PADiscountsCard discounts={[]} onClickMore={goToDiscounts} />
          </Grid>
        </Grid>
      </PALayout>
    </PrivateLayout>
  );
}

export default Main;
