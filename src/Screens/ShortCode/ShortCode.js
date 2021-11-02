import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings, {changeLaguage} from '../../constants/lang';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../styles/responsiveSize';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
import {showError} from '../../utils/helperFunctions';
import ModalView from '../../Components/ShortCodeConfirmModal';
import {useSelector} from 'react-redux';
import {appIds, shortCodes} from '../../utils/constants/DynamicAppKeys';
import {getBundleId} from 'react-native-device-info';
import {getItem} from '../../utils/utils';
import {requestUserPermission} from '../../utils/notificationServices';

export default function ShortCode({route, navigation}) {
  const shortCodeParam = route?.params?.shortCodeParam;

  const [state, setState] = useState({
    isLoading: false,
    shortCode: null,
    shortCodeShow: '',
    changeInShortCode: false,
    shortCodeDataInfo: null,
    isModalVisibleForShortCodeDetail: false,
    isShortcodePrefilled: true,
    viewWidth: null,
  });

  const {
    isLoading,
    shortCode,
    shortCodeShow,
    changeInShortCode,
    shortCodeDataInfo,
    isModalVisibleForShortCodeDetail,
    isShortcodePrefilled,
    viewWidth,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));
  const userData = useSelector(state => state?.auth?.userData);
  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  console.log(defaultLanguagae, 'defaultLanguagaedefaultLanguagae');

  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    (async () => {
      const saveShortCode = await getItem('saveShortCode');
      switch (getBundleId()) {
        case appIds.royoorder:
          // updateState({shortCode: '245bae', isShortcodePrefilled: true});
          if (saveShortCode && !shortCodeParam) {
            updateState({
              shortCode: saveShortCode,
              isShortcodePrefilled: true,
            });
          } else {
            updateState({shortCode: '', isShortcodePrefilled: false});
          }
          break;

        case appIds.runrun:
          updateState({
            shortCode: shortCodes.runrun,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.deliverstat:
          updateState({
            shortCode: shortCodes.deliverstat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.africanVillageMarket:
          updateState({
            shortCode: shortCodes.africanVillageMarket,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.africanize:
          updateState({
            shortCode: shortCodes.africanize,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tranzit:
          updateState({
            shortCode: shortCodes.tranzit,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.hemptify:
          updateState({
            shortCode: shortCodes.hemptify,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.goody:
          updateState({
            shortCode: shortCodes.goody,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yogofood:
          updateState({
            shortCode: shortCodes.yogofood,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.arenaGrub:
          updateState({
            shortCode: shortCodes.arenaGrub,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.blipDelivery:
          updateState({
            shortCode: shortCodes.blipDelivery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bottomsUp:
          updateState({
            shortCode: shortCodes.bottomsUp,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bustanFakieh:
          updateState({
            shortCode: shortCodes.bustanFakieh,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.codiner:
          updateState({
            shortCode: shortCodes.codiner,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.elog:
          updateState({
            shortCode: shortCodes.elog,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.cabdelivr:
          updateState({
            shortCode: shortCodes.cabdelivr,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.drivree:
          updateState({
            shortCode: shortCodes.drivree,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.seaChangeVending:
          updateState({
            shortCode: shortCodes.seaChangeVending,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.rxnow:
          updateState({
            shortCode: shortCodes.rxnow,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.checkout:
          updateState({
            shortCode: shortCodes.ordercheckout,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.noki:
          updateState({
            shortCode: shortCodes.noki,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ored:
          updateState({
            shortCode: shortCodes.ored,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yourLaundryApp:
          updateState({
            shortCode: shortCodes.yourLaundryApp,
          });
          break;
        case appIds.yummidash:
          updateState({
            shortCode: shortCodes.yummidash,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.zuzuclean:
          updateState({
            shortCode: shortCodes.zuzuclean,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.loopWhole:
          updateState({
            shortCode: shortCodes.loopWhole,
            isShortcodePrefilled: true,
          });
          break;
            
          case appIds.maxis:
          updateState({
            shortCode: shortCodes.maxis,
            isShortcodePrefilled: true,
          });
          break;
          case appIds.donepacked:
          updateState({
            shortCode: shortCodes.donepacked,
            isShortcodePrefilled: true,
          });
          break;
          case appIds.careWorks:
          updateState({
            shortCode: shortCodes.careWorks,
            isShortcodePrefilled: true,
          });
          break;
          case appIds.thubaeRides:
          updateState({
            shortCode: shortCodes.thubaeRides,
            isShortcodePrefilled: true,
          });
          break;
          case appIds.menus:
            updateState({
              shortCode: shortCodes.menus,
              isShortcodePrefilled: true,
            });
            break;
      }
    })();
  }, []);

  //Process init when code update
  useEffect(() => {
    if (shortCode && isShortcodePrefilled) {
      checkScreen();
    }
  }, [shortCode, isShortcodePrefilled]);

  const checkScreen = () => {
    initApiHit();
  };

  //Opt input function
  const onOtpInput = code => {
    (async () => {
      updateState({
        isLoading: true,
        shortCode: code,
        changeInShortCode: true,
        // isShortcodePrefilled: true,
      });
      //
    })();
  };

  useEffect(() => {
    (async () => {
      if (changeInShortCode) {
        initApiHit();
      }
    })();
  }, [changeInShortCode]);

  //On click login button
  const _onSubmitShortCode = () => {
    // moveToNewScreen(navigationStrings.LOGIN, {})();
    updateState({isLoading: true});
    initApiHit();
  };

  //short code And init api hit
  const initApiHit = () => {
    (async () => {
      const saveShortCode = await getItem('saveShortCode');
      console.log(defaultLanguagae?.value, 'Language in init screen');
      let header = {};
      if (defaultLanguagae?.id) {
        header = {
          language: defaultLanguagae?.value,
        };
      } else {
        header = {
          language: 'en',
        };
      }

      actions
        .initApp({shortCode: shortCode}, header)
        .then(res => {
          if (getBundleId() == appIds.royoorder && res?.data) {
            actions.saveShortCode(shortCode);
          }
          actions.saveShortCode(shortCode);
          console.log(res, 'res>res>res');
          updateState({
            changeInShortCode: false,
            isLoading: false,
            shortCodeDataInfo: res?.data,
          });

          if (getBundleId() == appIds.royoorder) {
            if (saveShortCode && !shortCodeParam) {
              _redirectToLogin(res?.data);
            } else {
              updateState({
                isModalVisibleForShortCodeDetail: true,
              });
            }
          } else {
            _redirectToLogin(res?.data);
          }
        })
        .catch(errorMethod);
    })();
  };

  //Error handling in screen
  const errorMethod = error => {
    console.log(error, 'error');
    updateState({
      isLoading: false,
      shortCode: '',
      shortCodeShow: '',
      changeInShortCode: false,
      isLoadingB: false,
      isRefreshing: false,
    });
    showError(error?.message || error?.error);
  };

  //Rediect to login

  const _redirectToLogin = shortCodeDataInfo => {
    updateState({isModalVisibleForShortCodeDetail: false});

    // moveToNewScreen(navigationStrings.LOGIN, shortCodeDataInfo)();
    {
      userData && userData?.access_token
        ? navigation.push(navigationStrings.DRAWER_ROUTES)
        : moveToNewScreen(navigationStrings.LOGIN, shortCodeDataInfo)();
    }
  };

  //Modal main component
  const modalMainContent = () => {
    return (
      <View
        onLayout={event => {
          updateState({viewWidth: event.nativeEvent.layout.width});
        }}>
        <View style={styles.imageView}>
          <Image
            source={{uri: shortCodeDataInfo?.logo}}
            style={{height: 100, width: 100, borderRadius: 100 / 2}}
            resizeMode={'contain'}
          />
        </View>
        <View
          style={{
            marginTop: moderateScale(75),
            marginHorizontal: moderateScale(10),
          }}>
          <Text style={styles.company_address}>
            <Text>{`${shortCodeDataInfo?.company_name} ,`}</Text>
            {shortCodeDataInfo?.company_address}
          </Text>
          <Text style={styles.name}>{shortCodeDataInfo?.name}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() =>
              updateState({isModalVisibleForShortCodeDetail: false})
            }
            style={[
              styles.cancelButtonView,
              {width: viewWidth ? viewWidth / 2 : width - (width / 1.5 - 20)},
            ]}>
            <Text style={styles.cancel}>{strings.CANCEL}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => _redirectToLogin(shortCodeDataInfo)}
            style={[
              styles.confirmButtonView,
              {width: viewWidth ? viewWidth / 2 : width - (width / 1.5 - 20)},
            ]}>
            <Text style={styles.confirm}>{strings.CONFIRM}</Text>
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
      {isShortcodePrefilled ? (
        <View style={{flex: 1}}></View>
      ) : (
        <>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={imagePath.logo} />
            </View>
            <View style={{flex: 0.6, marginHorizontal: moderateScale(20)}}>
              <Text style={styles.loginUsing}>{strings.LOGINUSING}</Text>
              <Text style={styles.loginUsing}>{strings.COMPANYCODE}</Text>
              <Text style={styles.weneedCompany}>
                {strings.WENEDDCOMPNAYCODE}
              </Text>
              <View style={{marginTop: moderateScale(20)}}>
                <SmoothPinCodeInput
                  containerStyle={{alignSelf: 'center'}}
                  password
                  mask={<View style={styles.maskStyle} />}
                  cellSize={width / 8}
                  codeLength={6}
                  cellSpacing={10}
                  editable={true}
                  cellStyle={styles.cellStyle}
                  cellStyleFocused={styles.cellStyleFocused}
                  textStyle={styles.textStyleCodeInput}
                  textStyleFocused={styles.textStyleFocused}
                  inputProps={{
                    autoCapitalize: 'none',
                  }}
                  value={shortCodeShow}
                  autoFocus={false}
                  keyboardType={'default'}
                  onTextChange={shortCodeShow => updateState({shortCodeShow})}
                  onFulfill={code => onOtpInput(code)}
                />
              </View>
              <View
                style={{
                  marginTop: moderateScaleVertical(20),
                  justifyContent: 'flex-end',
                }}>
                <ButtonWithLoader
                  color={colors.black}
                  btnStyle={styles.buttonStyle}
                  btnTextStyle={{color: colors.textBlue}}
                  onPress={_onSubmitShortCode}
                  btnText={strings.LOGIN}
                  btnTextStyle={{
                    color: colors.white,
                  }}
                />

                {/* <Text style={styles.whereCanIhelp}>
                  {strings.WHEREICANSIGNUP}
                </Text> */}
              </View>
            </View>
          </View>

          <ModalView
            data={shortCodeDataInfo}
            isVisible={isModalVisibleForShortCodeDetail}
            onClose={() =>
              updateState({isModalVisibleForShortCodeDetail: false})
            }
            mainViewStyle={{
              // minHeight: height / 3,
              maxHeight: height,
              marginHorizontal: moderateScale(20),
            }}
            modalMainContent={modalMainContent}
            // modalBottomContent={modalBottomContent}
          />
        </>
      )}
    </WrapperContainer>
  );
}
