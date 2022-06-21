import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';
import { useGetOrderListQuery } from 'store/api/orderApi';
import { PALayout } from 'layouts/PA/PA';
import { PACredentialsCard } from 'components/PA/Main/CredentialsCard/CredentialsCard';
import { PAAddressCard } from 'components/PA/Main/AddressCard/AddressCard';
import { PAOrdersCard } from 'components/PA/Main/OrdersCard/OrdersCard';
import { LocalConfig } from 'hooks/useLocalTranslation';
import { Path } from 'constants/routes';
import { Currency } from '../../@types/entities/Currency';

export function Main() {
  const router = useRouter();

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: addressList } = useGetOrderProfilesListQuery();
  const { data: orderList } = useGetOrderListQuery();

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = 'cheeseCoin';

  const orders = orderList?.map(it => ({
    id: it.crmInfo.id,
    date: new Date(it.order.createdAt),
    status: it.crmInfo.status.name,
    sum: 0,
    currency,
  }));

  const addresses = addressList?.map(it => {
    const address = [
      it.city.name[language],
      it.street,
      it.house,
      it.apartment && `${language === 'ru' ? 'кв.' : 'apt.'}. ${it.apartment}`,
    ]
      .filter(it => !!it)
      .join(', ');

    return { title: it.title, address };
  });

  const goToCredentials = () => router.push(Path.CREDENTIALS);
  const goToAddresses = () => router.push(Path.ADDRESSES);
  const goToOrders = () => router.push(Path.ORDERS);

  return (
    <PALayout>
      <Grid container spacing={2}>
        {!!currentUser && (
          <Grid item xs={6}>
            <PACredentialsCard
              name={`${currentUser.firstName} ${currentUser.lastName}`}
              phone={currentUser.phone}
              photo={currentUser.avatar.small}
              onClickMore={goToCredentials}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <PAAddressCard addresses={addresses} onClickMore={goToAddresses} />
        </Grid>

        <Grid item xs={6}>
          <PAOrdersCard orders={orders} onClickMore={goToOrders} />
        </Grid>
      </Grid>
    </PALayout>
  );
}

export default Main;
