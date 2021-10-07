import {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import actions from '../redux/actions';

const ShowNotificationForeground = props => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote message foreground', remoteMessage);
      const {data, messageId, notification} = remoteMessage;
      {
        Platform.OS == 'ios'
          ? PushNotificationIOS.addNotificationRequest({
              id: messageId,
              body: data?.message || '',
              title: data?.type || '',
              sound:
                notification.sound == 'notification.mp3'
                  ? 'notification.mp3'
                  : 'default',
            })
          : PushNotification.localNotification({
              channelId: notification.android.channelId,
              id: messageId,
              body: data?.message || '',
              title: data?.type || '',
              soundName: notification.android.sound,
              vibrate: true,
              playSound: true,
            });
      }
      if (
        Platform.OS == 'android' &&
        notification.android.sound == 'notification'
      ) {
        if (data?.type != 'N') {
          actions.isModalVisibleForAcceptReject({
            isModalVisibleForAcceptReject: true,
            notificationData: remoteMessage,
          });
        }
      }
      if (Platform.OS == 'ios' && notification.sound == 'notification.mp3') {
        console.log('here>>3');
        if (data?.type != 'N') {
          actions.isModalVisibleForAcceptReject({
            isModalVisibleForAcceptReject: true,
            notificationData: remoteMessage,
          });
        }
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ShowNotificationForeground;
