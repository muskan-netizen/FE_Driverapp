import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, FlatList, Image, Linking, RefreshControl, Switch, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import { loaderOne } from '../../Components/Loaders/AnimatedLoaderFiles';
import SwitchSelectorComponent from '../../Components/SwitchSelector';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MapView, {
  Marker
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ListEmptyComponent from '../../Components/ListEmptyComponent';
import TaskListCard from '../../Components/TaskListCard';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  width
} from '../../styles/responsiveSize';
import {
  getCurrentLocation,
  showError
} from '../../utils/helperFunctions';
import { requestUserPermission } from '../../utils/notificationServices';

import styles from './styles';
navigator.geolocation = require('react-native-geolocation-service');
// import BackgroundService from 'react-native-background-actions';

// import BackgroundTimer from 'react-native-background-timer';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';

export default function DashBoard({ route, navigation }) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  const [state, setState] = useState({
    isLoading: false,
    isEnabled: userData && userData?.is_available ? true : false,
    options: [
      { label: strings.TODAYSTASK, value: 0, testID: '1' },
      { label: strings.ALLTASKS, value: 1, testID: '2' },
    ],
    initial: 0,
    selectedOption: 0,
    todaysTasks: [],
    allTasks: [],
    isRefreshing: false,
    pageNo: 1,
    region: {
      latitude: 20.5937,
      longitude: 78.9629,
      latitudeDelta: 0.025,
      longitudeDelta: 0.0221,
    },
    coordinate: {
      latitude: 20.5937,
      longitude: 78.9629,
      latitudeDelta: 0.025,
      longitudeDelta: 0.0221,
    },
    enableMap: true,
    markers: [],
    isLoadingSwitch: false,
    fcm_token: null,
    statusChanged: false,
    longitude: 77.4753352147053,
    latitude: 27.685284872673407,
    heading: 0,
    isWarningAlert: false,
    warningStatus: false,
  });
  const {
    longitude,
    latitude,
    heading,
    region,
    coordinate,
    todaysTasks,
    allTasks,
    initial,
    options,
    isEnabled,
    isLoading,
    selectedOption,
    isRefreshing,
    pageNo,
    enableMap,
    markers,
    isLoadingSwitch,
    fcm_token,
    statusChanged,
    isWarningAlert,
    warningStatus,
  } = state;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const sessionLogoutUser = useSelector(
    state => state?.initBoot?.sessionLogoutUser,
  );
  const refreshHomeData = useSelector(
    state => state?.initBoot?.refreshHomeData,
  );
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  const fcmToken = useSelector(state => state?.initBoot?.fcmToken);
  const zendeskKeys = useSelector(state => state?.initBoot?.zendeskKeys);


  useEffect(() => {
    (async () => {
      currentLocation();
      updateState({
        fcm_token: fcmToken,
      });
    })();
    return () => { };
  }, []);

  useEffect(() => {
    if (refreshHomeData && enableMap) {
      updateState({
        enableMap: false,
      });
    }
  }, [refreshHomeData]);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);



  useEffect(() => {

    if(!DeviceInfo.isEmulator()){
      BackgroundGeolocation.on('location', (location) => {
        console.log(location, "location >>>>>>>");
        let headingAngle = location?.bearing || 0.00
        let lat = location?.latitude || 0
        let long = location.longitude || 0
        fetchgentLogs(lat, long, headingAngle)
      });
  
  
      BackgroundGeolocation.on('error', (error) => {
        console.log('[ERROR] BackgroundGeolocation error:', error);
      });
  
  
      BackgroundGeolocation.on('authorization', (status) => {
        console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
          setTimeout(() =>
            Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
              { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
              { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
            ]), 1000);
        }
      });
  
      BackgroundGeolocation.on('background', () => {
  
        console.log('[INFO] App is in background');
  
  
      });
  
      BackgroundGeolocation.on('foreground', () => {
        console.log('[INFO] App is in foreground');
  
      });
  
      BackgroundGeolocation.on('abort_requested', () => {
        console.log('[INFO] Server responded with 285 Updates Not Required');
      });
  
      BackgroundGeolocation.on('http_authorization', () => {
        console.log('[INFO] App needs to authorize the http requests');
      });
  
      BackgroundGeolocation.checkStatus(status => {
        console.log(status, "status.isRunning");
        if (!status.isRunning) {
          BackgroundGeolocation.start(); //triggers start on start event
        }
      });
  
      BackgroundGeolocation.configure({
        activityType: 'Fitness',
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 10,
        distanceFilter: 10,
        debug: false,
        startOnBoot: false,
        stopOnTerminate: true,
        notificationTitle: 'Location Tracking',
        notificationText: `Tracking driver's location in background.`,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 10000,
        fastestInterval: 10000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
        pauseLocationUpdates: false,
        url: '',
        httpHeaders: {
          'X-FOO': 'bar'
        },
        // customize post properties
        postTemplate: {
          lat: '@latitude',
          lon: '@longitude',
          foo: 'bar' // you can also add your own properties
        }
      })
  
      return () => {
        BackgroundGeolocation.removeAllListeners();
      }
    }


  }, [])




  useFocusEffect(
    React.useCallback(() => {
      updateState({
        isLoading: true,
        options: [
          { label: strings.TODAYSTASK, value: 0, testID: '1' },
          { label: strings.ALLTASKS, value: 1, testID: '2' },
        ],
      });
    }, []),
  );





  const fetchgentLogs = async (lat, lng, heading_) => {
   
    if (userData?.access_token) {
      let data = {};
      data['device_type'] = Platform.OS;
      data['os_version'] = DeviceInfo.getSystemVersion();
      data['app_version'] = DeviceInfo.getVersion();
      data['on_route'] = 'y';
      data['battery_level'] = (await DeviceInfo.getBatteryLevel()) * 100;
      data['all'] = selectedOption;
      // data['current_speed'] = 'y';
      data['long'] = lng
      data['lat'] = lat
      data['device_token'] = !!fcmToken ? fcmToken : '';
      data['heading_angle'] = heading_
      // console.log(data, 'data>data');
      console.log(data, 'sending data data??????');
      actions
        .logsApi(data, { client: clientInfo?.database_name })
        .then(res => {
          console.log(res, 'logs data');
          if (
            res?.data?.user?.client_preference
              ?.customer_support_application_id != null &&
            res?.data?.user?.client_preference?.customer_support_key != null
          ) {
            if (
              zendeskKeys?.keys?.account_key !=
              res?.data?.user?.client_preference?.customer_support_key &&
              zendeskKeys?.keys?.application_id !=
              res?.data?.user?.client_preference
                ?.customer_support_application_id
            )
              actions?.setZendeskKeys({
                keys: {
                  application_id:
                    res?.data?.user?.client_preference
                      ?.customer_support_application_id,
                  account_key:
                    res?.data?.user?.client_preference
                      ?.customer_support_key,
                },
              });
          }
          console.log(res, 'res>>>>>>>agenLog');

          if (selectedOption == 1) {
            updateState({ allTasks: res?.data?.tasks });
          } else {
            updateState({ todaysTasks: res?.data?.tasks });
          }
        })
        .catch(errorMethod);
    }

  };



  useFocusEffect(
    React.useCallback(() => {
      getTasks();
    }, [selectedOption]),
  );

  useEffect(() => {
    {
      (isLoading || isRefreshing) && getTasks();
    }
  }, [isLoading, isRefreshing]);

  useEffect(() => {
    if (refreshHomeData) {
      getTasks();
    }
  }, [refreshHomeData]);

  //get all tasks
  const getTasks = () => {
    actions
      .getListOfTasks(
        `?all=${selectedOption}`,
        {},
        { client: clientInfo?.database_name },
      )
      .then(res => {
        actions.updateHomepage(false);
        // updateState({isRefreshing: false});
        console.log(res, 'allTasksallTasks');
        if (selectedOption) {
          updateState({
            allTasks: res?.data,
            markers: res?.data,
            isRefreshing: false,
            isLoading: false,
          });
        } else {
          updateState({
            todaysTasks: res?.data,
            markers: res?.data,
            isRefreshing: false,
            isLoading: false,
          });
        }

        console.log(res, 'res>res');
      })
      .catch(errorMethod);
  };
  //Error handling in api
  const errorMethod = error => {
    console.log(error, 'error>>>>>>>>>>>>>>>>>>>>>');
    showError(error?.message || error?.error);
  };

  const updateState = data => setState(state => ({ ...state, ...data }));

  const commonStyles = commonStylesFunc({ fontFamily });

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, { data });
  };

  const onOffDuty = () => {
    actions
      .onOffDuty(
        `?device_token=${fcm_token ? fcm_token : DeviceInfo.getDeviceToken()}`,
        {},
        { client: clientInfo?.database_name },
      )
      .then(res => {
        console.log(res, 'onOffDuty>res>res');
        updateState({ isLoadingSwitch: false });
        if (res?.data) {
          updateState({ statusChanged: false });
          let updatedUserData = { ...userData };
          updatedUserData['is_available'] = res?.data?.is_available;
          actions.updataeUserData(updatedUserData);
        }
      })
      .catch(errorMethod);
  };

  const toggleSwitch = () => {
    updateState({
      statusChanged: true,
      isEnabled: !isEnabled,
      isLoadingSwitch: true,
    });
    setTimeout(() => {
      onOffDuty();
    }, 500);
  };

  const updateContent = value => {
    updateState({ selectedOption: value, isLoading: true });
  };
  const customCenter = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Image source={imagePath.locationOff} />
        </View>
        <Switch
          trackColor={{ false: colors.backGround, true: colors.themeColor }}
          thumbColor={colors.white}
          // ios_backgroundColor=#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Image source={imagePath.locationOn} />
        </View>
      </View>
    );
  };

  //pagination of data
  const onEndReached = ({ distanceFromEnd }) => {
    updateState({ pageNo: pageNo + 1 });
  };

  const onEndReachedDelayed = debounce(onEndReached, 1000, {
    leading: true,
    trailing: false,
  });

  const _onPressTask = item => {
    console.log('Here it is', item);
    moveToNewScreen(navigationStrings.TASKDETAIL, { item: item })();
  };

  const renderTaskList = ({ item, index }) => {
    let allData = selectedOption ? allTasks : todaysTasks;

    return (
      <TaskListCard
        data={item}
        index={index}
        previousData={index > 0 ? allData[index - 1] : null}
        allTasks={allData}
        _onPressTask={() => _onPressTask(item)}
        _onPressTaskDetails={() => _onPressTaskDetails(item)}
      />
    );
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({ pageNo: 1, isRefreshing: true });
  };

  const homeMainView = () => {
    return (
      <>
        <View style={{ flex: 1 }}>
          {(selectedOption ? allTasks?.length : todaysTasks?.length) ? (
            <FlatList
              data={selectedOption ? allTasks : todaysTasks}
              renderItem={renderTaskList}
              keyExtractor={(item, index) => String(index)}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
                backgroundColor: !!(selectedOption == 1 && !allTasks.length)
                  ? colors.backGround
                  : !!(selectedOption == 0 && !todaysTasks.length)
                    ? colors.backGround
                    : colors.white,
              }}
              contentContainerStyle={{
                flexGrow: 1,
                // marginVertical: moderateScaleVertical(20),
              }}
              refreshing={isRefreshing}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                // tintColor={colors.primary_color}
                />
              }
              onEndReached={onEndReachedDelayed}
              onEndReachedThreshold={0.5}
              // ListFooterComponent={() => (
              //   <View style={{height: moderateScaleVertical(65)}} />
              // )}
              ListEmptyComponent={
                () => (
                  <ListEmptyComponent
                    isLoading={isLoading}
                    message={strings.NOTASK}
                    subMessage={strings.NOTASKASSIGNED}
                    containerStyle={{ backgroundColor: colors.backGround }}
                  />
                )
              }
            />
          ) : <ListEmptyComponent
            isLoading={isLoading}
            message={strings.NOTASK}
            subMessage={strings.NOTASKASSIGNED}
            containerStyle={{ backgroundColor: colors.backGround }}
          />}
        </View>
      </>
    );
  };
  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

  const _onRegionChange = region => {
    updateState({ region: region });
    // _getAddressBasedOnCoordinates(region);

    console.log(markers, ' mapRef.current');
  };

  const animate = region => {
    mapRef.current.animateToRegion({
      region: region,
      duration: 500,
    });
  };

  const fitToMap = () => {
    if (markers && markers.length && enableMap) {
      let newArray = markers.filter((i, inx) => {
        if (i && i?.location && i?.location?.latitude != NaN && i?.location?.longitude != NaN) {
          return {
            latitude: Number(i?.location?.latitude),
            longitude: Number(i?.location?.longitude),
          }
        }

      });
      console.log(newArray, 'newArray');
      // animate(region);
      setTimeout(() => {
        // animate(region);
        fitPadding(newArray);
      }, 500);
    }
  };

  useEffect(() => {
    fitToMap();
  }, [markers, enableMap]);

  useEffect(() => {
    if (latitude && longitude) {
      console.log('regionregion', region);
      // {"latitude": 20.5937, "latitudeDelta": 0.015, "longitude": 78.9629, "longitudeDelta": 0.0121}
      fitPadding([
        {
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.035,
          longitudeDelta: 0.0321,
        },
        {
          latitude: Number(latitude) - 0.001,
          longitude: Number(longitude) - 0.01,
          latitudeDelta: 0.035,
          longitudeDelta: 0.0321,
        },
      ]);
    }
  }, [latitude, longitude]);

  //show warrning

  const _onOpenSettings = () => {
    Linking.openSettings();
  };

  const toggleWarning = state => updateState({ isWarningAlert: state });
  useEffect(() => {
    const interval = setInterval(() => {
      requestUserPermission(toggleWarning);
    }, 1000);
    if (!isWarningAlert && interval && (fcmToken || warningStatus))
      clearInterval(interval);
    updateState({ warningStatus: 1 });
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWarningAlert]);

  const offDutyView = () => {
    return (
      <View style={{ flex: 1 }}>
        <ListEmptyComponent
          isLoading={isLoadingSwitch}
          message={strings.OFFDUTY}
          subMessage={strings.OFFDUTYMESSAGE}
          containerStyle={{ backgroundColor: colors.backGround }}
          image={imagePath?.offDuty}
        />
      </View>
    );
  };

  const mapRef = useRef();

  const fitPadding = newArray => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([{ latitude, longitude }, ...newArray], {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }
  };

  const animation = React.createRef();
  console.log(latitude, longitude, "longitude");

  const mapView = () => {
    return (
      <MapView
        ref={mapRef}
        //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={region}
        zoomEnabled={true}
        initialRegion={region}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        onLayout={() => fitToMap()}
        //   customMapStyle={mapStyle}
        onRegionChangeComplete={_onRegionChange}>
        {markers?.map((coordinate, index) => (
          coordinate && coordinate?.location && coordinate?.location?.latitude != NaN && coordinate?.location?.longitude != NaN && <Marker
            tracksViewChanges={false}
            zIndex={index}
            key={`coordinate_${index}`}
            image={imagePath.pinRed}
            onPress={() => {
              _onPressTask(coordinate);
            }}
            coordinate={{
              latitude: Number(coordinate?.location?.latitude),
              longitude: Number(coordinate?.location?.longitude),
            }}></Marker>
        ))}
        <Marker
          image={imagePath.pinBlue}
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}></Marker>
      </MapView>
    );

    // return (
    //   <ListEmptyComponent
    //     isLoading={isLoading}
    //     message={strings.NOTASK}
    //     subMessage={strings.NOTASKASSIGNED}
    //     containerStyle={{backgroundColor: colors.backGround}}
    //   />
    // );
  };

  const renderComponents = () => {
    switch (isEnabled) {
      case true:
        if (enableMap) {
          console.log(enableMap, 'enableMap>enableMap');
          return mapView();
        } else {
          return homeMainView();
        }
        break;

      default:
        return offDutyView();
        break;
    }
  };

  const _onSwitchMapView = () => {
    updateState({ enableMap: !enableMap });
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.backGround}
      isLoading={isLoading || isLoadingSwitch}
      source={loaderOne}>
      <Header
        reverse={false}
        headerStyle={{ backgroundColor: colors.white }}
        leftIcon={imagePath.menu}
        onPressLeft={() => navigation.toggleDrawer()}
        // hideRight={true}
        customCenter={() => customCenter()}
        rightIcon={!enableMap ? imagePath.map : imagePath.listMenu}
        onPressRight={_onSwitchMapView}
      />
      <View style={{ ...commonStyles.headerTopLine }} />
      {isWarningAlert && (
        <View
          style={{
            backgroundColor: colors.lightRed,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10),
          }}>
          <View style={{ width: width / 2.2, justifyContent: 'center' }}>
            <Text style={{ color: colors.white, fontFamily: fontFamily.regular }}>
              {strings.notificationAlert}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              width: width / 2.5,
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: moderateScaleVertical(5),
              paddingVertical: moderateScaleVertical(10),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.themeColor,
                alignItems: 'center',
                marginVertical: moderateScaleVertical(10),
                paddingVertical: moderateScaleVertical(5),
                paddingHorizontal: moderateScale(10),
                borderRadius: 8,
              }}
              onPress={() => toggleWarning(false)}>
              <Text style={{ color: colors.white }}>{strings.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.themeColor,
                alignItems: 'center',
                marginVertical: moderateScaleVertical(10),
                paddingVertical: moderateScaleVertical(5),
                paddingHorizontal: moderateScale(10),
                borderRadius: 8,
              }}
              onPress={() => _onOpenSettings()}>
              <Text style={{ color: colors.white }}>{strings.ENABLE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScaleVertical(20),
          paddingBottom: moderateScaleVertical(20),
          borderBottomWidth: moderateScaleVertical(1),
          borderBottomColor: colors.lightGreyBg,
        }}>
        {isEnabled ? (
          <SwitchSelectorComponent
            options={options}
            initial={selectedOption}
            onPress={value => updateContent(value)}
          />
        ) : (
          <View style={{ height: 35 }} />
        )}
      </View>
      <View style={{ flex: 1 }}>{renderComponents()}</View>

      {/* {isEnabled ? (enableMap ? mapView() : homeMainView()) : offDutyView()} */}
    </WrapperContainer>
  );
}
