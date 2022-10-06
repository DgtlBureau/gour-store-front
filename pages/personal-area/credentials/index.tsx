import { useState } from 'react';

import { Grid } from '@mui/material';

import { useCheckCodeMutation, useSendEmailCodeMutation } from 'store/api/authApi';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentAvatarMutation,
  useUpdateCurrentUserEmailMutation,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
} from 'store/api/currentUserApi';
import { useCreateImageMutation } from 'store/api/imageApi';

import { PALayout } from 'layouts/PA/PA';

import { PACredentialsAvatarEditor } from 'components/PA/Credentials/AvatarEditor/AvatarEditor';
import { CredentialsFormType, PACredentialsEditor } from 'components/PA/Credentials/Editor/Editor';
import { PAEmailChangeModal } from 'components/PA/Credentials/EmailChangeModal/EmailChangeModal';
import { PAPasswordChangeModal } from 'components/PA/Credentials/PasswordChangeModal/PasswordChangeModal';

import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';
import { ChangePasswordDto } from 'types/dto/profile/change-password.dto';
import { UpdateUserDto } from 'types/dto/profile/update-user.dto';
import { NotificationType } from 'types/entities/Notification';

import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

export function Profile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const { data: currentUser } = useGetCurrentUserQuery();

  const [uploadImage] = useCreateImageMutation();
  const [sendCode, { isLoading: codeIsSending }] = useSendEmailCodeMutation();
  const [checkCode] = useCheckCodeMutation();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [updateEmail] = useUpdateCurrentUserEmailMutation();
  const [updatePassword] = useUpdateCurrentUserPasswordMutation();
  const [updateAvatar] = useUpdateCurrentAvatarMutation();

  const defaultValues: CredentialsFormType = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    password: '********',
    referralCode: currentUser?.referralCode?.code || '',
  };

  const openEmailChangeModal = () => setIsEmailModalOpen(true);
  const closeEmailChangeModal = () => setIsEmailModalOpen(false);

  const openPasswordChangeModal = () => setIsPasswordModalOpen(true);
  const closePasswordChangeModal = () => setIsPasswordModalOpen(false);

  const sendEmail = async (email: string) => {
    try {
      await sendCode({ email }).unwrap();

      dispatchNotification('Email код отправлен');

      return Promise.resolve();
    } catch (error) {
      const message = getErrorMessage(error);

      return Promise.reject(message);
    }
  };

  const checkEmailCode = async (code: string) => {
    try {
      await checkCode({ code }).unwrap();

      dispatchNotification('Код подтверждён');

      return Promise.resolve();
    } catch (error) {
      const message = getErrorMessage(error);

      return Promise.reject(message);
    }
  };

  const changeEmail = async (dto: ChangeEmailDto) => {
    try {
      await updateEmail(dto).unwrap();

      dispatchNotification('Почта изменена');

      closeEmailChangeModal();
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const changePassword = async (dto: ChangePasswordDto) => {
    try {
      await updatePassword(dto).unwrap();

      dispatchNotification('Пароль изменен');

      closePasswordChangeModal();
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

      await updateAvatar(image.id);

      dispatchNotification('Фото профиля изменено');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const removeAvatar = async () => {
    try {
      await updateAvatar(null).unwrap();

      dispatchNotification('Фото профиля удалено');
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const saveBaseInfo = async (dto: UpdateUserDto) => {
    try {
      await updateCurrentUser(dto).unwrap();

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
            defaultValues={defaultValues}
            onChangeEmail={openEmailChangeModal}
            onChangePassword={openPasswordChangeModal}
            onSubmit={saveBaseInfo}
          />
        </Grid>
      </Grid>

      <PAEmailChangeModal
        isOpen={isEmailModalOpen}
        defaultValues={{ email: defaultValues.email, code: '' }}
        onClose={closeEmailChangeModal}
        onEmailSend={sendEmail}
        onCodeCheck={checkEmailCode}
        codeIsSending={codeIsSending}
        onSubmit={changeEmail}
      />

      <PAPasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordChangeModal}
        onChange={changePassword}
      />
    </PALayout>
  );
}

export default Profile;
