import { ReactNode } from 'react';
// eslint-disable-next-line import/no-unresolved
import { ToastProps } from 'react-toastify/dist/types'; // FIXME: убрать ошибки eslint'a

export enum NotificationType {
  DANGER = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}
export interface Notification extends Partial<ToastProps> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
}
