import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';
import { useGetOrderListQuery } from 'store/api/orderApi';
import { LkLayout } from 'layouts/Lk/Lk';
import { LkMainProfileCard } from 'components/LkMain/ProfileCard/ProfileCard';
import { LkMainAddressCard } from 'components/LkMain/AddressCard/AddressCard';
import { LkMainOrdersCard } from 'components/LkMain/OrdersCard/OrdersCard';
import { Path } from 'constants/routes';
import { LocalConfig } from 'hooks/useLocalTranslation';
import { Currency } from '../../../@types/entities/Currency';

export function Main() {
  const router = useRouter();

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: addressList } = useGetOrderProfilesListQuery();
  const { data: orderList } = useGetOrderListQuery();

  const locale: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currentCurrency: Currency = locale === 'ru' ? 'rub' : 'eur';

  const orders = orderList?.map(it => (
    {
      id: it.crmInfo.id,
      date: new Date(it.order.createdAt),
      status: it.crmInfo.status.name,
      sum: 0,
      currency: currentCurrency,
    }
  ));

  const addresses = addressList?.map(it => {
    const address = [
      it.city.name[locale], 
      it.street, 
      it.house, 
      it.apartment && `${locale === 'ru' ? 'кв.' : 'apt.'}. ${it.apartment}`
    ].filter(it => !!it).join(', ');

    return { title: it.title, address };
  });

  const goToCredentials = () => router.push(Path.CREDENTIALS);
  const goToAddresses = () => router.push(Path.ADDRESSES);
  const goToOrders = () => router.push(Path.ORDERS);

  return (
    <LkLayout>
      <Grid container spacing={2}>
        {
          !!currentUser && (
            <Grid item xs={6}>
              <LkMainProfileCard 
                name={`${currentUser.firstName} ${currentUser.lastName}`}
                phone={currentUser.phone}
                photo={currentUser.avatar.small}
                onClickMore={goToCredentials}
              />
            </Grid>
          )
        }
        <Grid item xs={6}>
          <LkMainAddressCard 
            addresses={addresses}
            onClickMore={goToAddresses}
          />
        </Grid>
        
        <Grid item xs={6}>
          <LkMainOrdersCard
            orders={orders}
            onClickMore={goToOrders}
          />
        </Grid>
      </Grid>
    </LkLayout>
  );
}

export default Main;
