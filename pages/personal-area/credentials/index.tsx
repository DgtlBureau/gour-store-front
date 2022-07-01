import { Grid } from '@mui/material';
import { useState } from 'react';

import { ChangePasswordDto } from '../../../@types/dto/profile/change-password.dto';
import { ChangePhoneDto } from '../../../@types/dto/profile/change-phone.dto';
import { UpdateUserDto } from '../../../@types/dto/profile/update-user.dto';
import { PACredentialsAvatarEditor } from '../../../components/PA/Credentials/AvatarEditor/AvatarEditor';
import { PACredentialsEditor } from '../../../components/PA/Credentials/Editor/Editor';
import { PAPasswordChangeModal } from '../../../components/PA/Credentials/PasswordChangeModal/PasswordChangeModal';
import { PALayout } from 'layouts/PA/PA';

import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
} from 'store/api/authApi';
import { useCreateImageMutation } from 'store/api/imageApi';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../../@types/entities/Notification';

export function Profile() {
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);

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
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль изменен',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль не изменен',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleChangeAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const image = await fetchUploadImage(formData).unwrap();
      if (!image) return;
      await fetchUpdateCurrentUser({ avatarId: image.id });
      eventBus.emit(EventTypes.notification, {
        message: 'Фото профиля изменено',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка изменения фото',
        type: NotificationType.DANGER,
      });
    }
  };
  const handleRemoveAvatar = async () => {
    try {
      await fetchUpdateCurrentUser({ avatarId: null }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Фото профиля удалено',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка удаления фото',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleSendCode = (phone: string) => {};

  const handleSaveBaseInfo = async (updatedUser: UpdateUserDto) => {
    try {
      await fetchUpdateCurrentUser(updatedUser).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Данные профиля изменены',
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка изменения данных',
        type: NotificationType.SUCCESS,
      });
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
        <Grid item xs={12} sm={4} md={3}>
          <PACredentialsAvatarEditor
            image={currentUser.avatar?.full || ''}
            onChange={handleChangeAvatar}
            onRemove={handleRemoveAvatar}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
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
