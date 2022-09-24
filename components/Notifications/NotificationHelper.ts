import { NotificationType } from 'types/entities/Notification';

export type PaymentStatus = 'paid' | 'failure';

export type PaymentNotification = Record<PaymentStatus, { message: string; type: NotificationType }>;

export const paymentNotification: PaymentNotification = {
  paid: {
    message: 'Вы успешно пополнили баланс чизкоинов!',
    type: NotificationType.SUCCESS,
  },
  failure: {
    message: 'Произошла ошибка при пополнении чизкоинов.',
    type: NotificationType.DANGER,
  },
};
