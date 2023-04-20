
import { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
// import PushNotification, { Importance } from 'react-native-push-notification';
import actions from '../redux/actions';
import { navigate } from '../navigation/NavigationService';
import navigationStrings from '../navigation/navigationStrings';
import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native';
import { showhideNotificationModal } from './helperFunctions';

const ShowNotificationForeground = props => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote message foreground', remoteMessage);
      const { data, messageId, notification } = remoteMessage;
      let notificationType = data?.type || data?.notificationType || 'AR';

      console.log(notificationType,"notificationType");

      const channelId = await notifee.createChannel({
        id: 'default-channel-id',
        name: 'Default Channel',
        vibration: true,
        lightColor: AndroidColor.YELLOW,
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
      const channelIdRoyo = await notifee.createChannel({
        id: 'Royo-Delivery',
        name: 'Royo Delivery',
        vibration: true,
        lightColor: AndroidColor.YELLOW,
        sound: 'notification',
        importance: AndroidImportance.HIGH,
      });
      let displayNotificationData = {}
      if (Platform.OS == "ios") {
        displayNotificationData = {
          title: notificationType || notification?.title || '',
          body: data?.message || notification?.body || '',
          data: { ...data },
        };

      }
      else {
        displayNotificationData = {
          title: notificationType || notification?.title || '',
          body: data?.message || notification?.body || '',
          android: {
            sound: notification.sound == 'notification'
              ? 'notification'
              : 'default',
            channelId: notification.android?.channelId || channelId,
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,

          },
          data: { ...data },
        };
      }

    

      await notifee.displayNotification(displayNotificationData);
      if (
        Platform.OS == 'android' &&
        notification.android.sound == 'notification'
      ) {
        console.log('here>>2');
        if (data && notificationType && notificationType != 'N') {
          actions.isModalVisibleForAcceptReject({
            isModalVisibleForAcceptReject:showhideNotificationModal(notificationType),
            notificationData: remoteMessage,
          });
        }
        if (data?.callback_url != '' && data?.callback_url != null) {
          navigate(navigationStrings.ORDERDETAIL, {
            data: { item: data?.callback_url, fromNotification: true },
          });
        }
      }
      if (Platform.OS == 'ios' && notification.sound == 'notification.mp3') {
        console.log('here>>3');
        if (data && notificationType && notificationType != 'N') {
          actions.isModalVisibleForAcceptReject({
            isModalVisibleForAcceptReject:showhideNotificationModal(notificationType),
            notificationData: remoteMessage,
          });
        }
        if (data?.callback_url != '' && data?.callback_url != null) {
          navigate(navigationStrings.ORDERDETAIL, {
            data: { item: data?.callback_url, fromNotification: true },
          });
        }
      }
    });
    return unsubscribe;
  }, []);
  return null;
};




export default ShowNotificationForeground;