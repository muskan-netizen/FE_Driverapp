import React, {useEffect, useRef, useState} from 'react';
import {FlatList, NativeModules} from 'react-native';
import {cloneDeep, debounce} from 'lodash';
import {Image, Switch, View, RefreshControl,BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import SwitchSelectorComponent from '../../Components/SwitchSelector';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScaleVertical, width} from '../../styles/responsiveSize';
import TaskListCard from '../../Components/TaskListCard';
import {showError} from '../../utils/helperFunctions';
import ListEmptyComponent from '../../Components/ListEmptyComponent';
import strings from '../../constants/lang';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import styles from './styles';
import DeviceInfo from 'react-native-device-info';
import navigationStrings from '../../navigation/navigationStrings';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useInterval from '../../utils/useInterval';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {chekLocationPermission} from '../../utils/permissions';
navigator.geolocation = require('react-native-geolocation-service');
import Geocoder from 'react-native-geocoding';

export default function DashBoard({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  const [state, setState] = useState({
    isLoading: false,
    isEnabled: userData && userData?.is_available ? true : false,
    options: [
      {label: strings.TODAYSTASK, value: 0, testID: '1'},
      {label: strings.ALLTASKS, value: 1, testID: '2'},
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
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    coordinate: {
      latitude: 20.5937,
      longitude: 78.9629,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    enableMap: false,
    markers: [],
    isLoadingSwitch: false,
    fcm_token: null,
    statusChanged: false,
    longitude: null,
    latitude: null,
  });
  const {
    longitude,
    latitude,
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
  } = state;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  const sessionLogoutUser = useSelector(
    state => state?.initBoot?.sessionLogoutUser,
  );
  console.log(sessionLogoutUser, 'sessionLogoutUser');
  const refreshHomeData = useSelector(
    state => state?.initBoot?.refreshHomeData,
  );
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  useEffect(() => {
    (async () => {
      currentLocation();
      updateState({fcm_token: await AsyncStorage.getItem('fcmToken')});
    })();
    return () => {};
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const currentLocation = () => {
    chekLocationPermission()
      .then(result => {
        if (result !== 'goback') {
          getCurrentPosition();
        }
      })
      .catch(error => console.log('error while accessing location ', error));
  };

  const getCurrentPosition = () => {
    return navigator.geolocation.default.getCurrentPosition(
      position => {
        console.log(position, 'position');
        updateState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  useInterval(
    () => {
      getCurrentPosition();
      setTimeout(() => {
        (async () => {
          let data = {};
          data['device_type'] = Platform.OS;
          data['os_version'] = DeviceInfo.getSystemVersion();
          data['app_version'] = DeviceInfo.getVersion();
          data['on_route'] = 'y';
          data['battery_level'] = (await DeviceInfo.getBatteryLevel()) * 100;
          data['all'] = initial;
          // data['current_speed'] = 'y';
          data['long'] = longitude;
          data['lat'] = latitude;
          console.log(data, 'data>data');
          //   console.log(data, 'data');
          actions
            .logsApi(data, {client: clientInfo?.database_name})
            .then(res => {
              console.log(userData, 'userData');
              console.log(res, 'log api response');
              if (selectedOption == 1) {
                updateState({allTasks: res?.data?.tasks});
              } else {
                updateState({todaysTasks: res?.data?.tasks});
              }
            })
            .catch(errorMethod);
        })();
      }, 2000);
    },
    userData && userData?.access_token
      ? userData?.team?.location_frequency
        ? Number(userData?.team?.location_frequency) * 60000
        : 60000
      : null,
  );

  useFocusEffect(
    React.useCallback(() => {
      getTasks();
    }, [initial]),
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
        `?all=${initial}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        actions.updateHomepage(false);
        // updateState({isRefreshing: false});
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
    // actions.updateHomepage(false);
    // updateState({
    //   isLoading: false,
    //   isRefreshing: false,
    //   isLoading: false,
    //   isLoadingSwitch: false,
    //   statusChanged: false,
    // });
    showError(error?.message || error?.error);
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const commonStyles = commonStylesFunc({fontFamily});

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const onOffDuty = () => {
    actions
      .onOffDuty(
        `?device_token=${fcm_token}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        console.log(res, 'onOffDuty>res>res');
        updateState({isLoadingSwitch: false});
        if (res?.data) {
          updateState({statusChanged: false});
          let updatedUserData = {...userData};
          updatedUserData['is_available'] = res?.data?.is_available;
          actions.updataeUserData(updatedUserData);
        }
      })
      .catch(errorMethod);
  };

  console.log(isEnabled, 'isEnabled');
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
    updateState({initial: value, isLoading: true});
  };
  const customCenter = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingHorizontal: 10}}>
          <Image source={imagePath.locationOff} />
        </View>
        <Switch
          trackColor={{false: colors.backGround, true: colors.themeColor}}
          thumbColor={colors.white}
          // ios_backgroundColor=#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View style={{paddingHorizontal: 10}}>
          <Image source={imagePath.locationOn} />
        </View>
      </View>
    );
  };

  //pagination of data
  const onEndReached = ({distanceFromEnd}) => {
    updateState({pageNo: pageNo + 1});
  };

  const onEndReachedDelayed = debounce(onEndReached, 1000, {
    leading: true,
    trailing: false,
  });

  const _onPressTask = item => {
    console.log('Here it is', item);
    moveToNewScreen(navigationStrings.TASKDETAIL, {item: item})();
  };

  const renderTaskList = ({item, index}) => {
    let allData = selectedOption ? allTasks : todaysTasks;

    return (
      <TaskListCard
        data={item}
        index={index}
        previousData={index > 0 ? allData[index - 1] : null}
        allTasks={allData}
        _onPressTask={() => _onPressTask(item)}
      />
    );
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({pageNo: 1, isRefreshing: true});
  };

  const homeMainView = () => {
    return (
      <>
        <View style={{flex: 1}}>
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
              <ListEmptyComponent
                isLoading={isLoading}
                message={strings.NOTASK}
                subMessage={strings.NOTASKASSIGNED}
                containerStyle={{backgroundColor: colors.backGround}}
              />
            }
          />
        </View>
      </>
    );
  };
  const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

  const _onRegionChange = region => {
    updateState({region: region});
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
      let newArray = markers.map((i, inx) => {
        return {
          latitude: Number(i?.location?.latitude),
          longitude: Number(i?.location?.longitude),
        };
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

  const offDutyView = () => {
    return (
      <View style={{flex: 1}}>
        <ListEmptyComponent
          isLoading={isLoadingSwitch}
          message={strings.OFFDUTY}
          subMessage={strings.OFFDUTYMESSAGE}
          containerStyle={{backgroundColor: colors.backGround}}
          image={imagePath?.offDuty}
        />
      </View>
    );
  };

  const mapRef = useRef();

  const fitPadding = newArray => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(newArray, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
    }
  };

  const mapView = () => {
    if (markers.length)
      return (
        <MapView
          ref={mapRef}
          //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
          // initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // onLayout={() => fitToMap()}
          //   customMapStyle={mapStyle}
          onRegionChangeComplete={_onRegionChange}>
          {markers.map((coordinate, index) => (
            <MapView.Marker
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
              }}></MapView.Marker>
          ))}
        </MapView>
      );
    return (
      <ListEmptyComponent
        isLoading={isLoading}
        message={strings.NOTASK}
        subMessage={strings.NOTASKASSIGNED}
        containerStyle={{backgroundColor: colors.backGround}}
      />
    );
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

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.backGround}
      isLoading={isLoading || isLoadingSwitch}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIcon={imagePath.menu}
        onPressLeft={() => navigation.toggleDrawer()}
        // hideRight={true}
        customCenter={() => customCenter()}
        rightIcon={enableMap ? imagePath.listMenu : imagePath.map}
        onPressRight={() => {
          updateState({enableMap: !enableMap});
          // navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
        }}
      />
      <View style={{...commonStyles.headerTopLine}} />
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
            initial={initial}
            onPress={value => updateContent(value)}
          />
        ) : (
          <View style={{height: 35}} />
        )}
      </View>
      <View style={{flex: 1}}>{renderComponents()}</View>

      {/* {isEnabled ? (enableMap ? mapView() : homeMainView()) : offDutyView()} */}
    </WrapperContainer>
  );
}
