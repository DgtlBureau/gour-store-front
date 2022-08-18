import { Grid } from '@mui/material';
import { useState } from 'react';

import { dispatchNotification } from 'packages/EventBus';
import {
  useGetCurrentUserQuery,
  useSendChangePhoneCodeMutation,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
  useUpdateCurrentUserPhoneMutation,
} from 'store/api/currentUserApi';
import { useCreateImageMutation } from 'store/api/imageApi';
import { PAPhoneChangeModal } from 'components/PA/Credentials/PhoneChangeModal/PhoneChangeModal';
import { ChangePasswordDto } from 'types/dto/profile/change-password.dto';
import { ChangePhoneDto } from 'types/dto/profile/change-phone.dto';
import { UpdateUserDto } from 'types/dto/profile/update-user.dto';
import { PACredentialsAvatarEditor } from 'components/PA/Credentials/AvatarEditor/AvatarEditor';
import { PACredentialsEditor } from 'components/PA/Credentials/Editor/Editor';
import { PAPasswordChangeModal } from 'components/PA/Credentials/PasswordChangeModal/PasswordChangeModal';

import { NotificationType } from 'types/entities/Notification';
import { PALayout } from 'layouts/PA/PA';
import { SendCodeDto } from 'types/dto/profile/send-code.dto';

export function Profile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const { data: currentUser } = useGetCurrentUserQuery();

  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [updatePassword] = useUpdateCurrentUserPasswordMutation();
  const [uploadImage] = useCreateImageMutation();
  const [sendPhoneCode] = useSendChangePhoneCodeMutation();
  const [updatePhone] = useUpdateCurrentUserPhoneMutation();

  const sendChangePasswordCode = async (sendCode: SendCodeDto) => {
    try {
      await sendPhoneCode(sendCode).unwrap();
      dispatchNotification('Код отправлен');
      return true;
    } catch (error) {
      console.error(error);
      dispatchNotification('Ошибка отправки кода', { type: NotificationType.DANGER });
      return false;
    }
  };
  const changePhone = async (changePhoneData: ChangePhoneDto) => {
    try {
      await updatePhone({
        phone: changePhoneData.phone,
        code: +changePhoneData.code,
      }).unwrap();
      dispatchNotification('Телефон изменен');
    } catch (error) {
      console.error(error);
      dispatchNotification('Произошла ошибка', { type: NotificationType.DANGER });
    }
  };

  const changePassword = async (changePasswordData: ChangePasswordDto) => {
    try {
      await updatePassword(changePasswordData).unwrap();
      dispatchNotification('Пароль изменен');
    } catch (error) {
      console.log(error);
      dispatchNotification('Пароль не изменен', { type: NotificationType.DANGER });
    }
  };

  const changeAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const image = await uploadImage(formData).unwrap();
      if (!image) return;
      await updateCurrentUser({ avatarId: image.id });
      dispatchNotification('Фото профиля изменено');
    } catch (error) {
      console.log(error);
      dispatchNotification('Ошибка изменения фото', { type: NotificationType.DANGER });
    }
  };
  const removeAvatar = async () => {
    try {
      await updateCurrentUser({ avatarId: null }).unwrap();
      dispatchNotification('Фото профиля удалено');
    } catch (error) {
      console.log(error);
      dispatchNotification('Ошибка удаления фото', { type: NotificationType.DANGER });
    }
  };

  const handleSaveBaseInfo = async (updatedUser: UpdateUserDto) => {
    try {
      await updateCurrentUser(updatedUser).unwrap();
      dispatchNotification('Данные профиля изменены');
    } catch (error) {
      dispatchNotification('Ошибка изменения данных', { type: NotificationType.DANGER });
    }
  };

  if (!currentUser) {
    return (
      <PALayout>
        <h1>Пользователь не найден</h1>
      </PALayout>
    );
  }

  console.log(currentUser.avatar);

  return (
    <PALayout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <PACredentialsAvatarEditor
            image={currentUser.avatar?.full || currentUser.avatar?.small}
            onChange={changeAvatar}
            onRemove={removeAvatar}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <PACredentialsEditor
            onChangePhone={() => {
              setIsPhoneModalOpen(true);
            }}
            onChangePassword={() => setIsPasswordModalOpen(true)}
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

      <PAPhoneChangeModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSendSMS={sendChangePasswordCode}
        onSubmit={changePhone}
      />

      <PAPasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
        }}
        onChange={changePassword}
      />
    </PALayout>
  );
}

export default Profile;
