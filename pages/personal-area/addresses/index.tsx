import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  useGetOrderProfilesListQuery,
  useCreateOrderProfileMutation,
  useUpdateOrderProfileMutation,
  useDeleteOrderProfileMutation,
} from 'store/api/orderProfileApi';
import { useGetCityListQuery } from 'store/api/cityApi';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from 'store/api/currentUserApi';
import translations from './Addresses.i18n.json';
import {
  useLocalTranslation,
  LocalConfig,
} from '../../../hooks/useLocalTranslation';
import { PALayout } from '../../../layouts/PA/PA';
import { Box } from '../../../components/UI/Box/Box';
import { Button } from '../../../components/UI/Button/Button';
import { PAProfilesItem } from '../../../components/PA/Profiles/Item/Item';
import { PAProfilesDeleteModal } from '../../../components/PA/Profiles/DeleteModal/DeleteModal';
import { OrderProfileDto } from '../../../@types/dto/order/profile.dto';
import { CurrentUserUpdateDto } from '../../../@types/dto/current-user-update.dto';

const sx = {
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
};

export function Addresses() {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();

  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const { data: profiles } = useGetOrderProfilesListQuery();
  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [createProfile] = useCreateOrderProfileMutation();
  const [updateProfile] = useUpdateOrderProfileMutation();
  const [deleteProfile] = useDeleteOrderProfileMutation();

  const [updateUser] = useUpdateCurrentUserMutation();

  const [expandedProfileId, setExpandedProfileId] =
    useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const citiesList =
    cities?.map(city => ({
      value: city.id,
      label: city.name[locale],
    })) || [];

  const rollUpProfile = () => setExpandedProfileId(null);

  const expandProfile = (id: number) => {
    if (isCreating) closeCreateForm();
    if (expandedProfileId !== id) setExpandedProfileId(id);
    else rollUpProfile();
  };

  const changeMainAddress = async (newOrderProfileId: number) => {
    if (!currentUser) return;

    const { avatar, ...userData } = currentUser;

    const updatedUser = {
      ...userData,
      mainOrderProfileId: newOrderProfileId,
      avatarId: currentUser.avatar.id,
    } as CurrentUserUpdateDto;

    await updateUser(updatedUser);
  };

  const createAddress = async (data: OrderProfileDto) => {
    await createProfile(data);
    closeCreateForm();
  };

  const editAddress = async (data: OrderProfileDto, id: number) => {
    await updateProfile({ ...data, id });

    const isMain = currentUser?.mainOrderProfileId === expandedProfileId;

    if (data.isMain && !isMain && !!expandedProfileId)
      changeMainAddress(expandedProfileId);
  };

  const deleteAddress = async () => {
    if (expandedProfileId) await deleteProfile(expandedProfileId);
    rollUpProfile();
    closeDeleteModal();
  };

  const openCreateForm = () => {
    rollUpProfile();
    setIsCreating(true);
  };
  const closeCreateForm = () => setIsCreating(false);

  const openDeleteModal = () => setIsDeleting(true);
  const closeDeleteModal = () => setIsDeleting(false);

  return (
    <PALayout>
      <Box sx={sx.actions}>
        <Button size="small" disabled={isCreating} onClick={openCreateForm}>
          {t('newAddress')}
        </Button>
      </Box>
      {isCreating && (
        <PAProfilesItem
          key={-1}
          cities={citiesList}
          onSave={createAddress}
          onDelete={closeCreateForm}
        />
      )}
      {profiles?.map(profile => (
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
      ))}
      <PAProfilesDeleteModal
        isOpen={isDeleting}
        onAccept={deleteAddress}
        onClose={closeDeleteModal}
      />
    </PALayout>
  );
}

export default Addresses;
