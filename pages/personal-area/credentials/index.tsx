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
import { getErrorMessage } from 'utils/errorUtil';
import { useSignOutMutation } from 'store/api/authApi';

export function Profile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const { data: currentUser } = useGetCurrentUserQuery();

  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [updatePassword] = useUpdateCurrentUserPasswordMutation();
  const [uploadImage] = useCreateImageMutation();
  const [sendPhoneCode] = useSendChangePhoneCodeMutation();
  const [updatePhone] = useUpdateCurrentUserPhoneMutation();
  const [signOut] = useSignOutMutation();

  const sendChangePasswordCode = async (sendCode: SendCodeDto) => {
    try {
      await sendPhoneCode(sendCode).unwrap();

      dispatchNotification('Код отправлен');

      return true;
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

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
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const changePassword = async (changePasswordData: ChangePasswordDto) => {
    try {
      await updatePassword(changePasswordData).unwrap();

      await signOut().unwrap();

      dispatchNotification('Пароль изменен');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
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
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };
  const removeAvatar = async () => {
    try {
      await updateCurrentUser({ avatarId: null }).unwrap();

      dispatchNotification('Фото профиля удалено');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const saveBaseInfo = async (data: UpdateUserDto) => {
    try {
      await updateCurrentUser(data).unwrap();

      dispatchNotification('Данные профиля изменены');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
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
            image={currentUser.avatar?.full || currentUser.avatar?.small}
            onChange={changeAvatar}
            onRemove={removeAvatar}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={4}>
          <PACredentialsEditor
            onChangePhone={() => setIsPhoneModalOpen(true)}
            onChangePassword={() => setIsPasswordModalOpen(true)}
            user={{
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              referralCode: currentUser.referralCode?.code,
              email: currentUser.email,
            }}
            phone={currentUser.phone}
            onSave={saveBaseInfo}
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
        onClose={() => setIsPasswordModalOpen(false)}
        onChange={changePassword}
      />
    </PALayout>
  );
}

export default Profile;
