import {useEffect} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

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
              sound: notification.sound,
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

      PushNotification.configure({
        // This is hit in the following cases:
        // Android - Notification clicked while app is in any state
        // IOS - Any notification action (click, action, etc)
        onNotification: message => {
          console.log('Notification Received');
          console.log(message);
          // This basically just makes sure that the app is already loaded
          // (Initial notifications are handled later on)
          //
          message.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: message => {
          switch (
            message.data.type
            //
          ) {
          }
        },
      });
    });
    return unsubscribe;
  }, []);

  return null;
};

export default ShowNotificationForeground;
