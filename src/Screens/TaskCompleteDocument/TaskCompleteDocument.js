import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
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
import {moderateScale} from '../../styles/responsiveSize';
import {showError} from '../../utils/helperFunctions';
import {cameraHandler} from '../../utils/commonFunction';

import styles from './styles';
import { checkCameraPermission } from '../../utils/permissions';

const window = Dimensions.get('window');

export default function TaskCompleteDocument({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  let taskDetail = route?.params?.data;
  console.log(taskDetail, 'taskDetail');
  const [state, setState] = useState({
    isLoading: false,
    taskProofArray: [
      {
        id: 1,
        title: 'Signature *',
        imagePath: imagePath.signature,
        imagePathActive: imagePath.signatureBlue,
      },
      {
        id: 2,
        title: 'Photo *',
        imagePath: imagePath.photoInactive,
        imagePathActive: imagePath.photoBlue,
      },
      {
        id: 3,
        title: 'Notes *',
        imagePath: imagePath.notes,
        imagePathActive: imagePath.notesBlue,
      },
      {
        id: 4,
        title: 'QR/Bar Code *',
        imagePath: imagePath.codeInactive,
        imagePathActive: imagePath.codeActive,
      },
    ],
    updatedProofArray: [],
    showInputBox: false,
    note: '',
  });

  const {isLoading, taskProofArray, showInputBox, note} = state;
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

  const onImageLayout = e => {
    console.log(e.event, 'e.event');
  };

  const updateSignature = data => {
    console.log(data, 'saved signature result');
  };

  const updateBarcodeScan = data => {
    console.log(data, 'saved barcode result');
  };
  const onPressCategory = i => {
    console.log(i, 'documnet type');

    //Signature upload
    if (i?.id == 1) {
      updateState({showInputBox: false});
      moveToNewScreen(navigationStrings.ADDSIGNATURE, {
        updateSignature: data => {
          updateSignature(data);
        },
      })();
    }

    //Photo upload
    if (i?.id == 2) {
      updateState({showInputBox: false});
      cameraHandler(1, {
        cropping: false,
        compressImageQuality: 0.8,
        cropperCircleOverlay: false,
        mediaType: 'photo',
      })
        .then(res => {
          if (res?.data) {
            console.log(res, 'Photo repsonse');
            updateState({isLoading: false});
          } else {
            updateState({isLoading: false});
          }
        })
        .catch(err => {
          updateState({isLoading: false});
        });
    }

    //Add note
    if (i?.id == 3) {
      updateState({showInputBox: true});
    }

    if (i?.id == 4) {
      updateState({showInputBox: false});

      checkCameraPermission()
        .then(result => {
          console.log(result, 'result');
        })
        .catch(error => console.log('error while accessing location ', error));

      // moveToNewScreen(navigationStrings.SCANNER, {
      //   updateBarcodeScan: data => {
      //     updateBarcodeScan(data);
      //   },
      // })();
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
        customLeft={() => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={imagePath.backArrow} />
            <Text style={styles.textStyle}>{strings.TASK}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginTop: moderateScale(10),
        }}>
        <Text style={styles.attachment}>{strings.ATTACHMENTS}</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent: 'center',
            marginHorizontal: moderateScale(10),
          }}>
          {taskProofArray.map((i, inx) => {
            const {width, height} = Image.resolveAssetSource(i?.imagePath);

            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onPressCategory(i)}
                style={{
                  marginRight: moderateScale(10),
                  marginBottom: moderateScale(5),
                }}>
                <Image
                  source={i?.imagePath}
                  onLayout={onImageLayout}
                  style={{
                    width: width - 40,
                    height: height - 40, //362 is actual height of image
                  }}
                />
                <Text style={styles.titleStyle}>{i?.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {showInputBox && (
        <View>
          <Text style={styles.reason}>{strings.NOTE}</Text>
          <TextInput
            multiline={true}
            value={note}
            textAlignVertical={'top'}
            style={styles.textInputStyle}
            onChangeText={text => updateState({note: text})}
          />
        </View>
      )}

      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginTop: moderateScale(10),
        }}>
        <Text style={styles.attachment}>{strings.REQUIREDDATA}</Text>
      </View>
    </WrapperContainer>
  );
}
