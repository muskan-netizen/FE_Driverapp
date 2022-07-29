//import liraries
import {useNavigation} from '@react-navigation/native';
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
import {showError} from '../utils/helperFunctions';
import ModalView from './ShortCodeConfirmModal';
import moment from 'moment';
import {shortCodes} from '../utils/constants/DynamicAppKeys';

const NotificationModal = () => {
  const [state, setState] = useState({
    pageActive: 1,
    acceptLoader: false,
    rejectLoader: false,
    selectedOrder: null,
    isRefreshing: false,
    region: null,
    notificationDropLocationsData: [],
    orderCost: null,
    totalDistance: null,
    taskId: null,
  });
  const {notificationData} = useSelector(state => state?.initBoot);

  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const shortCode = useSelector(state => state?.initBoot?.shortCode);

  const {
    pageActive,
    region,
    acceptLoader,
    rejectLoader,
    selectedOrder,
    isRefreshing,
    notificationDropLocationsData,
    orderCost,
    totalDistance,
    taskId,
  } = state;

  console.log(notificationData, 'notificationDatanotificationData');

  useEffect(() => {
    let data = notificationData?.notificationData?.data;
    if (data && data?.order_id) {
      getCustomNotificationData();
    }
    if (data?.lat && data?.long) {
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
    }
  }, [notificationData?.notificationData?.data]);

  //update state
  const updateState = data => setState(state => ({...state, ...data}));

  const _onRegionChange = region => {
    updateState({region: region});
  };

  const getCustomNotificationData = () => {
    actions
      .getCustomNotificationPayload(
        `/${notificationData?.notificationData?.data?.order_id}`,
        {},
        {shortCode: shortCode},
      )
      .then(res => {
        console.log(res, 'resres');
        updateState({
          notificationDropLocationsData: res?.tasks,
          orderCost: res?.order?.order_cost,
          totalDistance: res?.order?.actual_distance,
          taskId: res?.order?.unique_id,
        });
      })
      .catch(error => console.log('error in notification Data', error));
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

  const getDate = date => {
    const local = moment.utc(date).local().format('DD MMM YYYY hh:mm:a');
    return local;
  };

  const onListAllAddress = ({item, index}) => {
    if (item?.task_type_id == 2) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View style={{marginHorizontal: moderateScale(10)}}>
            {renderDotContainer()}
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              style={[
                styles.address,
                {
                  marginTop: moderateScaleVertical(28),
                },
              ]}>
              {item?.address}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderDotContainer = () => {
    return (
      <>
        <View style={{height: 40, overflow: 'hidden', alignItems: 'center'}}>
          <View
            style={{
              height: 40,
              width: 0.5,
              backgroundColor: colors.textGreyLight,
            }}
          />
        </View>

        <Image
          style={{
            tintColor: colors.redB,
          }}
          source={imagePath.blackSquare}
        />
      </>
    );
  };

  const modalMainContent = () => {
    let data = notificationData?.notificationData?.data;
    let notificationType = data?.type?data?.type:data?.notificationType
    return (
      <View style={{overflow: 'hidden', borderRadius: moderateScale(10)}}>
        <View>{!!region && mapView()}</View>
        <View style={{padding: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 2.4,
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  marginVertical: moderateScaleVertical(10),
                  textAlign: 'right',
                  fontSize: textScale(10),
                  color: colors.black,
                  fontFamily: fontFamily.regular,
                }}>
                {strings.TASKID}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginVertical: moderateScaleVertical(10),
                  textAlign: 'right',
                  fontSize: textScale(12),
                  color: colors.black,
                  fontFamily: fontFamily.regular,
                }}>
                {` ${taskId}`}
              </Text>
            </View>
            {orderCost && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    marginVertical: moderateScaleVertical(10),
                    textAlign: 'right',
                    fontSize: textScale(10),
                    color: colors.green,
                    fontFamily: fontFamily.bold,
                  }}>
                  {strings.PRICE}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginVertical: moderateScaleVertical(10),
                    textAlign: 'right',
                    fontSize: textScale(12),
                    color: colors.green,
                    fontFamily: fontFamily.bold,
                  }}>
                  {` ${orderCost}`}
                </Text>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={{
                  position: 'absolute',
                  marginHorizontal: moderateScale(11),
                  top: 8,
                }}
                source={imagePath.grayDot}
              />
            </View>
            <View>
              <View style={{paddingHorizontal: moderateScale(30)}}>
                <Text numberOfLines={1} style={[styles.address]}>
                  {data?.address}
                </Text>
              </View>
              <FlatList
                data={
                  notificationDropLocationsData
                    ? notificationDropLocationsData
                    : []
                }
                renderItem={onListAllAddress}
                keyExtractor={(item, index) => String(index)}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={[styles.dateTimeStyle, {marginTop: moderateScale(10)}]}>
                {strings.TASKDATE}
              </Text>
              <Text style={styles.address}>{getDate(data?.created_at)}</Text>

              {!!Number(data?.cash_to_be_collected) > 0 
              && (
                <View>
                  <Text
                    style={[
                      styles.dateTimeStyle,
                      {marginTop: moderateScale(10)},
                    ]}>
                    {strings.CASHTOBECOLLECTED}
                  </Text>
                  <Text style={styles.address}>
                    {Number(data?.cash_to_be_collected).toFixed(2)}
                  </Text>
                </View>
              )}
            </View>
            {totalDistance && (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.dateTimeStyle,
                    {marginTop: moderateScale(10)},
                  ]}>
                  {strings.TASKDISTANCE}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: textScale(14),
                    color: colors.redB,
                    fontFamily: fontFamily.bold,
                  }}>
                  {`${totalDistance}`}
                </Text>
              </View>
            )}
          </View>
        </View>
        {notificationType == 'AR' ? (
          <View
            style={{
              borderRadius: 10,
              height: 40,
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              // borderBottomRadius: moderateScale(10),
            }}>
            <TouchableOpacity
              onPress={() => aceptRejectTask(2)}
              style={{
                flex: 0.5,
                borderBottomLeftRadius: moderateScale(15),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text style={styles.text}>{strings.REJECT}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => aceptRejectTask(1)}
              style={{
                flex: 0.5,
                borderBottomRightRadius: moderateScale(15),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'green',
              }}>
              <Text style={styles.text}>{strings.ACCEPT}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              borderRadius: 10,
              height: 40,
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignSelf: 'flex-end',
              // borderBottomRadius: moderateScale(10),
            }}>
            <TouchableOpacity
              onPress={() => {
                actions.isModalVisibleForAcceptReject({
                  isModalVisibleForAcceptReject: false,
                  notificationData: null,
                });
                actions.updateHomepage(true);
              }}
              style={{
                flex: 1,
                borderBottomLeftRadius: moderateScale(15),
                borderBottomRightRadius: moderateScale(15),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'green',
              }}>
              <Text style={styles.text}>{strings.DONE}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const aceptRejectTask = status => {
    let notifData = notificationData?.notificationData?.data;

    let data = {};
    data['order_id'] = !!notifData?.batch_no
      ? notifData?.batch_no
      : notifData?.order_id;
    data['driver_id'] = notifData?.driver_id;
    data['status'] = status;
    data['type'] = !!notifData?.batch_no ? 'B' : 'O';

    console.log(data, clientInfo?.database_name, 'data accept reject');
    actions
      .acceptRejectTask(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'submitReason>res>res');
        updateState({isLoading: false});
        actions.isModalVisibleForAcceptReject({
          isModalVisibleForAcceptReject: false,
          notificationData: null,
        });
        actions.updateHomepage(true);
      })

      .catch(errorMethod);
  };

  //Error handling in api
  const errorMethod = error => {
    console.log(error, 'error');
    updateState({
      isLoading: false,
      isRefreshing: false,
      isLoading: false,
      isModalVisibleForAcceptReject: false,
    });
    showError(error?.message || error?.error);
  };

  return (
    <ModalView
      data={''}
      isVisible={notificationData?.isModalVisibleForAcceptReject}
      // onClose={() =>
      //   actions.isModalVisibleForAcceptReject({
      //     isModalVisibleForAcceptReject: false,
      //     notificationData: null,
      //   })
      // }
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
    height: moderateScale(width / 2),
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
