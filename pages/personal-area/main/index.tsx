import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { LkLayout } from 'layouts/Lk/Lk';
import { LkMainProfileCard } from 'components/LkMain/ProfileCard/ProfileCard';
import { LkMainAddressCard } from 'components/LkMain/AddressCard/AddressCard';
import { LkMainOrdersCard } from 'components/LkMain/OrdersCard/OrdersCard';
import { Path } from 'constants/routes';

export function Main() {
  const router = useRouter();

  const { data: currentUser } = useGetCurrentUserQuery();

  const goToCredentials = () => router.push(Path.CREDENTIALS);
  const goToAddresses = () => router.push(Path.ADDRESSES);
  const goToOrders = () => router.push(Path.ORDERS);

  return (
    <LkLayout>
      <Grid container spacing={2}>
        {
          currentUser && (
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
            addresses={[]}
            onClickMore={goToAddresses}
          />
        </Grid>

        <Grid item xs={6}>
          <LkMainOrdersCard
            orders={[]}
            onClickMore={goToOrders}
          />
        </Grid>
      </Grid>
    </LkLayout>
  );
}

export default Main;
