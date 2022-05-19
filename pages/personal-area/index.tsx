import { Grid } from '@mui/material';
import { LkProfileEditor } from 'components/LkProfile/LkProfileEditor/LkProfileEditor';
import { ShopLayout } from 'layouts/Shop/Shop';
import React, { useState } from 'react';
import { LkProfileAvatarEditor } from 'components/LkProfile/LkProfileAvatarEditor/LkProfileAvatarEditor';

import { PhoneChangeModal } from 'components/LkProfile/PhoneChangeModal/PhoneChangeModal';
import { EmailChangeModal } from 'components/LkProfile/EmailChangeModal/EmailChangeModal';
import { PasswordChangeModal } from 'components/LkProfile/PasswordChangeModal/PasswordChangeModal';

import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { ChangePhoneDto } from '../../@types/dto/profile/change-phone.dto';
import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';
import { useGetCurrentUserQuery } from 'store/api/authApi';
import { useRouter } from 'next/router';

export type props = {};

export function Profile({}: props) {
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);
  const [isEmailModalOpened, setIsEmailModalOpened] = useState(false);

  const router = useRouter();

  const { data: currentUser } = useGetCurrentUserQuery();

  const handleChangeEmail = (email: string) => {
    console.log(email);
    //запрос на сервер
    setIsEmailModalOpened(false);
  };
  const handleChangePhone = (changePhoneData: ChangePhoneDto) => {};
  const handleChangePassword = (changePasswordData: ChangePasswordDto) => {
    console.log(changePasswordData);
    //запрос на сервер
    setIsPasswordModalOpened(false);
  };

  const handleChangeAvatar = () => {};
  const handleDeleteAvatar = () => {};

  const handleSendCode = (phone: string) => {};

  const handleSave = (updatedUser: UpdateUserDto) => {
    console.log(updatedUser);
  };

  // if (!currentUser) {
  //   router.push('/');
  // }

  return (
    <ShopLayout>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <LkProfileAvatarEditor
            image={
              'https://images.unsplash.com/photo-1652819674544-a284366b1d0d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=906'
            }
            onChange={handleChangeAvatar}
            onDelete={handleDeleteAvatar}
          />
        </Grid>
        <Grid item xs={4}>
          <LkProfileEditor
            onChangeEmail={() => setIsEmailModalOpened(true)}
            onChangePhone={() => {}}
            onChangePassword={() => setIsPasswordModalOpened(true)}
            user={{
              firstName: currentUser?.firstName || '',
              lastName: currentUser?.lastName || '',
              referralCode: currentUser?.referralCode?.code || '',
            }}
            email={'bebzhyzh@gmail.com'}
            phone={'89218650538'}
            onSave={handleSave}
          />
        </Grid>
      </Grid>

      <EmailChangeModal
        isOpened={isEmailModalOpened}
        onClose={() => {
          setIsEmailModalOpened(false);
        }}
        onChange={handleChangeEmail}
      />

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
