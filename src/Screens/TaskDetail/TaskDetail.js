import {cloneDeep} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Communications from 'react-native-communications';
import MapView from 'react-native-maps';
// import {createOpenLink} from '../../utils/CreateMapLinks';
import {createOpenLink} from 'react-native-open-maps';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import moment from 'moment';

import {
  getColorCodeWithOpactiyNumber,
  showError,
} from '../../utils/helperFunctions';
import styles from './styles';

var ACTION_TIMER = 1500;
var COLORS = ['#8FEE90', '#27A468'];
var _value = 0;
export default function TaskDetail({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  let taskDetail = route?.params?.data?.item;
  let fromHistory = route?.params?.data?.fromHistory;

  console.log(taskDetail, 'taskDetail');
  console.log(fromHistory, 'fromHistory');

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
    taskStatus: taskDetail?.task_status ? Number(taskDetail?.task_status) : '',
    buttonPressComplete: 0,
    buttonText: '',
    taskProofArray: [
      {
        id: 1,
        title: 'Signature *',
        imagePath: imagePath.signature,
        imagePathActive: imagePath.signatureBlue,
        type: 'signature',
      },
      {
        id: 2,
        title: 'Photo *',
        imagePath: imagePath.photoInactive,
        imagePathActive: imagePath.photoBlue,
        type: 'photo',
      },
      {
        id: 3,
        title: 'Notes *',
        imagePath: imagePath.notes,
        imagePathActive: imagePath.notesBlue,
        type: 'notes',
      },
      {
        id: 4,
        title: 'QR/Bar Code *',
        imagePath: imagePath.codeInactive,
        imagePathActive: imagePath.codeActive,
        type: 'QR',
      },
    ],
    updatedProofArray: [],
    findDataToCheck: null,
  });

  const {
    findDataToCheck,
    updatedProofArray,
    taskProofArray,
    taskStatus,
    isLoading,
    region,
    coordinate,
    textComplete,
    pressAction,
    buttonWidth,
    buttonHeight,
    buttonPressComplete,
    buttonText,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
  // const userData = useSelector(state => state?.auth?.userData);

  useEffect(() => {
    if (userData?.task_proof) {
      console.log(userData?.task_proof, ' userData?.task_proof');
      const findDataToCheck = userData?.task_proof.find(
        x => x.id == taskDetail?.task_type_id,
      );
      updateState({
        findDataToCheck: findDataToCheck,
      });
      console.log(findDataToCheck, 'findDataToCheck');
      let newArray = cloneDeep(taskProofArray);
      console.log(newArray,"newArray>newArray");
      if (findDataToCheck) {
        updateState({
          updatedProofArray: newArray
            .map(i => {
              if (
                (i?.type == 'signature' && findDataToCheck?.signature) ||
                (i?.type == 'photo' && findDataToCheck?.image) ||
                (i?.type == 'notes' && findDataToCheck?.note) ||
                (i?.type == 'QR' && findDataToCheck?.barcode)
              ) {
                return i;
              }
            })
            .filter(x => x != null || x != undefined),
        });
      }
    }
  }, [taskDetail,userData]);

  useEffect(()=>{
    console.log(updatedProofArray,"updated updatedProofArray");
  },[updatedProofArray])

  useEffect(() => {
    getStatusName(taskStatus);
  }, [taskStatus]);
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
    ACTION_TIMER = 1500;
    Animated.timing(pressAction, {
      duration: ACTION_TIMER,
      toValue: 1,
      useNativeDriver: false,
    }).start(animationActionComplete);
  };
  const handlePressOut = () => {
    if (buttonPressComplete == 1) {
      Animated.timing(pressAction, {
        duration: _value * ACTION_TIMER,
        toValue: 0,
        useNativeDriver: false,
      }).stop();
    } else {
      Animated.timing(pressAction, {
        duration: _value * ACTION_TIMER,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };
  const animationActionComplete = () => {
    // alert('1234');
    var message = '';
    if (_value === 1) {
      updateState({buttonPressComplete: 1});
      message = 'You held it long enough to fire the action!';
    } else {
      updateState({buttonPressComplete: 0});
    }
  };

  const getButtonWidthLayout = e => {
    updateState({
      buttonWidth: e.nativeEvent.layout.width,
      buttonHeight: e.nativeEvent.layout.height,
    });
  };

  useEffect(() => {
    if (buttonPressComplete) {
      updateTaskStatus();
    }
  }, [buttonPressComplete]);

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

  const getUpdatedStatus = () => {
    switch (taskStatus) {
      case 1:
        return 2;
        break;
      case 2:
        return 3;
        break;
      case 3:
        return 4;
        break;
      default:
        break;
    }
  };

  const updateTaskStatus = () => {
    let data = {};
    data['task_status'] = getUpdatedStatus();
    data['task_id'] = taskDetail?.id;
    console.log(data, 'updateTaskStatus>>>DATA');

    updateState({isLoading: true});
    actions
      .updateTask(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'updateTaskStatus>res>res');
        updateState({isLoading: false});
        if (res?.data) {
          ACTION_TIMER = 100;
          updateState({
            buttonPressComplete: 0,
            taskStatus: Number(res?.data?.task_status),
          });
          // getStatusName(taskStatus)
          setTimeout(async () => {
            updateState({
              isLoading: false,
            });
          }, 2000);
        }
      })
      .catch(errorMethod);
  };

  useEffect(() => {
    handlePressOut();
  }, [buttonPressComplete]);

  const openMaps = () => {
    showActionSheet();
  };

  const getStatusName = taskStatus => {
    console.log(taskStatus, 'getStatusName');
    switch (taskStatus) {
      case 1:
        updateState({buttonText: 'Hold to start'});
        break;
      case 2:
        updateState({buttonText: 'Hold to arrive'});
        break;
      case 3:
        updateState({buttonText: 'Hold to complete'});
        break;
      case 4:
        updateState({buttonText: 'Hold to complete'});
        break;
      default:
        break;
    }
  };

  const redirectToDoneScreen = () => {
    console.log(taskDetail?.id, 'TaskDetail');
    updateState({isLoading: true});
    let data = {};
    data['task_id'] = taskDetail?.id;
    actions
      .sendOtpToDriver(data, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'sendOtpToDriver>res>res');
        if (res?.status == 200) {
          console.log(updatedProofArray, 'updatedProofArray');
          if (updatedProofArray.length) {
            updateState({isLoading: false});
            moveToNewScreen(navigationStrings.TASKCOMPLETEDOCUMENT, {
              taskDetail: taskDetail,
              updatedProofArray: updatedProofArray,
              findDataToCheck: findDataToCheck,
              otpEnabled: res?.data?.otpEnabled,
              otpRequired: res?.data?.otpRequired,
              otp: res?.data?.otp,
            })();
          } else {
            if (res?.data?.otpEnabled) {
              updateState({isLoading: false});
              moveToNewScreen(navigationStrings.TASKCOMPLETEDOCUMENT, {
                taskDetail: taskDetail,
                updatedProofArray: updatedProofArray,
                findDataToCheck: findDataToCheck,
                otpEnabled: res?.data?.otpEnabled,
                otpRequired: res?.data?.otpRequired,
                otp: res?.data?.otp,
              })();
            } else {
              let formdata = new FormData();
              formdata.append('task_status', 4);
              formdata.append('task_id', taskDetail?.id);
              completeTask(formdata);
            }
          }
        }
      })
      .catch(errorMethod);

    // moveToNewScreen(navigationStrings.TASKCOMPLETEDOCUMENT, {
    //   taskDetail: taskDetail,
    //   updatedProofArray: updatedProofArray,
    //   findDataToCheck: findDataToCheck,
    // })();
    // alert('213');
  };

  const completeTask = formdata => {
    updateState({isLoading: true});
    actions
      .updateTask(formdata, {
        client: clientInfo?.database_name,
        ContentType: 'multipart/form-data',
      })
      .then(res => {
        console.log(res, 'updateTaskStatus>res>res');
        updateState({isLoading: false});
        if (res?.data) {
          updateState({
            isLoading: false,
          });
          navigation.navigate(navigationStrings.DASHBOARD);
        }
      })
      .catch(errorMethod);
  };

  const buttonView = () => {
    if (fromHistory) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.button,
                {
                  backgroundColor:
                    taskDetail?.task_status == '4' ? '#27A468' : colors.redB,
                },
              ]}>
              <Text style={styles.text}>
                {taskDetail?.task_status == '4'
                  ? strings.TASKCOMPLTED
                  : strings.TASKCANCEL}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={taskStatus == 3 ? redirectToDoneScreen : handlePressIn}
          onPressOut={handlePressOut}>
          <View style={styles.button} onLayout={getButtonWidthLayout}>
            <Animated.View style={[styles.bgFill, getProgressStyles()]} />
            <Text style={styles.text}>{buttonText}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const getDate = date => {
    const local = moment.utc(date).local().format('DD MMM YYYY hh:mm:a');

    return local;
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

              <TouchableOpacity
                onPress={Platform?.OS == 'android' ? openGoogleMap : openMaps}
                style={{
                  flex: 0.2,
                  alignItems: 'center',
                }}>
                <Image source={imagePath?.path} />
              </TouchableOpacity>
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
                {getDate(taskDetail?.order?.order_time)}
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
        onPress: () =>
          moveToNewScreen(navigationStrings.TASKCANCEL, taskDetail)(),
      },
    ]);
  };

  //this function use for open actionsheet
  let actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  /*****Apple cordinate and call apple map */
  const appleCoordinate = {
    latitude: Number(taskDetail?.location?.latitude),
    longitude: Number(taskDetail?.location?.longitude),
  };
  const openAppleMap = createOpenLink(appleCoordinate);
  /**** */

  /*****Google cordinate and call apple map */
  const googleCoordinate = {
    latitude: Number(taskDetail?.location?.latitude),
    longitude: Number(taskDetail?.location?.longitude),
    provider: 'google',
    zoom: 10,
  };
  const openGoogleMap = createOpenLink(googleCoordinate);
  /**** */

  // this funtion use for camera handle
  const onPressMapChoice = index => {
    if (index == 0) {
      openAppleMap();
    }
    if (index == 1) {
      openGoogleMap();
    }
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
        customRight={() =>
          !!(taskStatus != '1' && !fromHistory) && (
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
          )
        }
      />
      <View style={{...commonStyles.headerTopLine}} />
      {mapView()}
      <View style={styles.mainContainer}>
        {taskDetailView()}
        {buttonView()}
      </View>
      <ActionSheet
        ref={actionSheet}
        // title={'Choose one option'}
        options={[
          strings.OPENINAPPLEMAPS,
          strings.OPENINGOOGLEMAPS,
          strings.CANCEL,
        ]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={index => onPressMapChoice(index)}
      />
    </WrapperContainer>
  );
}
