import React, {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {cloneDeep, debounce} from 'lodash';
import {Image, Switch, View, RefreshControl} from 'react-native';
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

export default function DashBoard({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);

  const [state, setState] = useState({
    isLoading: false,
    isEnabled: true,
    options: [
      {label: strings.TODAYSTASK, value: 0, testID: '1'},
      {label: strings.ALLTASKS, value: 1, testID: '2'},
    ],
    initial: 0,
    selectedOption: userData?.is_available,
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
  });
  const {
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
  } = state;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  // useEffect(() => {
  //   getTasks();
  // }, [initial]);

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

  //get all tasks
  const getTasks = () => {
    actions
      .getListOfTasks(
        `?all=${initial}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
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
    console.log(error, 'error');
    updateState({
      isLoading: false,
      isRefreshing: false,
      isLoading: false,
      isLoadingSwitch: false,
    });
    showError(error?.message || error?.error);
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const commonStyles = commonStylesFunc({fontFamily});

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const onOffDuty = () => {
    // alert('213');
    updateState({isLoadingSwitch: true});
    actions
      .onOffDuty(
        `?device_token=${DeviceInfo.getUniqueId()}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        console.log(res, 'onOffDuty>res>res');
        updateState({isLoadingSwitch: false});
        if (res?.data) {
          // updateState({isEnabled: res?.data?.is_available});
          let updatedUserData = {...userData};
          updatedUserData['is_available'] = res?.data?.is_available;
          actions.updataeUserData(updatedUserData);
        }
      })
      .catch(errorMethod);
  };

  const toggleSwitch = () => {
    updateState({isEnabled: !isEnabled});
  };

  //OFF DUTY CALL ON STATE UPDATE
  useEffect(() => {
    onOffDuty();
  }, [isEnabled]);

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
          // ios_backgroundColor="#3e3e3e"
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
    moveToNewScreen(navigationStrings.TASKDETAIL, {item:item,})();
  };

  const renderTaskList = ({item, index}) => {
    return (
      <TaskListCard
        data={item}
        index={index}
        allTasks={selectedOption ? allTasks : todaysTasks}
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
              marginVertical: moderateScaleVertical(20),
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
      <>
        <ListEmptyComponent
          isLoading={isLoading}
          message={strings.OFFDUTY}
          subMessage={strings.OFFDUTYMESSAGE}
          containerStyle={{backgroundColor: colors.backGround}}
          image={imagePath?.offDuty}
        />
      </>
    );
  };

  const mapRef = useRef();

  const fitPadding = newArray => {
    mapRef.current.fitToCoordinates(newArray, {
      edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
      animated: true,
    });
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
      {isEnabled ? (enableMap ? mapView() : homeMainView()) : offDutyView()}
    </WrapperContainer>
  );
}
