import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

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
  clickeat: '954012',
  tranzet: 'b35edf',
  grub: 'b68843',
  punnet: '87444d',
  suel: 'b11cb2',
  shooraFresh: '845409',
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
  vici: '52c9f9',
  stonses: '46eceb',
  threadAgain: 'ef05d2',
  blacNetwork: '9d76c0',
  ezMobileFuel: '12cb37',
  ssuum: 'd7adc3',
  swiftandValu: 'f2a167',
  runaRound: '874658',
  trucxi: '08b9ed',
  laundryOrders: '048e86',
  groupy: 'c3ea28',
  docta_transportation: '93b726',
  hairstonexpress: '38b573',
  iNeed: '7131a5',
  naDelivery: '90f78b',
  chipeTaxi: 'e99b4e',
  paySic: '7ed055',
  boozieDoozie: '5d0546',
  yoho: '577357',
  marasym: '16e939',
  mobi: 'f6748f',
  samakeeMart: '083fdc',
  silvestre: '269336',
  doorstep: '906083',
  seaeats: '8f52c7',
  enext: '3958ed',
  foodNests: '1f418c',
  tasmeem: '0c22e1',
  destination_ops: '7fd599',
  cannabus_express: 'df5932',
  flying_horse: '6a7802',
  ufood: 'c6847c',
  servze: 'b47f07',
  goMeat: 'afc6b9',
  transportSystem: 'cabccb',
  shopCentral: '3b9fc7',
  sponge: '4aa2aa',
  skidoo: '84c2b5',
  weEat: '46d1b3',
  sambiga: 'ce6b16',
  towFinder: '9ef64c',
  aGBDeliveries: 'd82244',
  admCourier: '06cef0',
  kurbsideKings: '4d0e2d',
  movingWheels: '4d7b01',
  safewalks: '115676',
  empire: '19a7a3',
  dimaVega: 'dbf5ee',
  dummyDispatcher: '2f0c03',
  skoop: 'd12ef6',
  pickmeup: '5be38e',
  kudhyo: 'b9dd3e',
  bharatMove: '7b5803',
  sofia: '26be15',
  mml: 'ebd37d',
  bimol: 'b9fe53',
  tripTCI: '5a79f3',
  vendoor: 'e96e85',
  pinkyDeli: 'dd8c06',
  releezer: 'eada87',
  vendorSpot: '2ac63f',
  SXM2GO: 'f91ebf',
  farmerSouq: '351a84',
  yogo_lift: '656c4a',
  mozmarcas: '875d07',
  stichesonSite: 'f2c554',
  tmgShops: '25ecdb',
  gasGiant: '0b57d0',
  zestyClickz: '99e1ad',
  citysuds: 'c8e593',
  drivva: '9fcc7d',
  easyu: '23f79d',
  myfiji: '35d41a',
  ritenow: '521391',
  fastMikes: '5f0e8f',
  hometowndeliveryllc: '80bac3',
  flit: '49b70d',
  fides: '0140e2',
  ullaz: 'b32455',
  privatepremiumpickups: '0016ae',
  ihelp: 'a68890',
  bksTaxi: 'a06880',
  oxo: 'ff27f5',
  everywhere: 'ccdace',
  sijang: 'cd1429',
  fairexpay: '297dc8',
  cannabis_Club_SF: 'ad36b5',
  martinonwheels: 'db23d9',
  keydiscovery: 'fd305f',
  palmettoplus: '557bc4',
  halaTalabat: '55ffea',
  alloTaxi: '8b056f',
  jadorDrive: '1871c3',
  kongaFood: '012d11',
  theHouse: '7764e4',
  uberCann: 'dd07b1',
  launch: '258511',
  kampick: '260a5c',
  iPicknDrop: '7b1b44',
  bluebolt: 'faa76b',
  cabio: '9fcc02',
  tumbak: '6a3ba4',
  meateasy: '379f98',
  boltDelivery: '495304',
  onTheGo: '9331db',
  mylaGlobal: '3eedfb',
  gamaDelivery: '0b6870',
  ambuTap: 'c4481d',
  swiffyLLC: 'a5c8d0',
  sabroson: '6be6c3',
  localdropoff: '8b39d1',
  hivefair: 'd826e4',
  beakMe: '2a9c69',
  onscart: 'e22c51',
  foodies: 'c420d1',
  go: 'da3f7b',
  baubau: '616729',
  bookaryde: 'dba7d7',
  mandaExpress: '8f5c56',
  yalary: '03b030',
  heyBuddy: 'edc237',
  petsChoice: '50dc5a',
  yoloSonic: '67d210',
  mrHealth: 'b465ce',
  ubi: '085703',
  lOPHT: '9fadbd',
  seratho: '908fb7',
  xborne: '893da3',
  fawaz: 'b3e0fe',
  gRN: '138973',
  myRide: 'e22883',
  delivadrinks: '5d5894',
  getfix: 'c81748',
  scoopaTechnologies: '39e238',
  slider: '312003',
  iCare: '4b73a9',
  qrider: '56375f',
  dlvrd: '039f9d',
  delivery: 'f6be38',
  timHomeServices: 'c4ee46',
  dbairro: 'c1dfa6',
  knockknock: 'ee66a0',
  helloDeliver: '02745f',
  viversBox: '2439e7',
  scootz: 'e67d2f',
  ola: 'aaa34e',
  sunShineRideShare: '2766da',
  spliffNation: '26834d',
  sourcesServices: '53929f',
  beachHop: '8a4f77',
  wer: 'fd0b92',
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
    ios: 'com.AfricanVillageMarketApp.Dispatch',
    android: 'com.AfricanVillageMarketApp.royodispatcher',
  }),
  africanize: Platform.select({
    ios: 'com.Dispatch.AfricanizeApp.ios',
    android: 'com.africanize.royodispatcher',
  }),
  tranzit: Platform.select({
    ios: 'com.Tranzit.Dispatch',
    android: 'com.tranzit.royodispatcher',
  }),
  hemptify: Platform.select({
    ios: 'com.HemptyFy.Dispatch',
    android: 'com.App.HemptiFy.royodispatcher',
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
    ios: 'com.BlipDeliveryApp.Dispatch',
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
    ios: 'com.CabdelivrApp.Dispatch',
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
    ios: 'com.App.rxnow.royodispatcher',
    android: 'com.rxnow.royodispatcher',
  }),
  checkout: Platform.select({
    ios: 'com.orderchekoutIosApp.driver',
    android: 'com.orderchekout.driver.android1',
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
    ios: 'com.LoopWhole.Dispatcher',
    android: 'com.Loopwhole.Dispatcher',
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
    android: 'com.AppPinkJet.royodispatcher',
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
    ios: 'com.app.HMC.Dispatcher',
    android: 'com.app.HMC.royodispatcher',
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
    ios: 'com.SomameApp.Dispatch',
    android: 'com.Somame.royodispatcher',
  }),
  equamd: Platform.select({
    ios: 'com.EquaMD.Dispatch',
    android: 'com.equamd.royodispatcher',
  }),
  drus: Platform.select({
    ios: 'com.Drus.Dispatcher',
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
    ios: 'com.HelpNowRightNowApp.Dispatch',
    android: 'com.helpnowrightnow.royodispatcher',
  }),
  agriOnline: Platform.select({
    ios: 'com.AgriOnline.Dispatcher',
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
    ios: 'com.Yeboy.Dispatcher',
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
  vici: Platform.select({
    ios: 'com.VICI.Dispatch.App',
    android: 'com.vici.driverapp',
  }),
  stonses: Platform.select({
    ios: 'com.Stonses.Dispatch',
    android: 'com.Stonses.royodispatcher',
  }),
  threadAgain: Platform.select({
    ios: 'com.ThreadAgain.Dispatch',
    android: 'com.ThreadAgain.royodispatcher',
  }),
  blacNetwork: Platform.select({
    ios: 'com.BlacNetwork.Dispatch',
    android: 'com.BlacNetwork.royodispatcher',
  }),
  ezMobileFuel: Platform.select({
    ios: 'com.EzMobileFuel.Dispatch',
    android: 'com.EzMobileFuel.royodispatcher',
  }),
  ssuum: Platform.select({
    ios: 'com.Ssuum.Dispatch',
    android: 'com.Ssuum.royodispatcher',
  }),
  swiftandValu: Platform.select({
    ios: 'com.SwiftandValu.Dispatch',
    android: 'com.SwiftandValu.royodispatcher',
  }),
  runaRound: Platform.select({
    ios: 'com.RunaRound.Dispatch',
    android: 'com.RunaRound.royodispatcher',
  }),
  trucxi: Platform.select({
    ios: 'com.Trucxi.Dispatch',
    android: 'com.Trucxi.royodispatcher',
  }),
  laundryOrders: Platform.select({
    ios: 'com.LaundryOrders.Dispatch',
    android: 'com.LaundryOrders.royodispatcher',
  }),
  groupy: Platform.select({
    ios: 'com.Groupy.Dispatcher',
    android: 'com.Groupy.royodispatcher',
  }),
  docta_transportation: Platform.select({
    ios: 'com.DoctaTransportation.Dispatch',
    android: 'com.DoctaTransportation.royodispatcher',
  }),
  hairstonexpress: Platform.select({
    ios: 'com.HairstonExpress.Dispatch',
    android: 'com.HairstonExpress.royodispatcher',
  }),
  iNeed: Platform.select({
    ios: 'com.INeed.Dispatch',
    android: 'com.INeed.royodispatcher',
  }),
  naDelivery: Platform.select({
    ios: 'com.NaDelivery.Dispatcher',
    android: 'com.NaDelivery.dispatcher',
  }),
  chipeTaxi: Platform.select({
    ios: 'com.ChipeTaxi.Dispatch',
    android: 'com.ChipeTaxi.royodispatcher',
  }),
  paySic: Platform.select({
    ios: 'com.PaySic.Dispatch',
    android: 'com.PaySic.royodispatcher',
  }),
  boozieDoozie: Platform.select({
    ios: 'com.BoozieDoozie.Dispatch',
    android: 'com.BoozieDoozie.royodispatcher',
  }),
  yoho: Platform.select({
    ios: 'com.Yohoapp.Dispatcher',
    android: 'com.Yoho.royodispatcher',
  }),
  marasym: Platform.select({
    ios: 'com.Marasym.Dispatch',
    android: 'com.Marasym.royodispatcher',
  }),
  mobi: Platform.select({
    ios: 'com.MOBI.Dispatch',
    android: 'com.Mobi.royodispatcher',
  }),
  samakeeMart: Platform.select({
    ios: 'com.SamakeeMart.Dispatcher',
    android: 'com.SamakeeMart.royodispatcher',
  }),
  silvestre: Platform.select({
    ios: 'com.Silvestre.Dispatch',
    android: 'com.Silvestre.royodispatcher',
  }),
  doorstep: Platform.select({
    ios: 'com.DoorStep.Dispatch',
    android: 'com.DoorStep.royodispatcher',
  }),
  seaeats: Platform.select({
    ios: 'com.Seaeats.Dispatch',
    android: 'com.Seaeats.royodispatcher',
  }),
  enext: Platform.select({
    ios: 'com.Enext.Dispatch',
    android: 'com.Enext.royodispatcher',
  }),
  foodNests: Platform.select({
    ios: 'com.FoodNests.Dispatch',
    android: 'com.FoodNests.royodispatcher',
  }),
  tasmeem: Platform.select({
    ios: 'com.Tasmeem.Dispatch',
    android: 'com.tasmeem.royodispatcher',
  }),
  destination_ops: Platform.select({
    ios: 'com.DestinationOps.Dispatch',
    android: 'com.destinationOpsApp.royodispatcher',
  }),
  cannabus_express: Platform.select({
    ios: 'com.CannabusExpress.Dispatcher',
    android: 'com.cannabusexpress.royodispatcher',
  }),
  flying_horse: Platform.select({
    ios: 'com.FlyingHorse.Dispatch',
    android: 'com.FlyingHorse.royodispatcher',
  }),
  ufood: Platform.select({
    ios: 'com.UFood.Dispatch',
    android: 'com.ufood.royodispatcher',
  }),
  servze: Platform.select({
    ios: 'com.Servze.Dispatch',
    android: 'com.servze.royodispatcher',
  }),
  goMeat: Platform.select({
    ios: 'com.GoMeat.Dispatch',
    android: 'com.GoMeat.royodispatcher',
  }),
  transportSystem: Platform.select({
    ios: 'com.TransportSystem.Dispatch',
    android: 'com.TransportSystem.royodispatcher',
  }),
  shopCentral: Platform.select({
    ios: 'com.ShopCentral.Dispatch',
    android: 'com.ShopCentral.royodispatcher',
  }),
  sponge: Platform.select({
    ios: 'com.Sponge.Dispatch',
    android: 'com.Sponge.royodispatcher',
  }),
  skidoo: Platform.select({
    ios: 'com.Skidoo.Dispatch',
    android: 'com.Skidoo.royodispatcher',
  }),
  weEat: Platform.select({
    ios: 'com.WeEat.Dispatch',
    android: 'com.WeEat.royodispatcher',
  }),
  sambiga: Platform.select({
    ios: 'com.Sambiga.Dispatch',
    android: 'com.Sambiga.royodispatcher',
  }),
  towFinder: Platform.select({
    ios: 'com.TowFinder.Dispatch',
    android: 'com.TowFinder.royodispatcher',
  }),
  aGBDeliveries: Platform.select({
    ios: 'com.AGBDeliveries.Dispatch',
    android: 'com.AGBDeliveries.royodispatcher',
  }),
  admCourier: Platform.select({
    ios: 'com.ADMCourier.Dispatch',
    android: 'com.ADMCourier.royodispatcher',
  }),
  kurbsideKings: Platform.select({
    ios: 'com.KurbsideKings.Dispatch',
    android: 'com.KurbsideKings.royodispatcher',
  }),
  movingWheels: Platform.select({
    ios: 'com.MovingWheels.Dispatch',
    android: 'com.MovingWheels.royodispatcher',
  }),
  safewalks: Platform.select({
    ios: 'com.Safewalks.Dispatch',
    android: 'com.Safewalks.royodispatcher',
  }),
  empire: Platform.select({
    ios: 'com.Empire.Dispatch',
    android: 'com.Empire.royodispatcher',
  }),
  dimaVega: Platform.select({
    ios: 'com.DimaVega.Dispatch',
    android: 'com.DimaVega.royodispatcher',
  }),
  dummyDispatcher: Platform.select({
    ios: 'com.dummyDispatcher.Dispatch',
    android: 'com.dummyDispatcher.royodispatcher',
  }),
  skoop: Platform.select({
    ios: 'com.Skoop.Dispatch',
    android: 'com.Skoop.royodispatcher',
  }),
  pickmeup: Platform.select({
    ios: 'com.PickMeUp.Dispatch',
    android: 'com.Pickmeup.royodispatcher',
  }),
  kudhyo: Platform.select({
    ios: 'com.Kudhyo.Dispatch',
    android: 'com.Kudhyo.royodispatcher',
  }),
  bharatMove: Platform.select({
    ios: 'com.BharatMove.Dispatch',
    android: 'com.BharatMove.royodispatcher',
  }),
  sofia: Platform.select({
    ios: 'com.Sofia.Dispatch',
    android: 'com.Sofia.royodispatcher',
  }),
  mml: Platform.select({
    ios: 'com.MML.Dispatch',
    android: 'com.app.MML.royodispatcher',
  }),
  bimol: Platform.select({
    ios: 'com.Bimol.Dispatch',
    android: 'com.Bimol.royodispatcher',
  }),
  tripTCI: Platform.select({
    ios: 'com.TripTCI.Dispatch',
    android: 'com.TripTCI.royodispatcher',
  }),
  vendoor: Platform.select({
    ios: 'com.Vendoor.Dispatch',
    android: 'com.Vendoor.royodispatcher',
  }),
  pinkyDeli: Platform.select({
    ios: 'com.PinkyDeli.Dispatch',
    android: 'com.PinkyDeli.royodispatcher',
  }),
  releezer: Platform.select({
    ios: 'com.Releezer.Dispatch',
    android: 'com.Releezer.royodispatcher',
  }),
  vendorSpot: Platform.select({
    ios: 'com.VendorSpot.Dispatch',
    android: 'com.VendorSpot.royodispatcher',
  }),
  SXM2GO: Platform.select({
    ios: 'com.SXM2GO.Dispatch',
    android: 'com.SXM2GO.royodispatcher',
  }),
  farmerSouq: Platform.select({
    ios: 'com.FarmerSouq.Dispatch',
    android: 'com.FarmerSouq.royodispatcher',
  }),
  yogo_lift: Platform.select({
    ios: 'com.YogoLift.Dispatch',
    android: 'com.yogoLift.royodispatcher',
  }),
  mozmarcas: Platform.select({
    ios: 'com.Mozmarcas.Dispatch',
    android: 'com.Mozmarcas.royodispatcher',
  }),
  stichesonSite: Platform.select({
    ios: 'com.StichesonSite.Dispatch',
    android: 'com.StichesonSite.royodispatcher',
  }),
  tmgShops: Platform.select({
    ios: 'com.TmgShops.Dispatch',
    android: 'com.TmgShops.royodispatcher',
  }),
  gasGiant: Platform.select({
    ios: 'com.GasGiant.Dispatch',
    android: 'com.GasGiant.royodispatcher',
  }),
  zestyClickz: Platform.select({
    ios: 'com.ZestyClickz.Dispatch',
    android: 'com.ZestyClickz.royodispatcher',
  }),
  citySuds: Platform.select({
    ios: 'com.CitySuds.Dispatch',
    android: 'com.CitySuds.royodispatcher',
  }),
  drivva: Platform.select({
    ios: 'com.Drivva.Dispatch',
    android: 'com.Drivva.royodispatcher',
  }),
  easyu: Platform.select({
    ios: 'com.Easyu.Dispatcher',
    android: 'com.Easyu.royodispatcher',
  }),
  myfiji: Platform.select({
    ios: 'com.Myfiji.Dispatch',
    android: 'com.Myfiji.royodispatcher',
  }),
  ritenow: Platform.select({
    ios: 'com.Ritenow.Driver',
    android: 'com.Ritenow.Dispatcher',
  }),
  fastMikes: Platform.select({
    ios: 'com.fastMikes.Dispatch',
    android: 'com.fastMikes.royodispatcher',
  }),
  hometowndeliveryllc: Platform.select({
    ios: 'com.HomeTownDeliveryllc.Dispatch',
    android: 'com.HomeTownDeliveryllc.royodispatcher',
  }),
  flit: Platform.select({
    ios: 'com.Flit.Dispatch',
    android: 'com.Flit.royodispatcher',
  }),
  fides: Platform.select({
    ios: 'com.Fides.Dispatch',
    android: 'com.Fides.royodispatcher',
  }),
  ullaz: Platform.select({
    ios: 'com.Ullaz.Dispatch',
    android: 'com.Ullaz.royodispatcher',
  }),
  privatepremiumpickups: Platform.select({
    ios: 'com.PrivatePremiumPickups.Dispatch',
    android: 'com.PrivatePremiumPickups.royodispatcher',
  }),
  ihelp: Platform.select({
    ios: 'com.Ihelp.Dispatch',
    android: 'com.Ihelp.royodispatcher',
  }),
  bksTaxi: Platform.select({
    ios: 'com.BksTaxi.Dispatch',
    android: 'com.BksTaxi.royodispatcher',
  }),
  oxo: Platform.select({
    ios: 'com.OXO.Dispatch',
    android: 'com.OXO.royodispatcher',
  }),
  everywhere: Platform.select({
    ios: 'com.Everywhere.Dispatch',
    android: 'com.Everywhere.royodispatcher',
  }),
  sijang: Platform.select({
    ios: 'com.Sijang.Dispatch',
    android: 'com.Sijang.royodispatcher',
  }),
  fairexpay: Platform.select({
    ios: 'com.Fairexpay.Dispatch',
    android: 'com.Fairexpay.royodispatcher',
  }),
  cannabis_Club_SF: Platform.select({
    ios: 'com.CannabisClubSF.Dispatch',
    android: 'com.CannabisClubSF.royodispatcher',
  }),
  martinonwheels: Platform.select({
    ios: 'com.Martinonwheels.Dispatch',
    android: 'com.Martinonwheels.royodispatcher',
  }),
  keydiscovery: Platform.select({
    ios: 'com.KEYDiscovery.Dispatch',
    android: 'com.KeyDiscovery.royodispatcher',
  }),
  palmettoplus: Platform.select({
    ios: 'com.Palmettoplus.Dispatch',
    android: 'com.Palmettoplus.royodispatcher',
  }),
  halaTalabat: Platform.select({
    ios: 'com.HalaTalabat.Dispatch',
    android: 'com.HalaTalabat.royodispatcher',
  }),
  alloTaxi: Platform.select({
    ios: 'com.AlloTaxi.Dispatch',
    android: 'com.AlloTaxi.royodispatcher',
  }),
  jadorDrive: Platform.select({
    ios: 'com.JadorDrive.Dispatch',
    android: 'com.JadorDrive.royodispatcher',
  }),
  kongaFood: Platform.select({
    ios: 'com.KongaFood.Dispatcher',
    android: 'com.KongaFood.royodispatcher',
  }),
  theHouse: Platform.select({
    ios: 'com.TheHouse.Dispatch',
    android: 'com.TheHouse.royodispatcher',
  }),
  uberCann: Platform.select({
    ios: 'com.UberCann.Dispatch',
    android: 'com.UberCann.royodispatcher',
  }),
  launch: Platform.select({
    ios: 'com.Launch.Dispatch',
    android: 'com.Launch.royodispatcher',
  }),
  kampick: Platform.select({
    ios: 'com.Kampick.Dispatch',
    android: 'com.Kampick.royodispatcher',
  }),
  IPicknDrop: Platform.select({
    ios: 'com.IPicknDrop.Dispatch',
    android: 'com.IPicknDrop.royodispatcher',
  }),
  bluebolt: Platform.select({
    ios: 'com.Bluebolt.Dispatch',
    android: 'com.Bluebolt.royodispatcher',
  }),
  cabio: Platform.select({
    ios: 'com.Cabio.Dispatch',
    android: 'com.Cabio.royodispatcher',
  }),
  tumbak: Platform.select({
    ios: 'com.Tumbak.Dispatch',
    android: 'com.Tumbak.royodispatcher',
  }),
  meateasy: Platform.select({
    ios: 'com.MeatEasy.Dispatch',
    android: 'com.MeatEasy.royodispatcher',
  }),
  boltDelivery: Platform.select({
    ios: 'com.BoltDelivery.Dispatch',
    android: 'com.BoltDelivery.royodispatcher',
  }),
  onTheGo: Platform.select({
    ios: 'com.OnTheGo.Dispatch',
    android: 'com.OnTheGo.royodispatcher',
  }),
  mylaGlobal: Platform.select({
    ios: 'com.MylaGlobal.Dispatch',
    android: 'com.MylaGlobal.royodispatcher',
  }),
  gamaDelivery: Platform.select({
    ios: 'com.GamaDelivery.Dispatch',
    android: 'com.GamaDelivery.royodispatcher',
  }),
  ambuTap: Platform.select({
    ios: 'com.AmbuTap.Dispatch',
    android: 'com.AmbuTap.royodispatcher',
  }),
  swiffyLLC: Platform.select({
    ios: 'com.SwiffyLLC.Dispatch',
    android: 'com.SwiffyLLC.royodispatcher',
  }),
  sabroson: Platform.select({
    ios: 'com.Sabroson.Dispatch',
    android: 'com.Sabroson.royodispatcher',
  }),
  localdropoff: Platform.select({
    ios: 'com.Localdropoff.Dispatch',
    android: 'com.Localdropoff.royodispatcher',
  }),
  hivefair: Platform.select({
    ios: 'com.Hivefair.Dispatch',
    android: 'com.Hivefair.royodispatcher',
  }),
  beakMe: Platform.select({
    ios: 'com.BeakMe.Dispatch',
    android: 'com.BeakMe.royodispatcher',
  }),
  onscart: Platform.select({
    ios: 'com.Onscart.Dispatch',
    android: 'com.Onscart.royodispatcher',
  }),
  foodies: Platform.select({
    ios: 'com.Foodies.Dispatch',
    android: 'com.Foodies.royodispatcher',
  }),
  go: Platform.select({
    ios: 'com.Go.Dispatch',
    android: 'com.Go.royodispatcher',
  }),
  baubau: Platform.select({
    ios: 'com.Baubau.Dispatch',
    android: 'com.Baubau.royodispatcher',
  }),
  bookaryde: Platform.select({
    ios: 'com.Bookaryde.Dispatch',
    android: 'com.Bookaryde.royodispatcher',
  }),
  mandaExpress: Platform.select({
    ios: 'com.MandaExpress.Dispatch',
    android: 'com.MandaExpress.royodispatcher',
  }),
  yalary: Platform.select({
    ios: 'com.Yalary.Dispatch',
    android: 'com.Yalary.royodispatcher',
  }),
  heyBuddy: Platform.select({
    ios: 'com.HeyBuddy.Dispatch',
    android: 'com.HeyBuddy.royodispatcher',
  }),
  petsChoice: Platform.select({
    ios: 'com.PetsChoice.Dispatch',
    android: 'com.PetsChoice.royodispatcher',
  }),
  yoloSonic: Platform.select({
    ios: 'com.YoloSonic.Dispatch',
    android: 'com.YoloSonic.royodispatcher',
  }),
  mrHealth: Platform.select({
    ios: 'com.MrHealth.Dispatch',
    android: 'com.MrHealth.royodispatcher',
  }),
  ubi: Platform.select({
    ios: 'com.Ubi.Dispatch',
    android: 'com.Ubi.royodispatcher',
  }),
  lOPHT: Platform.select({
    ios: 'com.LOPHT.Dispatch',
    android: 'com.LOPHT.royodispatcher',
  }),
  seratho: Platform.select({
    ios: 'com.Seratho.Dispatch',
    android: 'com.Seratho.royodispatcher',
  }),
  xborne: Platform.select({
    ios: 'com.Xborne.Dispatch',
    android: 'com.Xborne.royodispatcher',
  }),
  fawaz: Platform.select({
    ios: 'com.Fawaz.Dispatch',
    android: 'com.Fawaz.royodispatcher',
  }),
  myRide: Platform.select({
    ios: 'com.MyRide.Dispatch',
    android: 'com.MyRide.royodispatcher',
  }),
  gRN: Platform.select({
    ios: 'com.GRN.Dispatch',
    android: 'com.GRN.royodispatcher',
  }),
  delivadrinks: Platform.select({
    ios: 'com.Delivadrinks.Dispatch',
    android: 'com.Delivadrinks.royodispatcher',
  }),
  getfix: Platform.select({
    ios: 'com.Getfix.Dispatch',
    android: 'com.Getfix.royodispatcher',
  }),
  scoopaTechnologies: Platform.select({
    ios: 'com.ScoopaTechnologies.Dispatch',
    android: 'com.ScoopaTechnologies.royodispatcher',
  }),
  slider: Platform.select({
    ios: 'com.Slider.Dispatch',
    android: 'com.Slider.royodispatcher',
  }),
  iCare: Platform.select({
    ios: 'com.ICare.Dispatch',
    android: 'com.ICare.royodispatcher',
  }),
  qrider: Platform.select({
    ios: 'com.Qrider.Dispatch',
    android: 'com.Qrider.royodispatcher',
  }),
  dlvrd: Platform.select({
    ios: 'com.Dlvrd.Dispatch',
    android: 'com.Dlvrd.royodispatcher',
  }),
  delivery: Platform.select({
    ios: 'com.Delivery.Dispatch',
    android: 'com.Delivery.royodispatcher',
  }),
  timHomeServices: Platform.select({
    ios: 'com.TimHomeServices.Dispatch',
    android: 'com.TimHomeServices.royodispatcher',
  }),
  dbairro: Platform.select({
    ios: 'com.Dbairro.Dispatch',
    android: 'com.Dbairro.royodispatcher',
  }),
  knockknock: Platform.select({
    ios: 'com.Knockknock.Dispatch',
    android: 'com.Knockknock.royodispatcher',
  }),
  helloDeliver: Platform.select({
    ios: 'com.HelloDeliver.Dispatch',
    android: 'com.HelloDeliver.royodispatcher',
  }),
  viversBox: Platform.select({
    ios: 'com.App.ViversBox.Dispatch',
    android: 'com.ViversBox.royodispatcher',
  }),
  scootz: Platform.select({
    ios: 'com.App.Scootz.Dispatch',
    android: 'com.Scootz.royodispatcher',
  }),
  ola: Platform.select({
    ios: 'com.Ola.Dispatch',
    android: 'com.Ola.royodispatcher',
  }),
  sunShineRideShare: Platform.select({
    ios: 'com.SunShineRideShare.Dispatcher',
    android: 'com.SunShineRideShare.royodispatcher',
  }),
  spliffNation: Platform.select({
    ios: 'com.SpliffNation.Dispatcher',
    android: 'com.SpliffNation.royodispatcher',
  }),
  sourcesServices: Platform.select({
    ios: 'com.SourcesServices.Dispatcher',
    android: 'com.SourcesServices.royodispatcher',
  }),
  beachHop: Platform.select({
    ios: 'com.BeachHop.Dispatcher',
    android: 'com.BeachHop.royodispatcher',
  }),
  wer: Platform.select({
    ios: 'com.Wer.Dispatcher',
    android: 'com.Wer.royodispatcher',
  }),
};

export { appIds, shortCodes };
