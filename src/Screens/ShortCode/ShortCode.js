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
      console.log(saveShortCode, 'this is short code');
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
          break;
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
        case appIds.ufood:
          updateState({
            shortCode: shortCodes.ufood,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.servze:
          updateState({
            shortCode: shortCodes.servze,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.goMeat:
          updateState({
            shortCode: shortCodes.goMeat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.transportSystem:
          updateState({
            shortCode: shortCodes.transportSystem,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.shopCentral:
          updateState({
            shortCode: shortCodes.shopCentral,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sponge:
          updateState({
            shortCode: shortCodes.sponge,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.skidoo:
          updateState({
            shortCode: shortCodes.skidoo,
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
        case appIds.towFinder:
          updateState({
            shortCode: shortCodes.towFinder,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.aGBDeliveries:
          updateState({
            shortCode: shortCodes.aGBDeliveries,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.admCourier:
          updateState({
            shortCode: shortCodes.admCourier,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.kurbsideKings:
          updateState({
            shortCode: shortCodes.kurbsideKings,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.movingWheels:
          updateState({
            shortCode: shortCodes.movingWheels,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.empire:
          updateState({
            shortCode: shortCodes.empire,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.safewalks:
          updateState({
            shortCode: shortCodes.safewalks,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.dimaVega:
          updateState({
            shortCode: shortCodes.dimaVega,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.dummyDispatcher:
          updateState({
            shortCode: shortCodes.dummyDispatcher,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.skoop:
          updateState({
            shortCode: shortCodes.skoop,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.pickmeup:
          updateState({
            shortCode: shortCodes.pickmeup,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.kudhyo:
          updateState({
            shortCode: shortCodes.kudhyo,
            isShortcodePrefilled: true,
          });
          break;

        case appIds.bharatMove:
          updateState({
            shortCode: shortCodes.bharatMove,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mml:
          updateState({
            shortCode: shortCodes.mml,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sofia:
          updateState({
            shortCode: shortCodes.sofia,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bimol:
          updateState({
            shortCode: shortCodes.bimol,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tripTCI:
          updateState({
            shortCode: shortCodes.tripTCI,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.vendoor:
          updateState({
            shortCode: shortCodes.vendoor,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.pinkyDeli:
          updateState({
            shortCode: shortCodes.pinkyDeli,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.releezer:
          updateState({
            shortCode: shortCodes.releezer,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.vendorSpot:
          updateState({
            shortCode: shortCodes.vendorSpot,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.SXM2GO:
          updateState({
            shortCode: shortCodes.SXM2GO,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.farmerSouq:
          updateState({
            shortCode: shortCodes.farmerSouq,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yogo_lift:
          updateState({
            shortCode: shortCodes.yogo_lift,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mozmarcas:
          updateState({
            shortCode: shortCodes.mozmarcas,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.stichesonSite:
          updateState({
            shortCode: shortCodes.stichesonSite,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tmgShops:
          updateState({
            shortCode: shortCodes.tmgShops,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gasGiant:
          updateState({
            shortCode: shortCodes.gasGiant,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.zestyClickz:
          updateState({
            shortCode: shortCodes.zestyClickz,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.easyu:
          updateState({
            shortCode: shortCodes.easyu,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.citySuds:
          updateState({
            shortCode: shortCodes.citysuds,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.drivva:
          updateState({
            shortCode: shortCodes.drivva,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ritenow:
          updateState({
            shortCode: shortCodes.ritenow,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.myfiji:
          updateState({
            shortCode: shortCodes.myfiji,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.fastMikes:
          updateState({
            shortCode: shortCodes.fastMikes,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.hometowndeliveryllc:
          updateState({
            shortCode: shortCodes.hometowndeliveryllc,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.martinonwheels:
          updateState({
            shortCode: shortCodes.martinonwheels,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.flit:
          updateState({
            shortCode: shortCodes.flit,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.fides:
          updateState({
            shortCode: shortCodes.fides,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ullaz:
          updateState({
            shortCode: shortCodes.ullaz,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.privatepremiumpickups:
          updateState({
            shortCode: shortCodes.privatepremiumpickups,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ihelp:
          updateState({
            shortCode: shortCodes.ihelp,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bksTaxi:
          updateState({
            shortCode: shortCodes.bksTaxi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.oxo:
          updateState({
            shortCode: shortCodes.oxo,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.everywhere:
          updateState({
            shortCode: shortCodes.everywhere,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sijang:
          updateState({
            shortCode: shortCodes.sijang,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.fairexpay:
          updateState({
            shortCode: shortCodes.fairexpay,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.cannabis_Club_SF:
          updateState({
            shortCode: shortCodes.cannabis_Club_SF,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.keydiscovery:
          updateState({
            shortCode: shortCodes.keydiscovery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.palmettoplus:
          updateState({
            shortCode: shortCodes.palmettoplus,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.halaTalabat:
          updateState({
            shortCode: shortCodes.halaTalabat,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.alloTaxi:
          updateState({
            shortCode: shortCodes.alloTaxi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.jadorDrive:
          updateState({
            shortCode: shortCodes.jadorDrive,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.kongaFood:
          updateState({
            shortCode: shortCodes.kongaFood,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.theHouse:
          updateState({
            shortCode: shortCodes.theHouse,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.uberCann:
          updateState({
            shortCode: shortCodes.uberCann,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.launch:
          updateState({
            shortCode: shortCodes.launch,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.kampick:
          updateState({
            shortCode: shortCodes.kampick,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.IPicknDrop:
          updateState({
            shortCode: shortCodes.iPicknDrop,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bluebolt:
          updateState({
            shortCode: shortCodes.bluebolt,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.cabio:
          updateState({
            shortCode: shortCodes.cabio,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.tumbak:
          updateState({
            shortCode: shortCodes.tumbak,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.meateasy:
          updateState({
            shortCode: shortCodes.meateasy,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.boltDelivery:
          updateState({
            shortCode: shortCodes.boltDelivery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.onTheGo:
          updateState({
            shortCode: shortCodes.onTheGo,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mylaGlobal:
          updateState({
            shortCode: shortCodes.mylaGlobal,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gamaDelivery:
          updateState({
            shortCode: shortCodes.gamaDelivery,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ambuTap:
          updateState({
            shortCode: shortCodes.ambuTap,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.swiffyLLC:
          updateState({
            shortCode: shortCodes.swiffyLLC,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.sabroson:
          updateState({
            shortCode: shortCodes.sabroson,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.localdropoff:
          updateState({
            shortCode: shortCodes.localdropoff,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.hivefair:
          updateState({
            shortCode: shortCodes.hivefair,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.beakMe:
          updateState({
            shortCode: shortCodes.beakMe,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.onscart:
          updateState({
            shortCode: shortCodes.onscart,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.foodies:
          updateState({
            shortCode: shortCodes.foodies,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.go:
          updateState({
            shortCode: shortCodes.go,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.baubau:
          updateState({
            shortCode: shortCodes.baubau,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.bookaryde:
          updateState({
            shortCode: shortCodes.bookaryde,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mandaExpress:
          updateState({
            shortCode: shortCodes.mandaExpress,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yalary:
          updateState({
            shortCode: shortCodes.yalary,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.heyBuddy:
          updateState({
            shortCode: shortCodes.heyBuddy,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.petsChoice:
          updateState({
            shortCode: shortCodes.petsChoice,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.yoloSonic:
          updateState({
            shortCode: shortCodes.yoloSonic,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.mrHealth:
          updateState({
            shortCode: shortCodes.mrHealth,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.ubi:
          updateState({
            shortCode: shortCodes.ubi,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.lOPHT:
          updateState({
            shortCode: shortCodes.lOPHT,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.seratho:
          updateState({
            shortCode: shortCodes.seratho,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.xborne:
          updateState({
            shortCode: shortCodes.xborne,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.fawaz:
          updateState({
            shortCode: shortCodes.fawaz,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.gRN:
          updateState({
            shortCode: shortCodes.gRN,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.myRide:
          updateState({
            shortCode: shortCodes.myRide,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.delivadrinks:
          updateState({
            shortCode: shortCodes.delivadrinks,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.getfix:
          updateState({
            shortCode: shortCodes.getfix,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.scoopaTechnologies:
          updateState({
            shortCode: shortCodes.scoopaTechnologies,
            isShortcodePrefilled: true,
          });
          break;
        case appIds.helloDeliver:
          updateState({
            shortCode: shortCodes.helloDeliver,
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

      // let updatedShortCode = shortCode;
      let updatedShortCode = '1da2e9';
      actions
        .initApp({shortCode: updatedShortCode}, header)
        .then(res => {
          if (getBundleId() == appIds.royoorder && res?.data) {
            actions.saveShortCode(updatedShortCode);
          }
          actions.saveShortCode(updatedShortCode);

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
    console.log(error, 'short code error');
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
