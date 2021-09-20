import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import {
  getColorCodeWithOpactiyNumber,
  showError,
} from '../../utils/helperFunctions';
import styles from './styles';
import Communications from 'react-native-communications';
import navigationStrings from '../../navigation/navigationStrings';

var ACTION_TIMER = 1500;
var COLORS = ['#8FEE90', '#27A468'];
var _value = 0;
export default function TaskDetail({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  let taskDetail = route?.params?.data;
  console.log(taskDetail, 'taskDetail');
  const [state, setState] = useState({
    isLoading: false,
    region: {
      latitude: Number(taskDetail?.location?.latitude),
      longitude: Number(taskDetail?.location?.longitude),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    coordinate: {
      latitude: Number(taskDetail?.location?.latitude),
      longitude: Number(taskDetail?.location?.longitude),
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    textComplete: '',
    pressAction: new Animated.Value(0),
    buttonWidth: 0,
    buttonHeight: 0,
  });

  const {
    isLoading,
    region,
    coordinate,
    textComplete,
    pressAction,
    buttonWidth,
    buttonHeight,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  const _onRegionChange = region => {
    updateState({region: region});
  };

  useEffect(() => {
    pressAction.addListener(v => (_value = v.value));
  });

  const handlePressIn = () => {
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(animationActionComplete);
  };
  const handlePressOut = () => {
    Animated.timing(pressAction, {
      duration: _value * ACTION_TIMER,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  const animationActionComplete = () => {
    var message = '';
    if (_value === 1) {
      message = 'You held it long enough to fire the action!';
    }
    updateState({
      textComplete: message,
    });
  };

  const getButtonWidthLayout = e => {
    updateState({
      buttonWidth: e.nativeEvent.layout.width,
      buttonHeight: e.nativeEvent.layout.height,
    });
  };

  const mapView = () => {
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
          key={`coordinate_${taskDetail?.id}`}
          image={imagePath.pinRed}
          coordinate={{
            latitude: Number(taskDetail?.location?.latitude),
            longitude: Number(taskDetail?.location?.longitude),
          }}></MapView.Marker>
      </MapView>
    );
  };

  //get BackGroundColor
  const getBackGroudColor = name => {
    switch (name) {
      case 'Pickup':
        return getColorCodeWithOpactiyNumber(colors.circularBlue.substr(1), 50);
        break;
      case 'Drop':
        return getColorCodeWithOpactiyNumber(
          colors.circularOrnage.substr(1),
          50,
        );
        break;
      default:
        return getColorCodeWithOpactiyNumber(colors.circularRed.substr(1), 50);
        break;
    }
  };

  //get Text color
  const getTextColor = name => {
    switch (name) {
      case 'Pickup':
        return colors.circularBlue;
        break;
      case 'Drop':
        return colors.circularOrnage;
        break;
      default:
        return colors.circularRed;
        break;
    }
  };

  const getProgressStyles = () => {
    var width = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, buttonWidth],
    });
    var bgColor = pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS,
    });
    return {
      width: width,
      height: buttonHeight,
      backgroundColor: bgColor,
    };
  };

  const buttonView = () => {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <View style={styles.button} onLayout={getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, getProgressStyles()]} />
            <Text style={styles.text}>{'Hold to start'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text>{textComplete}</Text>
        </View>
      </View>
    );
  };

  const taskDetailView = () => {
    return (
      <ScrollView>
        <View style={{padding: moderateScale(15)}}>
          <View
            style={[
              styles.statusView,
              {
                backgroundColor: getBackGroudColor(taskDetail?.tasktype?.name),
              },
            ]}>
            <Text
              style={{
                color: getTextColor(taskDetail?.tasktype?.name),
                textAlign: 'center',
                fontFamily: fontFamily.medium,
                fontSize: textScale(10),
                paddingBottom: moderateScale(5),
              }}>
              {taskDetail?.tasktype?.name}
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 0.8}}>
                <Text style={styles.address}>
                  {taskDetail?.location?.address}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.2,
                  alignItems: 'center',
                }}>
                <Image source={imagePath?.path} />
              </View>
            </View>

            <Text style={styles.shortName}>
              {taskDetail?.location?.short_name}
            </Text>
          </View>
        </View>
        <View style={styles.taskDetailView}>
          <Text style={styles.taskText}>{strings.TASKDETAIL}</Text>
        </View>

        <View style={{padding: moderateScale(15)}}>
          <View style={styles.labelView}>
            <Image source={imagePath.customer} />
            <View
              style={{
                marginLeft: moderateScale(7),
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{flex: 0.7}}>
                <Text style={styles.taskLable}>{strings.CUSTOMER}</Text>
                <Text style={styles.taskValue}>
                  {taskDetail?.order?.customer?.name}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    taskDetail?.order?.recipient_phone
                      ? Communications.phonecall(
                          taskDetail?.order?.recipient_phone,
                          true,
                        )
                      : console.log()
                  }>
                  <Image source={imagePath?.call} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    taskDetail?.order?.recipient_phone
                      ? Communications.text(taskDetail?.order?.recipient_phone)
                      : console.log()
                  }
                  style={{marginLeft: moderateScale(10)}}>
                  <Image source={imagePath?.chatBlue} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.labelView}>
            <Image source={imagePath.task} />
            <View style={{marginLeft: moderateScale(7)}}>
              <Text style={styles.taskLable}>{strings.TASKTIMINGS}</Text>
              <Text style={styles.taskValue}>
                {taskDetail?.order?.order_time}
              </Text>
            </View>
          </View>

          {!!taskDetail?.order?.cash_to_be_collected && (
            <View style={styles.labelView}>
              <Image source={imagePath.details} />
              <View style={{marginLeft: moderateScale(7)}}>
                <Text style={styles.taskLable}>
                  {strings.CASHTOBECOLLECTED}
                </Text>
                <Text style={styles.taskValue}>
                  {Number(taskDetail?.order?.cash_to_be_collected).toFixed(2)}
                </Text>
              </View>
            </View>
          )}

          {!!taskDetail?.order?.task_description && (
            <View style={styles.labelView}>
              <Image source={imagePath.details} />
              <View style={{marginLeft: moderateScale(7)}}>
                <Text style={styles.taskLable}>{strings.TASKDETAIL}</Text>
                <Text style={styles.taskValue}>
                  {taskDetail?.order?.task_description}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  const cancelTask = () => {
    Alert.alert('', strings.CANCELMESSAGE, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => moveToNewScreen(navigationStrings.TASKCANCEL)(),
      },
    ]);
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoading={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIconStyle={{tintColor: colors.themeColor}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={strings.TASK}
        customRight={() => (
          <TouchableOpacity onPress={cancelTask}>
            <Text
              style={{
                color: colors.textGrey,
                fontFamily: fontFamily.regular,
                fontSize: textScale(10),
              }}>
              {strings.CANCEL}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={{...commonStyles.headerTopLine}} />
      {mapView()}
      <View style={styles.mainContainer}>
        {taskDetailView()}
        {buttonView()}
      </View>
    </WrapperContainer>
  );
}
