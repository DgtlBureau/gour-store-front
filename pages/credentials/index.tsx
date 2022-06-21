import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ChangePasswordDto } from '../../@types/dto/profile/change-password.dto';
import { ChangePhoneDto } from '../../@types/dto/profile/change-phone.dto';
import { UpdateUserDto } from '../../@types/dto/profile/update-user.dto';
import { PACredentialsAvatarEditor } from '../../components/PA/Credentials/AvatarEditor/AvatarEditor';
import { PACredentialsEditor } from '../../components/PA/Credentials/Editor/Editor';
import { PAPasswordChangeModal } from '../../components/PA/Credentials/PasswordChangeModal/PasswordChangeModal';
import { PALayout } from 'layouts/PA/PA';

import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
} from 'store/api/authApi';
import { useCreateImageMutation } from 'store/api/imageApi';

export function Profile() {
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
      <PALayout>
        <h1>Пользователь не найден</h1>
      </PALayout>
    );
  }

  return (
    <PALayout>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <PACredentialsAvatarEditor
            image={currentUser.avatar?.full || ''}
            onChange={handleChangeAvatar}
            onRemove={handleRemoveAvatar}
          />
        </Grid>
        <Grid item xs={4}>
          <PACredentialsEditor
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

      <PAPasswordChangeModal
        isOpen={isPasswordModalOpened}
        onClose={() => {
          setIsPasswordModalOpened(false);
        }}
        onChange={handleChangePassword}
      />
    </PALayout>
  );
}

export default Profile;
