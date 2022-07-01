import React, { useEffect } from 'react';
import { Store, iNotification } from 'react-notifications-component';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';

export const baseNotification: iNotification = {
  insert: 'bottom',
  container: 'bottom-right',
  animationIn: ['animate__animated', 'animate__fadeInRight'],
  animationOut: ['animate__animated', 'animate__fadeOutRight'],
  dismiss: {
    pauseOnHover: true,
    duration: 7000,
    onScreen: true,
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
        case NotificationType.DEFAULT:
        case NotificationType.INFO:
        case NotificationType.WARNING:
          return 'Внимание!';
        default:
          break;
      }
      return null;
    };

    eventBus.on(EventTypes.notification, res => {
      console.log('on');

      Store.addNotification({
        ...baseNotification,
        ...res,
        title: res.title ? res.title : getNotificationTitle(res.type),
        message: res?.message || 'Нет сообщения',
        type: res.type,
      });
    });

    eventBus.on(EventTypes.removeNotification, (id: string) => {
      console.log('off');
      Store.removeNotification(id);
    });
  }, []);

  return null;
}

export default Notifications;
