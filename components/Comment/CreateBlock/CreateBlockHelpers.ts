import { NotificationType } from '../../../@types/entities/Notification';

export const positiveEventMessage = {
  title: 'Спасибо!',
  message: 'Отзыв отправлен на модерацию.\nСкоро мы его опубликуем',
  type: NotificationType.SUCCESS,
};

export const negativeEventMessage = {
  title: 'Ошибка создания комментария.',
  message: 'Пожалуйста, повторите позже.',
  type: NotificationType.DANGER,
};
