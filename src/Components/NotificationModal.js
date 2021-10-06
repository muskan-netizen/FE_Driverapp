//import liraries
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import actions from '../redux/actions';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import ModalView from './ShortCodeConfirmModal';

const NotificationModal = () => {
  const [state, setState] = useState({
    pageActive: 1,
    acceptLoader: false,
    rejectLoader: false,
    selectedOrder: null,
    isRefreshing: false,
    region: null,
  });
  const notificationData = useSelector(
    state => state?.initBoot?.notificationData,
  );
  console.log(notificationData, 'notificationData');

  const {
    pageActive,
    region,
    acceptLoader,
    rejectLoader,
    selectedOrder,
    isRefreshing,
  } = state;

  useEffect(() => {
    let data = notificationData?.notificationData?.data;
    if (data) {
      updateState({
        region: {
          latitude: Number(data?.lat),
          longitude: Number(data?.long),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
      });
    }
  }, [notificationData?.notificationData?.data]);

  //update state
  const updateState = data => setState(state => ({...state, ...data}));

  const _onRegionChange = region => {
    updateState({region: region});
  };

  const mapView = () => {
    let data = notificationData?.notificationData?.data;
    if (data) {
      return (
        <MapView
          //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
          initialRegion={region}
          //   customMapStyle={mapStyle}
          onRegionChangeComplete={_onRegionChange}>
          <MapView.Marker
            tracksViewChanges={false}
            key={data?.id}
            image={imagePath.pinRed}
            coordinate={{
              latitude: Number(data?.lat),
              longitude: Number(data?.long),
            }}></MapView.Marker>
        </MapView>
      );
    }
  };
  const modalMainContent = () => {
    let data = notificationData?.notificationData?.data;
    return (
      <View style={{overflow: 'hidden'}}>
        <View>{!!region && mapView()}</View>
        <View style={{padding: 10}}>
          <Text style={styles.address}>{data?.address}</Text>
          <Text style={styles.dateTimeStyle}>{data?.short_name}</Text>

          <Text style={[styles.dateTimeStyle, {marginTop: moderateScale(10)}]}>
            {strings.TASKDATE}
          </Text>
          <Text style={styles.address}>{'06 Oct, 2021 11:55'}</Text>

          {!!data?.cash_to_be_collected && (
            <View>
              <Text
                style={[styles.dateTimeStyle, {marginTop: moderateScale(10)}]}>
                {strings.CASHTOBECOLLECTED}
              </Text>
              <Text style={styles.address}>
                {Number(data?.cash_to_be_collected).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 40,
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            // borderBottomRadius: moderateScale(10),
          }}>
          <View
            style={{
              flex: 0.5,
              borderBottomLeftRadius: moderateScale(15),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
            }}>
            <Text style={styles.text}>{strings.CANCEL}</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              borderBottomRightRadius: moderateScale(15),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'green',
            }}>
            <Text style={styles.text}>{strings.ACCEPT}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ModalView
      data={''}
      isVisible={notificationData?.isModalVisibleForAcceptReject}
      onClose={() =>
        actions.isModalVisibleForAcceptReject({
          isModalVisibleForAcceptReject: false,
          notificationData: null,
        })
      }
      mainViewStyle={{
        // minHeight: height / 3,
        maxHeight: height,
        // marginHorizontal: moderateScale(10),
      }}
      modalMainContent={modalMainContent}
      // modalBottomContent={modalBottomContent}
    />
  );
};

const styles = StyleSheet.create({
  toolTipStyle: {
    height: moderateScale(8),
    alignItems: 'center',
    width: moderateScale(30),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    marginVertical: moderateScale(10),
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(10),
    height: moderateScale(width / 3),
  },
  address: {
    fontFamily: fontFamily.semiBold,
    fontSize: textScale(14),
  },
  dateTimeStyle: {
    fontFamily: fontFamily.semiBold,
    fontSize: textScale(10),
    opacity: 0.5,
    // paddingLeft: 5,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: textScale(14),
  },
});

export default NotificationModal;
