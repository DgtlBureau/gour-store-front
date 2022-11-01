import { ReactNode } from 'react';
import type { ToastProps } from 'react-toastify/dist/types';

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
