import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';
import { useGetOrdersListQuery } from 'store/api/orderApi';
import { PALayout } from 'layouts/PA/PA';
import { PACredentialsCard } from 'components/PA/Main/CredentialsCard/CredentialsCard';
import { PAAddressCard } from 'components/PA/Main/AddressCard/AddressCard';
import { PAOrdersCard } from 'components/PA/Main/OrdersCard/OrdersCard';
import { LocalConfig } from 'hooks/useLocalTranslation';
import { Path } from 'constants/routes';
import { Currency } from '../../@types/entities/Currency';
import { getFormattedAddressesList, getFormattedOrdersList } from './personalAreaHelper';
import { PADiscountsCard } from 'components/PA/Main/DiscountsCard/DiscountsCard';

export function Main() {
  const router = useRouter();

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: addressList = [] } = useGetOrderProfilesListQuery();
  const { data: ordersList = [] } = useGetOrdersListQuery();

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = 'cheeseCoin';

  const orders = getFormattedOrdersList(ordersList, currency);
  const addresses = getFormattedAddressesList(addressList, language);

  const goToCredentials = () => router.push(Path.CREDENTIALS);
  const goToAddresses = () => router.push(Path.ADDRESSES);
  const goToOrders = () => router.push(Path.ORDERS);
  const goToDiscounts = () => router.push(Path.DISCOUNTS);

  return (
    <PALayout>
      <Grid container spacing={2}>
        {!!currentUser && (
          <Grid item xs={12} sm={6}>
            <PACredentialsCard
              name={`${currentUser.firstName} ${currentUser.lastName}`}
              phone={currentUser.phone}
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
  );
}

export default Main;
