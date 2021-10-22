import React, {useState, useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

import {SafeAreaProvider} from 'react-native-safe-area-context';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import NoInternetModal from './src/Components/NoInternetModal';
import Container from './src/library/toastify-react-native';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';
import {updateInternetConnection} from './src/redux/actions/init';
import {moderateScaleVertical, width} from './src/styles/responsiveSize';
import types from './src/redux/types';
import {getItem, getUserData} from './src/utils/utils';
import useInterval from './src/utils/useInterval';
import {
  notificationListener,
  requestUserPermission,
} from './src/utils/notificationServices';
import ShowNotificationForeground from './src/utils/ShowNotificationForeground';
import NotificationModal from './src/Components/NotificationModal';
import strings from './src/constants/lang';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [internetConnection, setInternet] = useState(true);

  const notificationConfig = () => {
    // requestUserPermission();
    notificationListener();
  };
  useEffect(() => {
    checkExistChannel();
    //stop splahs screen from loading
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const checkExistChannel = () => {
    PushNotification.getChannels(function (channel_ids) {
      console.log('exist channels', channel_ids); // ['channel_id_1']
    });
  };

  useEffect(() => {
    (async () => {
      const {dispatch} = store;

      const userData = await getUserData();
      const defaultLanguage = await getItem('defaultLanguage');
      console.log(userData, 'userData');
      // if (userData && !!userData?.access_token) {
      //   notificationConfig();
      // }
      notificationConfig();
      if (userData && !!userData?.access_token) {
        dispatch({
          type: types.LOGIN,
          payload: userData,
        });
      }
      if (defaultLanguage) {
        strings.setLanguage(defaultLanguage?.value);
        dispatch({
          type: types.DEFAULTLANGUAGE,
          payload: defaultLanguage,
        });
      }

      const getClientInfo = await getItem('clientInfo');
      dispatch({
        type: types.APP_INIT,
        payload: getClientInfo,
      });
    })();
    return () => {};
  }, []);

  //Check internet connection
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const netStatus = state.isConnected;
      setInternet(netStatus);
      updateInternetConnection(netStatus);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ShowNotificationForeground />
        <Routes />
        <NotificationModal />
      </Provider>
      <Container
        width={width - 20}
        position="top"
        duration={2000}
        positionValue={moderateScaleVertical(20)}
      />
      <FlashMessage position="top" />
      <NoInternetModal show={!internetConnection} />
    </SafeAreaProvider>
  );
};

export default App;
