import React, { useState } from 'react';

import {
  useGetOrderProfilesListQuery,
  useCreateOrderProfileMutation,
  useUpdateOrderProfileMutation,
  useDeleteOrderProfileMutation,
} from 'store/api/orderProfileApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useChangeMainAddressMutation, useGetCurrentUserQuery } from 'store/api/currentUserApi';
import translations from './Addresses.i18n.json';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { PrivateLayout } from 'layouts/Private/Private';
import { PALayout } from 'layouts/PA/PA';
import { Box } from 'components/UI/Box/Box';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { PAProfilesItem } from 'components/PA/Profiles/Item/Item';
import { PAProfilesDeleteModal } from 'components/PA/Profiles/DeleteModal/DeleteModal';
import { useAppNavigation } from 'components/Navigation';
import { dispatchNotification } from 'packages/EventBus';
import { OrderProfileDto } from 'types/dto/order/profile.dto';
import { NotificationType } from 'types/entities/Notification';
import { getErrorMessage } from 'utils/errorUtil';

const sx = {
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
};

export function Addresses() {
  const { t } = useLocalTranslation(translations);

  const { language } = useAppNavigation();

  const { data: profiles } = useGetOrderProfilesListQuery();
  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [createProfile] = useCreateOrderProfileMutation();
  const [updateProfile] = useUpdateOrderProfileMutation();
  const [deleteProfile] = useDeleteOrderProfileMutation();
  const [changeMainAddressProfile] = useChangeMainAddressMutation();

  const [expandedProfileId, setExpandedProfileId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const rollUpProfile = () => setExpandedProfileId(null);

  const openCreateForm = () => {
    rollUpProfile();
    setIsCreating(true);
  };
  const closeCreateForm = () => setIsCreating(false);

  const openDeleteModal = () => setIsDeleting(true);
  const closeDeleteModal = () => setIsDeleting(false);

  const citiesList =
    cities?.map(city => ({
      value: city.id,
      label: city.name[language],
    })) || [];

  const expandProfile = (id: number) => {
    if (isCreating) closeCreateForm();
    if (expandedProfileId !== id) setExpandedProfileId(id);
    else rollUpProfile();
  };

  const changeMainAddress = async (addressId: number | null) => {
    try {
      await changeMainAddressProfile(addressId).unwrap();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const createAddress = async (data: OrderProfileDto) => {
    try {
      await createProfile(data).unwrap();

      dispatchNotification('Адрес доставки создан');

      closeCreateForm();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const editAddress = async (data: OrderProfileDto, id: number) => {
    try {
      await updateProfile({ ...data, id }).unwrap();

      const currentOrderProfileId = currentUser?.mainOrderProfileId;

      if (currentOrderProfileId !== id && data.isMain) await changeMainAddress(id);
      if (currentOrderProfileId === id && !data.isMain) await changeMainAddress(null);

      dispatchNotification('Адрес доставки обновлен');

      rollUpProfile();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteAddress = async () => {
    if (expandedProfileId) {
      try {
        await deleteProfile(expandedProfileId).unwrap();

        dispatchNotification('Адрес доставки удален');

        rollUpProfile();
        closeDeleteModal();
      } catch (error) {
        const message = getErrorMessage(error);

        dispatchNotification(message, { type: NotificationType.DANGER });
      }
    }
  };

  return (
    <PrivateLayout>
      <PALayout>
        <Box sx={sx.actions}>
          <Button size='small' disabled={isCreating} onClick={openCreateForm}>
            {t('newAddress')}
          </Button>
        </Box>

        {isCreating && (
          <PAProfilesItem key={-1} cities={citiesList} onSave={createAddress} onDelete={closeCreateForm} />
        )}

        {!!profiles && profiles.length !== 0 ? (
          profiles.map(profile => (
            <PAProfilesItem
              key={profile.id}
              isExpanded={expandedProfileId === profile.id}
              isMain={currentUser?.mainOrderProfileId === profile.id}
              cities={citiesList}
              profile={profile}
              onExpand={() => expandProfile(profile.id)}
              onSave={data => editAddress(data, profile.id)}
              onDelete={openDeleteModal}
            />
          ))
        ) : (
          <Typography variant='h5'>Список адресов пуст</Typography>
        )}

        <PAProfilesDeleteModal isOpen={isDeleting} onAccept={deleteAddress} onClose={closeDeleteModal} />
      </PALayout>
    </PrivateLayout>
  );
}

export default Addresses;
