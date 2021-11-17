import {Platform} from 'react-native';
import {getBundleId} from 'react-native-device-info';

const shortCodes = {
  runrun: 'cbec70',
  royoorder: '8e3eef',
  deliverstat: 'e6b31c',
  africanVillageMarket: '6c786d',
  africanize: 'a98da0',
  tranzit: 'f84785',
  hemptify: '33eba1',
  goody: 'da11cf',
  yogofood: '883082',
  arenaGrub: 'b2c1f8',
  blipDelivery: 'f336de',
  bottomsUp: '0678b2',
  bustanFakieh: 'c2373f',
  codiner: '0d257f',
  elog: 'fffa75',
  cabdelivr: 'd8e244',
  drivree: 'ae5cfa',
  seaChangeVending: '9fa45f',
  rxnow: 'c24fb0',
  ordercheckout: 'f775f5',
  noki: 'e0f607',
  ored: '86b79c',
  yourLaundryApp: 'ba202e',
  yummidash: '31a72f',
  zuzuclean: 'a4ead8',
  loopWhole: '5aca0c',
  maxis: '07b461',
  donepacked: 'b3b91d',
  careWorks: '3554f0',
  thubaeRides: 'af635b',
  menus: '4d1ec2',
  maxisdelivery: '07b461',
  pinkJet: 'f139cb',
  botSeat: 'd2e9b6',
  mokabFix: 'e5a878',
  spidbi: '954b3d',
  wh: '8e0c3d',
  elcheregio: '956701',
  hmc: '1a3d96',
  expressdeliverys: '3911a0',
  fleety: '7c9566',
  gumastas: '28efb0',
  dishefs: '44c2bf',
  govachow: 'd8ac18',
  jetrider: '387dd4',
  bilionza: 'd97efd',
  baytukom: '7df249',
  gokab: '362d14',
  bezalio: '2c0bf4',
  doleyPharmacy: '72d02d',
  taquick: '7c335c',
  sirvu: 'b4ca5b',
  klickmat: '2b7166',
  somame: '843986',
  equamd: 'dd39d8',
  drus: '63ef33',
  shariff: '010494',
  youChillax: 'd42ce5',
  instaShop: '0cab0a',
  helpNowRightNow: '0e7801',
  agriOnline: '3ae391',
  clickeat: '5a90a2',
  tranzet: 'b35edf',
  grub: 'b68843',
  punnet: '87444d',
  suel: 'b11cb2',
  shooraFresh: '1fac68',
  gusto: '057ff8',
  click2Deliver: '208939',
  truckTireNow: '4be0a5',
  voltaic: '0ff16f',
  elixir: 'cca668',
  ace: '3c58a1',
  zest: 'ddceeb',
  homeric: '66951f',
  share: 'eb1244',
  yeboy: '604a5f',
  moboErrandsService: 'cb01c8',
  Kel360: 'c54206',
  travo: 'c92b12',
  lastMinuteDress: '46e73a',
  washvalley: '45f62f',
  tajammul: 'b74129',
  cabWay: 'edbdc8',
  carroai: 'bfcc32',
};

