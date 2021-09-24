import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScale} from '../../styles/responsiveSize';
import {showError} from '../../utils/helperFunctions';
import styles from './styles';

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
  });

  const {isLoading, taskProofArray} = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  //   useEffect(() => {
  //     const findDataToCheck = userData?.task_proof.find(
  //       x => (x.id == taskDetail?.task_type_id) == 1,
  //     );
  //     console.log(findDataToCheck, 'findDataToCheck');
  //     if(findDataToCheck){
  //         updateState({

  //         })
  //     }
  //   }, [taskDetail]);

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  const onImageLayout = e => {
    console.log(e.event, 'e.event');
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
        <Text style={styles.titleLabel}>{strings.ATTACHMENTS}</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {taskProofArray.map((i, inx) => {
            const {width, height} = Image.resolveAssetSource(i?.imagePath);

            return (
              <View
                style={{
                  marginRight: moderateScale(10),
                  marginBottom: moderateScale(5),
                }}>
                <Image
                  source={i?.imagePath}
                  onLayout={onImageLayout}
                  style={{
                    width: width - 25,
                    height: height - 25, //362 is actual height of image
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </WrapperContainer>
  );
}
