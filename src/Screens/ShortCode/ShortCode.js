import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {getBundleId} from 'react-native-device-info';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useSelector} from 'react-redux';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import ModalView from '../../Components/ShortCodeConfirmModal';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../styles/responsiveSize';
import {appIds, shortCodes} from '../../utils/constants/DynamicAppKeys';
import {showError} from '../../utils/helperFunctions';
import {requestUserPermission} from '../../utils/notificationServices';
import {getItem, getUserData} from '../../utils/utils';
import styles from './styles';

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

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const {defaultLanguage, internetConnection} = useSelector(
    state => state?.initBoot,
  );

  const {userData} = useSelector(state => state?.auth);

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
        case appIds.maxisdelivery:
          updateState({
            shortCode: shortCodes.maxisdelivery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.pinkJet:
          updateState({
            shortCode: shortCodes.pinkJet,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.botSeat:
          updateState({
            shortCode: shortCodes.botSeat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mokabFix:
          updateState({
            shortCode: shortCodes.mokabFix,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.spidbi:
          updateState({
            shortCode: shortCodes.spidbi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.wh:
          updateState({
            shortCode: shortCodes.wh,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.elcheregio:
          updateState({
            shortCode: shortCodes.elcheregio,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.hmc:
          updateState({
            shortCode: shortCodes.hmc,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.expressdeliverys:
          updateState({
            shortCode: shortCodes.expressdeliverys,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.fleety:
          updateState({
            shortCode: shortCodes.fleety,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.dishefs:
          updateState({
            shortCode: shortCodes.dishefs,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gumastas:
          updateState({
            shortCode: shortCodes.gumastas,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.govachow:
          updateState({
            shortCode: shortCodes.govachow,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.jetrider:
          updateState({
            shortCode: shortCodes.jetrider,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bilionza:
          updateState({
            shortCode: shortCodes.bilionza,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.baytukom:
          updateState({
            shortCode: shortCodes.baytukom,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gokab:
          updateState({
            shortCode: shortCodes.gokab,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bezalio:
          updateState({
            shortCode: shortCodes.bezalio,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.doleyPharmacy:
          updateState({
            shortCode: shortCodes.doleyPharmacy,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.taquick:
          updateState({
            shortCode: shortCodes.taquick,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sirvu:
          updateState({
            shortCode: shortCodes.sirvu,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.klickmat:
          updateState({
            shortCode: shortCodes.klickmat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.somame:
          updateState({
            shortCode: shortCodes.somame,
            isShortcodePrefilled: true,
          });
        case appIds.equamd:
          updateState({
            shortCode: shortCodes.equamd,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.drus:
          updateState({
            shortCode: shortCodes.drus,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.shariff:
          updateState({
            shortCode: shortCodes.shariff,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.youChillax:
          updateState({
            shortCode: shortCodes.youChillax,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.instaShop:
          updateState({
            shortCode: shortCodes.instaShop,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.helpNowRightNow:
          updateState({
            shortCode: shortCodes.helpNowRightNow,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.agriOnline:
          updateState({
            shortCode: shortCodes.agriOnline,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.clickeat:
          updateState({
            shortCode: shortCodes.clickeat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tranzet:
          updateState({
            shortCode: shortCodes.tranzet,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.grub:
          updateState({
            shortCode: shortCodes.grub,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.punnet:
          updateState({
            shortCode: shortCodes.punnet,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.suel:
          updateState({
            shortCode: shortCodes.suel,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.shooraFresh:
          updateState({
            shortCode: shortCodes.shooraFresh,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gusto:
          updateState({
            shortCode: shortCodes.gusto,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.click2Deliver:
          updateState({
            shortCode: shortCodes.click2Deliver,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.truckTireNow:
          updateState({
            shortCode: shortCodes.truckTireNow,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.voltaic:
          updateState({
            shortCode: shortCodes.voltaic,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.elixir:
          updateState({
            shortCode: shortCodes.elixir,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.zest:
          updateState({
            shortCode: shortCodes.zest,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ace:
          updateState({
            shortCode: shortCodes.ace,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.homeric:
          updateState({
            shortCode: shortCodes.homeric,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.share:
          updateState({
            shortCode: shortCodes.share,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yeboy:
          updateState({
            shortCode: shortCodes.yeboy,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.moboErrandsService:
          updateState({
            shortCode: shortCodes.moboErrandsService,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.Kel360:
          updateState({
            shortCode: shortCodes.Kel360,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.lastMinuteDress:
          updateState({
            shortCode: shortCodes.lastMinuteDress,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.travo:
          updateState({
            shortCode: shortCodes.travo,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.washvalley:
          updateState({
            shortCode: shortCodes.washvalley,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.cabWay:
          updateState({
            shortCode: shortCodes.cabWay,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tajammul:
          updateState({
            shortCode: shortCodes.tajammul,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.carroai:
          updateState({
            shortCode: shortCodes.carroai,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.vici:
          updateState({
            shortCode: shortCodes.vici,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.stonses:
          updateState({
            shortCode: shortCodes.stonses,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ssuum:
          updateState({
            shortCode: shortCodes.ssuum,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ezMobileFuel:
          updateState({
            shortCode: shortCodes.ezMobileFuel,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.blacNetwork:
          updateState({
            shortCode: shortCodes.blacNetwork,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.threadAgain:
          updateState({
            shortCode: shortCodes.threadAgain,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.trucxi:
          updateState({
            shortCode: shortCodes.trucxi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.swiftandValu:
          updateState({
            shortCode: shortCodes.swiftandValu,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.runaRound:
          updateState({
            shortCode: shortCodes.runaRound,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.laundryOrders:
          updateState({
            shortCode: shortCodes.laundryOrders,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.groupy:
          updateState({
            shortCode: shortCodes.groupy,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.docta_transportation:
          updateState({
            shortCode: shortCodes.docta_transportation,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.hairstonexpress:
          updateState({
            shortCode: shortCodes.hairstonexpress,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.paySic:
          updateState({
            shortCode: shortCodes.paySic,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.naDelivery:
          updateState({
            shortCode: shortCodes.naDelivery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.iNeed:
          updateState({
            shortCode: shortCodes.iNeed,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.chipeTaxi:
          updateState({
            shortCode: shortCodes.chipeTaxi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.boozieDoozie:
          updateState({
            shortCode: shortCodes.boozieDoozie,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yoho:
          updateState({
            shortCode: shortCodes.yoho,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.marasym:
          updateState({
            shortCode: shortCodes.marasym,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mobi:
          updateState({
            shortCode: shortCodes.mobi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.samakeeMart:
          updateState({
            shortCode: shortCodes.samakeeMart,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.silvestre:
          updateState({
            shortCode: shortCodes.silvestre,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.doorstep:
          updateState({
            shortCode: shortCodes.doorstep,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.enext:
          updateState({
            shortCode: shortCodes.enext,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.seaeats:
          updateState({
            shortCode: shortCodes.seaeats,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.foodNests:
          updateState({
            shortCode: shortCodes.foodNests,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tasmeem:
          updateState({
            shortCode: shortCodes.tasmeem,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.destination_ops:
          updateState({
            shortCode: shortCodes.destination_ops,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.cannabus_express:
          updateState({
            shortCode: shortCodes.cannabus_express,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.flying_horse:
          updateState({
            shortCode: shortCodes.flying_horse,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.weEat:
          updateState({
            shortCode: shortCodes.weEat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sambiga:
          updateState({
            shortCode: shortCodes.sambiga,
            isShortcodePrefilled: true,
          });
          break;
      }
    })();
  }, [internetConnection]);

  //Process init when code update
  useEffect(() => {
    if (shortCode && isShortcodePrefilled) {
      checkScreen();
    }
  }, [shortCode, isShortcodePrefilled, internetConnection]);

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
      console.log(defaultLanguage?.value, 'Language in init screen');
      let header = {};
      if (defaultLanguage?.id) {
        header = {
          language: defaultLanguage?.value,
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

  const _redirectToLogin = async shortCodeDataInfo => {
    updateState({isModalVisibleForShortCodeDetail: false});

    const userData = await getUserData();
    // moveToNewScreen(navigationStrings.LOGIN, shortCodeDataInfo)();
    console.log(userData, 'userDataInShortcode');
    userData && userData?.access_token
      ? navigation.push(navigationStrings.DRAWER_ROUTES)
      : moveToNewScreen(navigationStrings.LOGIN, shortCodeDataInfo)();
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