// Goody Dispatch
const appIds = {
  royoorder: Platform.select({
    ios: 'com.CodeBrew.Royo.Driver',
    android: 'com.codebew.royodispatcher',
  }),
  runrun: Platform.select({
    ios: 'com.RunrunOne.Dispatch',
    android: 'com.Runrun.royodispatcher',
  }),
  deliverstat: Platform.select({
    ios: 'com.Deliverstat.Dispatch',
    android: 'com.Deliverstat.royodispatcher',
  }),
  africanVillageMarket: Platform.select({
    ios: 'com.AfricanVillageMarket.Dispatch',
    android: 'com.AfricanVillageMarket.royodispatcher',
  }),
  africanize: Platform.select({
    ios: 'com.Africanize.Dispatch',
    android: 'com.africanize.royodispatcher',
  }),
  tranzit: Platform.select({
    ios: 'com.Tranzit.Dispatch',
    android: 'com.tranzit.royodispatcher',
  }),
  hemptify: Platform.select({
    ios: 'com.HemptyFy.Dispatch',
    android: 'com.HemptiFy.royodispatcher',
  }),
  goody: Platform.select({
    ios: 'com.Goody.Dispatch',
    android: 'com.Goody.royodispatcher',
  }),
  yogofood: Platform.select({
    ios: 'com.YogoFood.Dispatch',
    android: 'com.yogofood.royodispatcher',
  }),
  arenaGrub: Platform.select({
    ios: 'com.ArenaGrub.Dispatch',
    android: 'com.arenagrub.royodispatcher',
  }),
  blipDelivery: Platform.select({
    ios: 'com.BlipDelivery.Dispatch',
    android: 'com.BlipDelivery.royodispatcher',
  }),
  bottomsUp: Platform.select({
    ios: 'com.BottomsUp.Dispatch',
    android: 'com.BottomsUp.royodispatcher',
  }),
  bustanFakieh: Platform.select({
    ios: 'com.BustanFakieh.Dispatch',
    android: 'com.BustanFakieh.royodispatcher',
  }),
  codiner: Platform.select({
    ios: 'com.app.Codiner.Dispatch',
    android: 'com.app.Codiner.Dispatch',
  }),
  elog: Platform.select({
    ios: 'com.Elog.Dispatch',
    android: 'com.Elog.royodispatcher',
  }),
  cabdelivr: Platform.select({
    ios: 'com.Cabdelivr.Dispatch',
    android: 'com.cabdelivr.royodispatcher',
  }),
  drivree: Platform.select({
    ios: 'com.drivree.Dispatch',
    android: 'com.drivree.royodispatcher',
  }),
  seaChangeVending: Platform.select({
    ios: 'com.seaChangeVending.royodispatcher',
    android: 'com.seaChangeVending.royodispatcher',
  }),
  rxnow: Platform.select({
    ios: 'com.rxnow.royodispatcher',
    android: 'com.rxnow.royodispatcher',
  }),
  checkout: Platform.select({
    ios: 'com.checkout.royodispatcher',
    android: 'com.checkout.royodispatcher',
  }),
  noki: Platform.select({
    ios: 'com.noki.royodispatcher',
    android: 'com.noki.royodispatcher',
  }),
  ored: Platform.select({
    ios: 'com.ored.royodispatcher',
    android: 'com.ored.royodispatcher',
  }),
  yourLaundryApp: Platform.select({
    ios: 'com.YourLaundryApp.Dispatch',
    android: 'com.YourLaundryApp.royodispatcher',
  }),

  yummidash: Platform.select({
    ios: 'com.app.yummiidash.Dispatch',
    android: 'com.app.yummiidash.Dispatch',
  }),
  zuzuclean: Platform.select({
    ios: 'com.ZuzuClean.Dispatch',
    android: 'com.zuzuclean.royodispatcher',
  }),
  loopWhole: Platform.select({
    ios: 'com.LoopWhole.Dispatch',
    android: 'com.loopwhole.royodispatcher',
  }),

  maxis: Platform.select({
    ios: 'com.maxis.royodispatcher',
    android: 'com.maxis.royodispatcher',
  }),
  donepacked: Platform.select({
    ios: 'com.donepacked.royodispatcher',
    android: 'com.donepacked.royodispatcher',
  }),
  careWorks: Platform.select({
    ios: 'com.CareWorks.Dispatch',
    android: 'com.CareWorks.royodispatcher',
  }),
  thubaeRides: Platform.select({
    ios: 'com.ThubaeRides.Dispatch',
    android: 'com.ThubaeRides.royodispatcher',
  }),
  menus: Platform.select({
    ios: 'com.Menus.Dispatch',
    android: 'com.Menus.royodispatcher',
  }),
  maxisdelivery: Platform.select({
    ios: 'com.Maxisdelivery.Dispatch',
    android: 'com.Maxisdelivery.royodispatcher',
  }),
  pinkJet: Platform.select({
    ios: 'com.PinkJet.Dispatch',
    android: 'com.PinkJet.royodispatcher',
  }),
  botSeat: Platform.select({
    ios: 'com.BotSeat.Dispatch',
    android: 'com.BotSeat.royodispatcher',
  }),
  mokabFix: Platform.select({
    ios: 'com.MokabFix.Dispatch',
    android: 'com.MokabFix.royodispatcher',
  }),
  spidbi: Platform.select({
    ios: 'com.Spidbi.Dispatch',
    android: 'com.spidbi.royodispatcher',
  }),
  wh: Platform.select({
    ios: 'com.wh.dispatcher',
    android: 'com.wh.dispatcher',
  }),
  elcheregio: Platform.select({
    ios: 'com.ElCheRegio.Dispatch',
    android: 'com.ElCheRegio.Dispatch',
  }),
  hmc: Platform.select({
    ios: 'com.HMC.Dispatch',
    android: 'com.HMC.royodispatcher',
  }),
  expressdeliverys: Platform.select({
    ios: 'com.ExpressDeliverysLLC.Dispatch',
    android: 'com.ExpressDeliverysLLC.royodispatcher',
  }),
  fleety: Platform.select({
    ios: 'com.Fleety.Dispatch',
    android: 'com.fleety.royodispatcher',
  }),
  gumastas: Platform.select({
    ios: 'com.Gumastas.Dispatch',
    android: 'com.Gumastas.royodispatcher',
  }),
  dishefs: Platform.select({
    ios: 'com.Dishefs.Dispatch',
    android: 'com.Dishefs.royodispatcher',
  }),
  govachow: Platform.select({
    ios: 'com.application.Govachow.Dispatcher',
    android: 'com.app.govachow.Dispatcher',
  }),
  jetrider: Platform.select({
    ios: 'com.JetRider.Dispatch',
    android: 'com.JetRider.royodispatcher',
  }),
  bilionza: Platform.select({
    ios: 'com.Bilionza.Dispatch',
    android: 'com.Bilionza.royodispatcher',
  }),
  baytukom: Platform.select({
    ios: 'com.Baytukom.Dispatch',
    android: 'com.Baytukom.royodispatcher',
  }),
  gokab: Platform.select({
    ios: 'com.GoKab.Dispatch',
    android: 'com.Gokab.royodispatcher',
  }),
  bezalio: Platform.select({
    ios: 'com.Bezalio.Dispatch',
    android: 'com.Bezalio.royodispatcher',
  }),
  doleyPharmacy: Platform.select({
    ios: 'com.DoleyPharmacy.Dispatch',
    android: 'com.DoleyPharmacy.royodispatcher',
  }),
  taquick: Platform.select({
    ios: 'com.TaQuick.Dispatch',
    android: 'com.TaQuick.royodispatcher',
  }),
  sirvu: Platform.select({
    ios: 'com.SirVU.Dispatch',
    android: 'com.sirvu.royodispatcher',
  }),
  klickmat: Platform.select({
    ios: 'com.Klickmat.Dispatch',
    android: 'com.klickmat.royodispatcher',
  }),
  somame: Platform.select({
    ios: 'com.Somame.Dispatch',
    android: 'com.Somame.royodispatcher',
  }),
  equamd: Platform.select({
    ios: 'com.EquaMD.Dispatch',
    android: 'com.equamd.royodispatcher',
  }),
  drus: Platform.select({
    ios: 'com.Drus.Dispatch',
    android: 'com.drus.royodispatcher',
  }),
  shariff: Platform.select({
    ios: 'com.Shariff.Dispatch',
    android: 'com.shariff.royodispatcher',
  }),
  youChillax: Platform.select({
    ios: 'com.YouChillax.Dispatch',
    android: 'com.YouChillax.royodispatcher',
  }),
  instaShop: Platform.select({
    ios: 'com.InstaShop.Dispatch',
    android: 'com.InstaShop.royodispatcher',
  }),
  helpNowRightNow: Platform.select({
    ios: 'com.HelpNowRightNow.Dispatch',
    android: 'com.helpnowrightnow.royodispatcher',
  }),
  agriOnline: Platform.select({
    ios: 'com.AgriOnline.Dispatch',
    android: 'com.AgriOnline.royodispatcher',
  }),
  clickeat: Platform.select({
    ios: 'com.ClickEat.Dispatch',
    android: 'com.clickEat.royodispatcher',
  }),
  tranzet: Platform.select({
    ios: 'com.Tranznet.Dispatch',
    android: 'com.TranzNet.royodispatcher',
  }),
  grub: Platform.select({
    ios: 'com.Grub.Dispatch',
    android: 'com.Grub.royodispatcher',
  }),
  punnet: Platform.select({
    ios: 'com.Punnet.Dispatch',
    android: 'com.Punnet.royodispatcher',
  }),
  suel: Platform.select({
    ios: 'com.Suel.Dispatch',
    android: 'com.Suel.royodispatcher',
  }),
  shooraFresh: Platform.select({
    ios: 'com.ShooraFresh.Dispatch',
    android: 'com.ShooraFresh.royodispatcher',
  }),
  gusto: Platform.select({
    ios: 'com.Gusto.Dispatch',
    android: 'com.Gusto.royodispatcher',
  }),
  click2Deliver: Platform.select({
    ios: 'com.Click2Deliver.Dispatch',
    android: 'com.Click2Deliver.royodispatcher',
  }),
  truckTireNow: Platform.select({
    ios: 'com.TruckTireNow.Dispatch',
    android: 'com.TruckTireNow.royodispatcher',
  }),
  voltaic: Platform.select({
    ios: 'com.Voltaic.Dispatch',
    android: 'com.Voltaic.royodispatcher',
  }),
  elixir: Platform.select({
    ios: 'com.Elixir.Dispatch',
    android: 'com.Elixir.royodispatcher',
  }),
  zest: Platform.select({
    ios: 'com.Zest.Dispatch',
    android: 'com.Zest.royodispatcher',
  }),
  ace: Platform.select({
    ios: 'com.Ace.Dispatch',
    android: 'com.Ace.royodispatcher',
  }),
  homeric: Platform.select({
    ios: 'com.Homeric.Dispatch',
    android: 'com.Homeric.royodispatcher',
  }),
  share: Platform.select({
    ios: 'com.Share.Dispatch',
    android: 'com.Share.royodispatcher',
  }),
  yeboy: Platform.select({
    ios: 'com.Yeboy.Dispatch',
    android: 'com.Yeboy.royodispatcher',
  }),
  moboErrandsService: Platform.select({
    ios: 'com.MoboErrandsService.Dispatch',
    android: 'com.MoboErrandsService.royodispatcher',
  }),
  Kel360: Platform.select({
    ios: 'com.360Kel.Dispatch',
    android: 'com.Kel360.royodispatcher',
  }),
  travo: Platform.select({
    ios: 'com.Travo.Dispatch',
    android: 'com.travo.royodispatcher',
  }),
  lastMinuteDress: Platform.select({
    ios: 'com.LastMinuteDress.Dispatch',
    android: 'com.LastMinuteDress.royodispatcher',
  }),
  washvalley: Platform.select({
    ios: 'com.WashValley.Dispatch',
    android: 'com.washvalley.royodispatcher',
  }),
  tajammul: Platform.select({
    ios: 'com.Tajammul.Dispatch',
    android: 'com.Tajammul.royodispatcher',
  }),
  cabWay: Platform.select({
    ios: 'com.CabWay.Dispatch',
    android: 'com.CabWay.royodispatcher',
  }),
  carroai: Platform.select({
    ios: 'com.Carroai.Dispatch',
    android: 'com.Carroai.royodispatcher',
  }),
};

export {appIds, shortCodes};
