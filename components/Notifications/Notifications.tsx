import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify';

import { Typography } from 'components/UI/Typography/Typography'
import { eventBus, EventTypes } from '../../packages/EventBus';
import {
  Notification,
  NotificationType,
} from '../../@types/entities/Notification';
import sx from './Notifications.styles';

const baseNotification: ToastOptions = {
  theme: 'light',
  autoClose: 7000000,
  style: {
    maxWidth: '500px',
    width: '100%',
  },
};

export function Notifications() {
  useEffect(() => {
    const getNotificationTitle = (type: NotificationType) => {
      switch (type) {
        case NotificationType.DANGER:
          return 'Произошла ошибка!';
        case NotificationType.SUCCESS:
          return 'Успешно!';
        case NotificationType.INFO:
        case NotificationType.WARNING:
          return 'Внимание!';
        default:
          break;
      }
    };

    function toastNotify(res: Notification) {
      const message = (
        <>
          {res.title && <Typography sx={sx.title}>{res.title}</Typography>}
          {res.message && <Typography variant='body1' sx={sx.message}>{res.message}</Typography>}
        </>
      );
      toast(res?.message ? message : getNotificationTitle(res.type), {
        ...baseNotification,
        ...res,
        type: res.type,
      });
    }

    function dismissNotify(id: number | string) {
      id && toast.dismiss(id);
    }

    eventBus.on(EventTypes.notification, toastNotify);
    eventBus.on(EventTypes.removeNotification, dismissNotify);

    return () => {
      eventBus.off(EventTypes.notification, toastNotify);
      eventBus.off(EventTypes.removeNotification, dismissNotify);
    };
  }, []);

  return <></>;
}

export default Notifications;
