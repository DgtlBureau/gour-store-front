import React, { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import { useAppNavigation } from 'components/Navigation';
import { Typography } from 'components/UI/Typography/Typography';
import { dispatchNotification, eventBus, EventTypes } from 'packages/EventBus';
import { Notification, NotificationType } from 'types/entities/Notification';
import { paymentNotification, PaymentStatus } from './NotificationHelper';

import sx from './Notifications.styles';

const baseNotification: ToastOptions = {
  theme: 'light',
  autoClose: 7000000,
  style: {
    maxWidth: '500px',
    width: '100%',
  },
};

const notificationTitleByType: Readonly<Record<NotificationType, string>> = {
  error: 'Произошла ошибка!',
  success: 'Успешно!',
  info: 'Внимание!',
  warning: 'Внимание!',
};

export function Notifications() {
  const { query, changeChapter, pathname } = useAppNavigation();

  useEffect(() => {
    const paymentMsg = paymentNotification[query.status as PaymentStatus];

    if (paymentMsg) {
      dispatchNotification(paymentMsg.message, { type: paymentMsg.type });
      changeChapter(pathname, false);
    }
  }, [query]);

  useEffect(() => {
    function toastNotify(res: Notification) {
      const message = (
        <>
          {res.title && <Typography sx={sx.title}>{res.title}</Typography>}
          {res.message && (
            <Typography variant='body1' sx={sx.message}>
              {res.message}
            </Typography>
          )}
        </>
      );
      toast(res?.message ? message : notificationTitleByType[res.type], {
        ...baseNotification,
        ...res,
        type: res.type,
      });
    }

    const dismissNotify = (id?: number | string) => {
      if (id) toast.dismiss(id);
    };

    eventBus.on(EventTypes.notification, toastNotify);
    eventBus.on(EventTypes.removeNotification, dismissNotify);

    return () => {
      eventBus.off(EventTypes.notification, toastNotify);
      eventBus.off(EventTypes.removeNotification, dismissNotify);
    };
  }, []);

  return null;
}

export default Notifications;
