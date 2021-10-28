import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import ModalView from '../../Components/Modal';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings, {changeLaguage} from '../../constants/lang';
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
import stylesFunc from './styles';
import RNRestart from 'react-native-restart';

export default function Settings({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );
  console.log(
    defaultLanguagae,
    'defaultLanguagaedefaultLanguagaedefaultLanguagae',
  );

  const styles = stylesFunc({defaultLanguagae});
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
        value: 'es',
      },
      // {
      //   id: 3,
      //   label: 'Arabic',
      //   value: 'ar',
      // },
    ],
    selectedLangauge: defaultLanguagae?.label
      ? defaultLanguagae
      : {
          id: 1,
          label: 'English',
          value: 'en',
        },
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
  };

  const onModalVisiblity = () => {
    updateState({
      isModalVisibleForLanguage: true,
    });
  };

  const setFinalSelectedLanguage = type => {
    if (type === 'ok') {
      changeLaguage(selectedLangauge?.value);
      actions.setDefaultLanguage(selectedLangauge);
      RNRestart.Restart();
    }
    updateState({
      isModalVisibleForLanguage: false,
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
        <View style={styles.lineViewstyle} />

        <View style={{height: height / 1.8}}>
          {allLanguages.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => _selecLangauge(item)}>
                <View style={styles.languageListItemContainer}>
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

        <View style={styles.modealBottomContainer} />
        <View style={styles.modalBottomButtonContainer}>
          <TouchableOpacity onPress={() => setFinalSelectedLanguage('cancel')}>
            <Text style={styles.modalText}>{strings.CANCEL1}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFinalSelectedLanguage('ok')}>
            <Text style={styles.modalText}>{strings.OK}</Text>
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
      <TouchableOpacity onPress={() => onModalVisiblity()}>
        <View style={styles.languageContainer}>
          <Text style={styles.languageTitleTextStyle}>{strings.LANGUAGE}</Text>
          <TouchableOpacity onPress={() => onModalVisiblity()}>
            <View style={styles.selectedLanguageViewContainer}>
              <Text style={styles.selectedLanguageText}>
                {defaultLanguagae?.label
                  ? defaultLanguagae?.label
                  : selectedLangauge?.label}
              </Text>
              <Image
                style={styles.arrowIconStyle}
                source={imagePath.forwordArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
