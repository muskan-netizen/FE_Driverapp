import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import ModalView from '../../Components/Modal';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import {showSuccess} from '../../utils/helperFunctions';
import styles from './styles';

export default function Settings({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  console.log(
    defaultLanguagae,
    'defaultLanguagaedefaultLanguagaedefaultLanguagae',
  );
  const [state, setState] = useState({
    isLoading: false,
    allLanguages: [
      {
        id: 1,
        label: 'English',
        value: 'en',
      },
      {
        id: 2,
        label: 'Spanish',
        value: 'sp',
      },
      {
        id: 3,
        label: 'Arabic',
        value: 'ar',
      },
    ],
    selectedLangauge: defaultLanguagae,
    isModalVisibleForLanguage: false,
  });

  const {isLoading, allLanguages, selectedLangauge, isModalVisibleForLanguage} =
    state;
  const commonStyles = commonStylesFunc({fontFamily});

  const updateState = data => setState(state => ({...state, ...data}));

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const _selecLangauge = language => {
    updateState({
      selectedLangauge: language,
    });
    actions.setDefaultLanguage(language);
  };

  const onModalVisiblity = () => {
    updateState({
      isModalVisibleForLanguage: isModalVisibleForLanguage ? false : true,
    });
  };

  const modalMainContent = () => {
    return (
      <View
        style={{
          height: height / 1.5,
        }}>
        <Text
          style={[
            styles.languageTitleTextStyle,
            {marginHorizontal: moderateScale(20), fontSize: textScale(16)},
          ]}>
          {strings.LANGUAGE}
        </Text>
        <View
          style={{
            height: (0.5).toExponential,
            backgroundColor: colors.textGreyLight,
            marginTop: moderateScaleVertical(10),
          }}
        />

        <View style={{height: height / 1.8}}>
          {allLanguages.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => _selecLangauge(item)}>
                <View
                  style={{
                    marginVertical: moderateScaleVertical(20),
                    paddingHorizontal: moderateScale(20),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => _selecLangauge(item)}>
                    <Image
                      source={
                        selectedLangauge?.id == item?.id
                          ? imagePath.redioSelectedButton
                          : imagePath.redioUnSelectedButton
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => _selecLangauge(item)}>
                    <Text
                      style={{
                        marginHorizontal: moderateScale(20),
                        fontFamily: fontFamily.semiBold,
                        color: colors.textGrey,
                      }}>
                      {item?.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            height: 0.5,
            backgroundColor: colors.textGreyLight,
            marginTop: moderateScaleVertical(10),
            flexDirection: 'row',
          }}
        />
        <View
          style={{
            marginTop: moderateScaleVertical(16),
            width: width / 2,
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => onModalVisiblity()}>
            <Text
              style={{
                textAlign: 'right',
                marginHorizontal: moderateScale(30),
                color: colors.themeColor,
              }}>
              {strings.CANCEL1}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onModalVisiblity()}>
            <Text
              style={{
                textAlign: 'right',
                marginHorizontal: moderateScale(30),
                color: colors.themeColor,
              }}>
              {strings.OK}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoadingB={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={strings.SETTING}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View style={styles.spaceViewStyle}></View>
      <View style={styles.languageContainer}>
        <Text style={styles.languageTitleTextStyle}>{strings.LANGUAGE}</Text>
        <TouchableOpacity onPress={() => onModalVisiblity()}>
          <View style={styles.selectedLanguageViewContainer}>
            <Text style={styles.selectedLanguageText}>
              {defaultLanguagae?.label}
            </Text>
            <Image source={imagePath.forwordArrow} />
          </View>
        </TouchableOpacity>
      </View>
      <ModalView
        isVisible={isModalVisibleForLanguage}
        mainViewStyle={{
          maxHeight: height,
        }}
        modalMainContent={modalMainContent}
        // modalBottomContent={modalBottomContent}
      />
    </WrapperContainer>
  );
}
