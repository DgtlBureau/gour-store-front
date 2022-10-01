import { Grid } from '@mui/material';
import { useState } from 'react';

import { dispatchNotification } from 'packages/EventBus';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUpdateCurrentUserPasswordMutation,
  useUpdateCurrentUserEmailMutation,
  useUpdateCurrentAvatarMutation,
} from 'store/api/currentUserApi';
import { useCreateImageMutation } from 'store/api/imageApi';
import { ChangePasswordDto } from 'types/dto/profile/change-password.dto';
import { UpdateUserDto } from 'types/dto/profile/update-user.dto';
import { PACredentialsAvatarEditor } from 'components/PA/Credentials/AvatarEditor/AvatarEditor';
import { CredentialsFormType, PACredentialsEditor } from 'components/PA/Credentials/Editor/Editor';
import { PAPasswordChangeModal } from 'components/PA/Credentials/PasswordChangeModal/PasswordChangeModal';
import { NotificationType } from 'types/entities/Notification';
import { PALayout } from 'layouts/PA/PA';
import { getErrorMessage } from 'utils/errorUtil';
import { useCheckCodeMutation, useSendEmailCodeMutation } from 'store/api/authApi';
import { ChangeEmailDto } from 'types/dto/profile/change-email.dto';
import { PAEmailChangeModal } from 'components/PA/Credentials/EmailChangeModal/EmailChangeModal';

export function Profile() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const { data: currentUser } = useGetCurrentUserQuery();

  const [uploadImage] = useCreateImageMutation();
  const [sendEmailCode, { isLoading: codeIsSending }] = useSendEmailCodeMutation();
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
    password: '1234567890',
    referralCode: currentUser?.referralCode?.code || '',
  };

  const openEmailChangeModal = () => setIsEmailModalOpen(true);
  const closeEmailChangeModal = () => setIsEmailModalOpen(false);

  const openPasswordChangeModal = () => setIsPasswordModalOpen(true);
  const closePasswordChangeModal = () => setIsPasswordModalOpen(false);

  const sendEmail = async (email: string) => {
    try {
      await sendEmailCode({ email }).unwrap();

      dispatchNotification('Код отправлен');

      return true;
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      return false;
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

  const checkEmailCode = async (code: string) => {
    try {
      const isApprove = await checkCode({ code }).unwrap();

      if (!isApprove) {
        dispatchNotification('Неверный код', { type: NotificationType.DANGER });

        return false;
      }

      dispatchNotification('Код подтверждён');

      return true;
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });

      return false;
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
