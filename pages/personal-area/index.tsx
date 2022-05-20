import { Grid, LinearProgress } from '@mui/material';
import { LkProfileEditor } from 'components/LkProfile/LkProfileEditor/LkProfileEditor';
import { ShopLayout } from 'layouts/Shop/Shop';
import React, { useEffect, useState } from 'react';
import { LkProfileAvatarEditor } from 'components/LkProfile/LkProfileAvatarEditor/LkProfileAvatarEditor';

import { PasswordChangeModal } from 'components/LkProfile/PasswordChangeModal/PasswordChangeModal';

import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePhoneDto } from '../../@types/dto/profile/change-phone.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
} from 'store/api/authApi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuth } from 'store/selectors/auth';
import { useCreateImageMutation } from 'store/api/imageApi';
import fi from 'date-fns/esm/locale/fi/index.js';

export type props = {};

export function Profile({}: props) {
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);

  const router = useRouter();

  // const currentUser = useSelector(selectCurrentUser);
  // const isAuth = useSelector(selectIsAuth);

  const { data: currentUser } = useGetCurrentUserQuery();

  const [fetchUpdateCurrentUser] = useUpdateCurrentUserMutation();
  const [fetchUpdatePassword] = useUpdateCurrentUserPasswordMutation();
  const [fetchUploadImage] = useCreateImageMutation();

  const handleChangePhone = (changePhoneData: ChangePhoneDto) => {};
  const handleChangePassword = async (
    changePasswordData: ChangePasswordDto
  ) => {
    try {
      await fetchUpdatePassword(changePasswordData).unwrap();
      // router.push('auth/signin');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAvatar = async (file: File) => {
    console.log('file', file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const image = await fetchUploadImage(formData).unwrap();
      if (!image) return;

      await fetchUpdateCurrentUser({ avatarId: image.id });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveAvatar = async () => {
    try {
      await fetchUpdateCurrentUser({ avatarId: null }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendCode = (phone: string) => {};

  const handleSaveBaseInfo = async (updatedUser: UpdateUserDto) => {
    try {
      await fetchUpdateCurrentUser(updatedUser).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return (
      <ShopLayout>
        <h1>Пользователь не найден</h1>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <LkProfileAvatarEditor
            image={currentUser.avatar?.full || ''}
            onChange={handleChangeAvatar}
            onRemove={handleRemoveAvatar}
          />
        </Grid>
        <Grid item xs={4}>
          <LkProfileEditor
            onChangePhone={() => {}}
            onChangePassword={() => setIsPasswordModalOpened(true)}
            user={{
              firstName: currentUser.firstName || '',
              lastName: currentUser.lastName || '',
              referralCode: currentUser.referralCode?.code || '',
              email: currentUser.email || '',
            }}
            phone={currentUser.phone}
            onSave={handleSaveBaseInfo}
          />
        </Grid>
      </Grid>

      <PasswordChangeModal
        isOpened={isPasswordModalOpened}
        onClose={() => {
          setIsPasswordModalOpened(false);
        }}
        onChange={handleChangePassword}
      />
    </ShopLayout>
  );
}

export default Profile;
