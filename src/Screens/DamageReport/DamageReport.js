import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import Header from '../../Components/Header';
import strings from '../../constants/lang';
import {cameraHandler} from '../../utils/commonFunction';
import stylesFunc from './styles';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import ActionSheet from 'react-native-actionsheet';
import {showError} from '../../utils/helperFunctions';
import {cloneDeep} from 'lodash';
import ButtonComponent from '../../Components/ButtonComponent';

export default function DamageReport({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  let params = route?.params?.data;
  console.log(params, 'params>>>');
  const [state, setState] = useState({
    isLoading: false,
    imageArray: [],
    remove_image_ids: [],
    damageType: '',
    damageTypeArray: [{name: 'Broken Items'}],
    damageTitle: '',
    comments: '',
    showTypeDropdown: false,
    selectedDamageType: null,
  });

  const {
    isLoading,
    imageArray,
    remove_image_ids,
    damageType,
    damageTypeArray,
    damageTitle,
    comments,
    showTypeDropdown,
    selectedDamageType,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  const styles = stylesFunc({defaultLanguagae});

  //this function use for open actionsheet
  let actionSheet = useRef();
  const showActionSheet = () => {
    {
      imageArray.length == 5
        ? showError(strings.MAXIMUM_PHOTO_SELECTION_LIMIT_REACHED)
        : actionSheet.current.show();
    }
  };

  /***********Remove Image from rating */
  const _removeImageFromList = selectdImage => {
    if (selectdImage?.id) {
      let copyArrayImages = cloneDeep(imageArray);

      copyArrayImages = copyArrayImages.filter(x => x?.id !== selectdImage?.id);
      updateState({
        imageArray: copyArrayImages,
        remove_image_ids: [...remove_image_ids, selectdImage?.id],
      });
    } else {
      let copyArrayImages = cloneDeep(imageArray);
      copyArrayImages = copyArrayImages.filter(
        x => x?.image_id !== selectdImage?.image_id,
      );
      updateState({
        imageArray: copyArrayImages,
      });
    }
  };

  // this funtion use for camera handle
  const cameraHandle = index => {
    if (index == 0 || index == 1) {
      cameraHandler(index, {
        width: 300,
        height: 400,
        cropping: false,
        cropperCircleOverlay: false,
        compressImageQuality: 0.5,
        mediaType: 'photo',
      })
        .then(res => {
          if (res && (res?.sourceURL || res?.path)) {
            let file = {
              image_id: Math.random(),
              name: res?.filename,
              type: res?.mime,
              uri: res?.sourceURL || res?.path,
            };
            let find = imageArray.find(x => x?.name == res?.filename);
            if (find) {
              showError(strings.IMAGE_ALREADY_UPLOADED);
            } else {
              updateState({imageArray: [...imageArray, file]});
            }
          }
        })
        .catch(err => {});
    }
  };

  const _reportDamage = () => {
    // updateState({isLoading: true});

    if (!selectedDamageType) {
      showError(strings.PLEASESELECTDAMAGE);
      return;
    } else if (damageTitle == '') {
      showError(strings.PLEASEENTERDAMAGETITLE);
      return;
    } else if (comments == '') {
      showError(strings.ADDCOMMENT);
      return;
    } else if (imageArray && imageArray.length == 0) {
      showError(strings.ATLEASEONEIMAGE);
      return;
    } else {
      let formdata = new FormData();
      formdata.append('damage_type', selectedDamageType);
      formdata.append('damage_title', damageTitle);
      formdata.append('comment', comments);

      // formdata.append('vendor_id', ratingData.vendor_id);
      if (imageArray.length) {
        imageArray.forEach(element => {
          if (element?.id) {
          } else {
            formdata.append('images[]', {
              name: element.name,
              type: element.type,
              uri: element.uri,
            });
          }
        });
      }

      if (remove_image_ids.length) {
        remove_image_ids.forEach(element => {
          formdata.append('remove_files[]', element);
        });
      }

      console.log();
      // actions
      //   .giveRating(formdata, {
      //     code: appData?.profile?.code,
      //     currency: currencies?.primary_currency?.id,
      //     language: languages?.primary_language?.id,
      //     // 'Content-Type': 'multipart/form-data',
      //   })
      //   .then((res) => {
      //     updateState({isLoading: false});
      //     // navigation.navigate(navigationStrings.TAXIHOMESCREEN);
      //     navigation.goBack();
      //     showSuccess(res?.message);
      //   })
      //   .catch(errorMethod);
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
        centerTitle={strings.DAMAGEREPORT}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScaleVertical(20),
          marginVertical: moderateScaleVertical(20),
        }}>
        {/* Damage type */}
        <Text style={styles.uploadImage}>{strings.DAMAGETYPE}</Text>

        <View style={{zIndex: 5, marginBottom: 20}}>
          <TouchableOpacity
            style={styles.selectedContainerStyle}
            activeOpacity={0.7}
            onPress={() =>
              updateState({
                showTypeDropdown: !showTypeDropdown,
              })
            }>
            <Text
              style={{
                ...styles.labelTxt,
                marginBottom: 0,
              }}>
              {!!selectedDamageType ? selectedDamageType?.name : strings.SELECTTYPE}
            </Text>
            <Image source={imagePath.dropDownNew} />
          </TouchableOpacity>

          {showTypeDropdown && (
            <View
              style={styles.dropdownstyle}>
              <ScrollView>
                {damageTypeArray.length > 0 ? (
                  <View>
                    {damageTypeArray.map((itm, indx) => {
                      return (
                        <TouchableOpacity
                          key={indx}
                          onPress={() =>
                            updateState({
                              selectedDamageType: itm,
                              showTypeDropdown: false,
                            })
                          }
                          style={{
                            marginVertical: moderateScale(5),
                          }}>
                          <Text>{itm.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.noDataFound,
                      backgroundColor: colors.white,
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamily.medium,
                        fontSize: moderateScale(13),
                      }}>
                      {strings.NODATAFOUND}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Damage title */}
        <Text style={styles.uploadImage}>{strings.DAMAGETITLE}</Text>
        <TextInput
          multiline={true}
          placeholder={strings.ENTERTITLE}
          value={damageTitle}
          textAlignVertical={'top'}
          style={styles.textInputStyle2}
          onChangeText={text => updateState({damageTitle: text})}
        />
        {/* Comments */}
        <Text style={styles.uploadImage}>{strings.COMMENTS}</Text>
        <TextInput
          multiline={true}
          value={comments}
          placeholder={strings.ENTERCOMMENTS}
          textAlignVertical={'top'}
          style={styles.commentInput}
          onChangeText={text => updateState({comments: text})}
        />
        {/* Add Images section */}
        <Text style={styles.uploadImage}>{strings.ADDIMAGES}</Text>
        <View
          style={{
            marginTop: moderateScaleVertical(5),
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              marginRight: 5,
              marginBottom: moderateScaleVertical(10),
            }}>
            <TouchableOpacity
              onPress={showActionSheet}
              style={[styles.viewOverImage2, {borderStyle: 'dashed'}]}>
              <Image
                source={imagePath.icCamIcon}
                style={{tintColor: colors.themeColor}}
              />
            </TouchableOpacity>
          </View>

          {imageArray && imageArray.length
            ? imageArray.map((i, inx) => {
                return (
                  <ImageBackground
                    source={{
                      uri: i.uri,
                    }}
                    style={styles.imageOrderStyle}
                    imageStyle={styles.imageOrderStyle}>
                    <View style={styles.viewOverImage}>
                      <View
                        style={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                        }}>
                        <TouchableOpacity
                          onPress={() => _removeImageFromList(i)}>
                          <Image source={imagePath.ic_cross_red} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ImageBackground>
                );
              })
            : null}
        </View>
      </View>

      <ActionSheet
        ref={actionSheet}
        // title={'Choose one option'}
        options={[strings.CAMERA, strings.GALLERY, strings.CANCEL]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={index => cameraHandle(index)}
      />
      <ButtonComponent buttonTitle={strings.REPORT} onPress={_reportDamage} />
    </WrapperContainer>
  );
}
