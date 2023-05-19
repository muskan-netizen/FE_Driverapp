import {Platform} from 'react-native';
import {getBundleId} from 'react-native-device-info';

const shortCodes = {
  sales: '745e3f',
  runrun: 'cbec70',
  royoDispatch: '1da2e9',
  deliverstat: 'e6b31c',
  africanVillageMarket: '6c786d',
  africanize: 'a98da0',
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
  rxnow: '7163d4',
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
  // gokab: '94d183', // staging
  gokab: '362d14', // live
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
  // grub: '745e3f',
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
  // washvalley: '745e3f',
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
  qseek: '960e91',
  delvento: '97a408',
  rideShare: '69b572',
  newYorkMiniMart: '7bb34e',
  airlinesRecruiter: 'deb34c',
  upStreet: 'bcf8e0',
  nineOneTwo: '5a1f38',
  trip: '5a79f3',
  tranzit: 'f84785',
  aauJau: '6dd683',
  mediPick: '768ac7',
  meltivers: 'ca88f8',
  ensoDigitalAgency: '4e7da7',
  hiperAbasto: '93cc8d',
  redglee: 'fd5938',
  capitalDiagnostics: '6755bb',
  handyPickup: '93ff00',
  dropitoffusa: 'b1aa98',
  tjjHub: 'da2230',
  orbitGroup: '5f0ef9',
  cartnar: '550805',
  uven: 'ac954e',
  pAS41: '434c5e',
  snabbhem: '01b449',
  waterTaxi: '217ec5',
  freshFarmz: '71542b',
  ryde: 'd69557',
  muvpod: '8b3c15',
  curblerLLC: '14e5e6',
  smile: '0a0885',
  caronaTaxi: '14f5ab',
  marjMarketplace: '54e429',
  evsOnTheGo: '310736',
  kazakazi: '01159e',
  arwin: 'f2df02',
  papiRuki: '477912',
  markSoublet: '91b4eb',
  amstaFood: 'f81ae6',
  toor: '9d22d4',
  peerDeliveries: '0e00e8',
  swan: '85938b',
  scootUp: '98340e',
  patrolNow: '179def',
  butlerDelivery: 'f93d8c',
  swatiRx: '7fbd6e',
  chowHub: '12f1ce',
  ginDeliver: '860741',
  maiz: '1a1705',
  orderFirst: 'cc230e',
  dingDongEat: '026f29',
  medicab: '35c021',
  fazeiTeam: 'e8346f',
  weTogether: 'a4996b',
  Jiffex: 'f4af1e',
  jazzyBug: '7e9e5f',
  savannaRags: '4e9ab7',
  amazingTaxi: '693ba8',
  keystoneDelivery: '182e7b',
  busTaMove: '6499ab',
  valley: '58ccd3',
  myFarma: '56ba56',
  blueBundles: '408285',
  kartandkarry: '5144d0',
  atasktt: 'd89cb3',
  quicklube: 'd9a19b',
  sorDelivery: 'db178d',
  grubHouse: '8f65f7',
  hitchDelivery: '2246ee',
  zoodMarket: 'a2bcd2',
  meow: 'f45eea',
  carlitoo: '1a455b',
  dingDongDelivers: '95d213',
  kurs: 'e7c7e4',
  torunz: '4786a9',
  spa: '69dd33',
  abbeRides: 'b65020',
  nrsa: 'b6f11b',
  sadia: '31d13d',
  elentaMart: 'b16063',
  exprexpro: 'a6ccaf',
  fresHest: 'd23863',
  servern: '4adb00',
  smokeRun: '54bc6e',
  myEvPlus: '745fe6',
  pawsee: '39cae6',
  hairRun: '5ee206',
  qdelo: '0f7aa4',
  zuriRide: '3a9316',
  americanLuxury: '0dad7b',
  smartMur: 'b93a6b',
  ouiSpeed: 'acced4',
  getItSent: 'bde9b2',
  iAmSelling: 'a4b0fc',
  fifteenP: '4ac093',
  euodooTechnologies: 'bb0bda',
  rota: '7bad1b',
  farmMeat: '61b041',
  yallaEat: '2d9c6d',
  choizez: 'a1c203',
  otto: 'ca3410',
  rescueRoadsideAssistance: '425fbf',
  taxE: 'cf7217',
  baggageTaxi: '39af81',
  mersi: '75a2aa',
  foodSpot: '3e8962',
  karibaMart: 'aaf330',
  sourceWith: '4b15eb',
  vdu: '98946e',
  taxiology: 'a754a3',
  laundroZone: '459c97',
  swipe: 'ad4124',
  sheRyders: '19a9bc',
  kurrix: 'aa2686',
  easyDrink: 'b69dbd',
  mrVeloz: 'b74f5c',
  pets: 'fe860d',
  greenCab: '91f5e4',
  axxi: '634a32',
  shelf: '7ebe0a',
  getDress: 'b884f5',
  nuvoni: 'ea4e64',
  fairDeal: 'd14c84',
  balyDlvry: '699728',
  hezniTaxi: '3107f7',
  onTheWheel: 'b053fb',
  valleyMeats: '7cf41c',
  perucabs: 'b0eeff',
  hafizjwlry: '9432be',
  jana: '489220',
  brilApp: 'a77856',
  cattch: '27087d',
  tezras: '2a2d25',
  eureka: '54bd72',
  kaypee: '6fb0d4',
  hitaxi: '5e5ec2',
  kwivar: '53992e',
  parcel: '10d107',
  lex: '26cd40',
  flank: '201a5b',
  smokyKitchen: 'd3b29b',
  zynoride: 'a38482',
  mealsarehere: '881894',
  loamscape: 'e1f00f',
  delcolink: '522499',
  youSmokeShop: 'fc66a8',
  sylomart: 'c63e45',
  doober: 'aeeafd',
  inmotion: 'a8d728',
  jeevann: 'bd51fb',
  novamed: '9ac189',
  eatHalal: '0954a9',
  awamer: '96874b',
  goTech: '9c43ec',
  idrv: 'f8d46b',
  qwiker: '2b8a5b',
  spryton: '179034',
  nittosadai: '7ea9b3',
  clickOkart: '81586c',
  verz: '93c9e7',
  tiimo: '57fff9',
  carryFood: 'b06460',
  ragioMigo: '58a83e',
  jimsAutoRescue: '2a0b56',
  nhazi: '064fd8',
  petverse: '1d5220',
  clickNDrop: 'd27ec3',
  appi: '15ba2c',
  lifeHomeFit: 'af03e6',
  dbairro_: '120a7d',
  genee: '033b2e',
  speedyDelivery: '9ddb59',
  holla: '09f477',
  icabPro: 'ee50e0',
  uberWeeds: '773548',
  stabex: '76bf13',
  pointoneExpediteDelivery: '43bdda',
  saamanShop: '63f37f',
  tdc: 'a36786',
  pik: 'cf0372',
  flyCommerce: '93ea40',
  motina: '392731',
  greenHippo: '6a6b8b',
  hungry: '08aeee',
  myMeddy: 'ceb53d',
  uRyd: '5d7b49',
  happySingh: '8c6c20',
  vital: '59dc15',
  parcelWorks: 'fd186b',
  konectame: 'cac8dc',
  usVetsDeliver: '5087c1',
  bigbayong: '2c614d',
  locate: 'c119ae',
  todaysDeliverys: '9fc243',
  georgiacollective: '834623',
  lincshare: '84ee7c',
  rumbella: '0233dd',
  glavour: '430cb3',
  shipmoe: 'd3b17f',
  skyline: '083e4d',
  rentzy: '16ce83',
  bliss: '24a7bf',
  otgWeeds: '801707',
  zyno: '2cdbe7',
  efectibo: '8c55a5',
  hectoHomes: 'df0cfa',
  glamguide: 'c6cc57',
  sooq: '80d590',
  superpana: 'e0ac7c',
  solace: '8c7637',
  kero: '253d2d',
  housingSubsidies: 'ea2a79',
  bocch: '74c882',
  potolo: '75902f',
  earnApp: '72e7cb',
  aredoo: '1a5da0',
  bukam: 'ef4046',
  shopcart: 'e505e4',
  dot: '4827ee',
  wizsonic: '82d165',
  udkay: '29a641',
  hattaFoodHub: '4426d1',
  ondgoo: 'd156ea',
  junkerz: '1ac153',
  viralClean: '256a0f',
  messiaa: 'c60e40',
  superApp: '9f5702',
  nounou: '2e78fd',
  laith: '89e6b8',
  oaks: '5eab74',
  buzyStores: '8c70ed',
  etiam: 'a10566',
  dotTaxi: 'ca35c5',
  airvoltTaxi: '694d92',
  melak: '1a8ecf',
  vialteran: '0d943d',
  wiEnergi: 'd13d84',
  whatChaGotPckUp: '644237',
  nannyAfrica: 'bf57ac',
  gokart: '86a0ca',
  hqi: '453367',
  nool: '5bd541',
  weemoov: 'f98830',
  rally: '51ee69',
  shipsmart: 'a61d20',
  weedLomo: '659c2f',
  nGoal: 'f6e56e',
  tkaff: 'd6e780',
  livraizoo: '85faad',
  boozeBrothers: 'ae2454',
  readyToRent: '45fe80',
  theGenie: '193af0',
  sultanCenter: 'e3255c',
  reedas: '986325',
  onebasket: '15bc85',
  zozozi: 'a6e77a',
  ekobridge: '8a98a0',
  ambosSafariExpress: '9bc84f',
  Zulbrand: '1788d6',
  emart: 'f21fb6',
  stargaze: 'f4b3d2',
  mealtime: 'd93dc0',
  OyeeRides: '01967e',
  royoRides: 'cc0e66',
  autobox: '868a72',
  tempcorner: 'c7daac',
  emiratesHomeNursing: '892b1d',
  detailPros: '2dbd37',
  zuluClutch: 'bc3bdb',
  ineeda: '5b606d',
  blink: '216dab',
  jds: 'e7144c',
  ping: 'de2922',
  chutneyeah: 'ac41c1',
  virgingate: 'f5a75e',
  staFood: '6da07c',
  dropoff: '595e36',
  exlraet: '77dfe7',
  instaFits: '5b787c',
  bumprkar: '9ff535',
  bakaramoh: 'c82095',
  vamVam: '3bed4d',
  piolfix: 'd08532',
  rBRiders: '41a39d',
  karis: 'aa8767',
  mammysKitchen: 'e4ab20',
  japaConnect: 'a3d047',
};

const appIds = {
  royoorder: Platform.select({
    ios: 'com.CodeBrew.Royo.Driver',
    android: 'com.codebrew.royodispatcher',
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
    ios: 'com.Tranzit.Dispatcher',
    android: 'com.tranzit.royodispatcher',
  }),
  hemptify: Platform.select({
    ios: 'com.HemptyFy.Dispatch',
    android: 'com.HemptiFyDriver',
  }),
  goody: Platform.select({
    ios: 'com.Goody.Dispatch',
    android: 'com.Goody.royodispatcher',
  }),
  yogofood: Platform.select({
    ios: 'com.YogoFood.Dispatcher',
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
    android: 'com.driveree.Dispatcher',
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
    ios: 'com.Ored.Dispatcher',
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
    ios: 'com.Menus.Dispatcher',
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
    ios: 'com.Spidbi.Dispatcher',
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
    ios: 'com.ExpressDeliverysLLC.Dispatcher',
    android: 'com.ExpressDeliverysLLC.royodispatcher',
  }),
  fleety: Platform.select({
    ios: 'com.Fleety.Dispatch',
    android: 'com.fleetydriver.app',
  }),
  gumastas: Platform.select({
    ios: 'com.Gumastas.Dispatch',
    android: 'com.Gumastas.royodispatcher',
  }),
  dishefs: Platform.select({
    ios: 'com.DishefsDriver',
    android: 'com.DishefsDriver',
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
    android: 'com.AgriOnline.Dispatcher',
  }),
  clickeat: Platform.select({
    ios: 'com.clickEat.royoDispatcher',
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
    ios: 'com.click2deliver.royoDispatcher',
    android: 'com.Click2Deliver.royodispatcher',
  }),
  truckTireNow: Platform.select({
    ios: 'com.TruckTireNow.Dispatch',
    android: 'com.TruckTireNow.dispatch',
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
    ios: 'com.LastMinuteDress.Driver',
    android: 'com.LastMinuteDress.Driver',
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
    ios: 'com.BlacNetwork.Driver',
    android: 'com.BlacNetwork.Driver',
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
    android: 'com.ineed.userApplication',
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
    android: 'com.yoho.partner',
  }),
  marasym: Platform.select({
    ios: 'com.Marasym.Dispatch',
    android: 'com.Marasym.royodispatcher',
  }),
  mobi: Platform.select({
    ios: 'com.MOBI.Dispatcher',
    android: 'com.Mobi.dispatcher',
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
    ios: 'com.FoodNests.driverapp',
    android: 'com.FoodNests.driverapp',
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
    ios: 'com.App.UFood.Dispatcher',
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
    ios: 'com.shopcentralDriver.royodispatcher',
    android: 'com.shopcentralDriver.royodispatcher',
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
    ios: 'com.movingwheelsdelivery.driverapp',
    android: 'com.movingwheelsdelivery.driverapp',
  }),
  safewalks: Platform.select({
    ios: 'com.Safewalks.Dispatch',
    android: 'com.Safewalks.royodispatcher',
  }),
  empire: Platform.select({
    ios: 'com.Empire.Dispatcher',
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
    ios: 'com.PickMeUp.Dispatcher',
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
    ios: 'com.App.MML.Dispatcher',
    android: 'com.app.MML.royodispatcher',
  }),
  bimol: Platform.select({
    ios: 'com.bimol.driver',
    android: 'com.bimol.driver',
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
    ios: 'com.SXM2GO.driverApp',
    android: 'com.SXM2GO.driverApp',
  }),
  farmerSouq: Platform.select({
    ios: 'com.FarmerSouq.Dispatch',
    android: 'com.FarmerSouq.royodispatcher',
  }),
  yogo_lift: Platform.select({
    ios: 'com.YogoLift.Dispatcher',
    android: 'com.yogoLift.dispatcher',
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
    ios: 'com.TmgShops.Driver',
    android: 'com.TmgShops.Driver',
  }),
  gasGiant: Platform.select({
    ios: 'com.GasGiant.Dispatch',
    android: 'com.GasGiant.royodispatcher',
  }),
  zestyClickz: Platform.select({
    ios: 'com.ZestyClickz.Dispatcher',
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
    ios: 'com.fijiEats.dispatcher',
    android: 'com.fijiEats.dispatcher',
  }),
  ritenow: Platform.select({
    ios: 'com.Ritenow.Driver',
    android: 'com.Ritenow.Dispatcher',
  }),
  fastMikes: Platform.select({
    ios: 'com.App.fastMikes.Dispatcher',
    android: 'com.fastMikes.royodispatcher',
  }),
  hometowndeliveryllc: Platform.select({
    ios: 'com.HomeTownDeliveryllc.Dispatch',
    android: 'com.HomeTownDeliveryllc.dispatcher',
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
    android: 'com.UllazDriver',
  }),
  privatepremiumpickups: Platform.select({
    ios: 'com.PrivatePremiumPickups.Dispatch',
    android: 'com.PrivatePremiumPickups.royodispatcher',
  }),
  ihelp: Platform.select({
    ios: 'com.Ihelp.Dispatch',
    android: 'com.IHelp.DispatcherApp',
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
    ios: 'com.fairex.driver',
    android: 'com.fairex.driver',
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
    ios: 'com.Palmettoplus.Dispatcher',
    android: 'com.Palmettoplus.dispatcher',
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
    ios: 'com.konga.food.rider',
    android: 'com.kongafood.kongafood',
  }),
  theHouse: Platform.select({
    ios: 'com.TheHouse.Dispatch',
    android: 'com.TheHouse.royodispatcher',
  }),
  uberCann: Platform.select({
    ios: 'com.UberCann.Dispatch',
    android: 'com.UberCann.Dispatch',
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
    ios: 'com.IPicknDrop.dispatcher',
    android: 'com.IPicknDrop.dispatcher',
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
    android: 'com.ambutap.driver',
  }),
  swiffyLLC: Platform.select({
    ios: 'com.SwiffyLLC.Dispatcher',
    android: 'com.SwiffyLLC.royodispatcher',
  }),
  sabroson: Platform.select({
    ios: 'com.Sabroson.Driver',
    android: 'com.Sabroson.Driver',
  }),
  localdropoff: Platform.select({
    ios: 'com.Localdropoff.Dispatcher',
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
    ios: 'com.bauBau.driver',
    android: 'com.baubau.driver',
  }),
  bookaryde: Platform.select({
    ios: 'com.Bookaryde.Dispatch',
    android: 'com.Bookaryde.royodispatcher',
  }),
  mandaExpress: Platform.select({
    ios: 'com.MandaExpress.Dispatcher',
    android: 'com.MandaExpress.royodispatcher',
  }),
  yalary: Platform.select({
    ios: 'com.Yalary.Dispatch',
    android: 'com.Yalary.royodispatcher',
  }),
  heyBuddy: Platform.select({
    ios: 'com.HeyBuddy.Dispatch',
    android: 'com.HeyBuddy.driverApp',
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
    android: 'com.MrHealth.Dispatcher',
  }),
  ubi: Platform.select({
    ios: 'com.Ubi.Dispatch',
    android: 'com.Ubi.royodispatcher',
  }),
  lOPHT: Platform.select({
    ios: 'com.LOPHT.Dispatch',
    android: 'com.LOPHT.Dispatch',
  }),
  seratho: Platform.select({
    ios: 'com.Seratho.Dispatch',
    android: 'com.Seratho.royodispatcher',
  }),
  xborne: Platform.select({
    ios: 'com.Xborne.dispatcher',
    android: 'com.Xborne.dispatcher',
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
    ios: 'com.Getfix.Dispatcher',
    android: 'com.Getfix.dispatcher',
  }),
  scoopaTechnologies: Platform.select({
    ios: 'com.ScoopaTechnologies.Dispatch',
    android: 'com.app.ScoopaTechnologies.royodispatcher',
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
    android: 'com.dispatch.dlvrd',
  }),
  delivery: Platform.select({
    ios: 'com.gdotDelivery.driver',
    android: 'com.gdotDelivery.driver',
  }),
  timHomeServices: Platform.select({
    ios: 'com.TimHomeServices.Dispatch',
    android: 'com.TimHomeServices.royodispatcher',
  }),
  dbairro: Platform.select({
    ios: 'com.Dbairro.DriverApp',
    android: 'com.Dbairro.dispatcher',
  }),
  knockknock: Platform.select({
    ios: 'com.knockkock.driverApp',
    android: 'com.knockkock.driverApp',
  }),
  helloDeliver: Platform.select({
    ios: 'com.HelloDeliver.Dispatch',
    android: 'com.HelloDeliver.royodispatcher',
  }),
  viversBox: Platform.select({
    ios: 'com.viversbox.driver',
    android: 'com.viversbox.driver',
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
    android: 'com.SunShineRideShare.driver',
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
    ios: 'com.BeachHop.Dispatch',
    android: 'com.BeachHop.Dispatch',
  }),
  wer: Platform.select({
    ios: 'com.Wer.Dispatcher',
    android: 'com.Wer.royodispatcher',
  }),
  qseek: Platform.select({
    ios: 'com.Qseek.Dispatch',
    android: 'com.Qseek.royodispatcher',
  }),
  delvento: Platform.select({
    ios: 'com.Delvento.Dispatch',
    android: 'com.Delvento.royodispatcher',
  }),
  rideShare: Platform.select({
    ios: 'com.RideShare.Dispatch',
    android: 'com.RideShare.driverapp',
  }),
  newYorkMiniMart: Platform.select({
    ios: 'com.NewYorkMiniMart.Driver',
    android: 'com.NewYorkMiniMart.royodispatcher',
  }),
  airlinesRecruiter: Platform.select({
    ios: 'com.AirlinesRecruiter.Dispatch',
    android: 'com.AirlinesRecruiter.royodispatcher',
  }),
  upStreet: Platform.select({
    ios: 'com.UpStreet.Dispatch',
    android: 'com.UpStreet.royodispatcher',
  }),
  nineOneTwo: Platform.select({
    ios: 'com.NineOneTwo.dispatcher',
    android: 'com.NineOneTwo.dispatcher',
  }),
  trip: Platform.select({
    ios: 'com.Trip.Dispatch',
    android: 'com.Trip.royodispatcher',
  }),
  aauJau: Platform.select({
    ios: 'com.AauJau.Dispatch',
    android: 'com.app.aaujaudriver',
  }),
  mediPick: Platform.select({
    ios: 'com.MediPick.Dispatch',
    android: 'com.MediPick.royodispatcher',
  }),
  meltivers: Platform.select({
    ios: 'com.Meltivers.Dispatcher',
    android: 'com.Meltivers.dispatcher',
  }),
  ensoDigitalAgency: Platform.select({
    ios: 'com.EnsoDigitalAgency.Dispatch',
    android: 'com.EnsoDigitalAgency.royodispatcher',
  }),
  hiperAbasto: Platform.select({
    ios: 'com.hiperAbastoDriver',
    android: 'com.hiperAbastoDriver',
  }),
  redglee: Platform.select({
    ios: 'com.Redglee.Dispatch',
    android: 'com.Redglee.royodispatcher',
  }),
  capitalDiagnostics: Platform.select({
    ios: 'com.CapitalDiagnostics.Dispatch',
    android: 'com.CapitalDiagnostics.royodispatcher',
  }),
  dropitoffusa: Platform.select({
    ios: 'com.Dropitoffusa.Dispatch',
    android: 'com.DropitoffusaDriver',
  }),
  handyPickup: Platform.select({
    ios: 'com.HandyPickup.driverapp',
    android: 'com.HandyPickup.driverapp',
  }),
  tjjHub: Platform.select({
    ios: 'com.TjjHub.Dispatch',
    android: 'com.TjjHub.royodispatcher',
  }),
  orbitGroup: Platform.select({
    ios: 'com.OrbitGroup.Dispatch',
    android: 'com.orbitgroup.royodispatcher',
  }),
  cartnar: Platform.select({
    ios: 'com.Cartnar.Dispatch',
    android: 'com.shoparixDriver.royodispatcher',
  }),
  uven: Platform.select({
    ios: 'com.Uven.Dispatcher',
    android: 'com.Uven.dispatcher',
  }),
  pAS41: Platform.select({
    ios: 'com.PAS41.Dispatch',
    android: 'com.PAS41.royodispatcher',
  }),
  snabbhem: Platform.select({
    ios: 'com.Snabbhem.Dispatch',
    android: 'com.Snabbhem.royodispatcher',
  }),
  freshFarmz: Platform.select({
    ios: 'com.FreshFarmz.Dispatch',
    android: 'com.FreshFarmz.royodispatcher',
  }),
  ryde: Platform.select({
    ios: 'com.Ryde.Dispatch',
    android: 'com.Ryde.royodispatcher',
  }),
  muvpod: Platform.select({
    ios: 'com.Muvpod.Dispatch',
    android: 'com.Muvpod.royodispatcher',
  }),
  waterTaxi: Platform.select({
    ios: 'com.WaterTaxi.Dispatch',
    android: 'com.WaterTaxi.royodispatcher',
  }),
  curblerLLC: Platform.select({
    ios: 'com.CurblerLLC.Dispatch',
    android: 'com.CurblerLLC.royodispatcher',
  }),
  smile: Platform.select({
    ios: 'com.Smile.Dispatch',
    android: 'com.Smile.royodispatcher',
  }),
  caronaTaxi: Platform.select({
    ios: 'com.CaronaTaxi.Dispatch',
    android: 'com.CaronaTaxi.royodispatcher',
  }),
  marjMarketplace: Platform.select({
    ios: 'com.MarjMarketplace.Dispatcher',
    android: 'com.MarjMarketplace.royodispatcher',
  }),
  kazakazi: Platform.select({
    ios: 'com.Kazakazi.Dispatch',
    android: 'com.Kazakazi.royodispatcher',
  }),
  evsOnTheGo: Platform.select({
    ios: 'com.EvsOnTheGo.Dispatch',
    android: 'com.EvsOnTheGo.royodispatcher',
  }),
  arwin: Platform.select({
    ios: 'com.Arwin.Dispatch',
    android: 'com.Arwin.royodispatcher',
  }),
  papiRuki: Platform.select({
    ios: 'com.papiruki.driverApp',
    android: 'com.papiruki.driverApp',
  }),
  markSoublet: Platform.select({
    ios: 'com.MarkSoublet.Dispatch',
    android: 'com.MarkSoublet.royodispatcher',
  }),
  amstaFood: Platform.select({
    ios: 'com.AmstaFood.Dispatch',
    android: 'com.AmstaFood.royodispatcher',
  }),
  toor: Platform.select({
    ios: 'com.toor.driver',
    android: 'com.toor.driver',
  }),
  peerDeliveries: Platform.select({
    ios: 'com.PeerDeliveries.Dispatch',
    android: 'com.PeerDeliveries.royodispatcher',
  }),
  swan: Platform.select({
    ios: 'com.swan.driver',
    android: 'com.application.swanDriver',
  }),
  scootUp: Platform.select({
    ios: 'com.ScootUp.Dispatch',
    android: 'com.ScootUp.royodispatcher',
  }),
  patrolNow: Platform.select({
    ios: 'com.PatrolNow.Dispatch',
    android: 'com.PatrolNow.royodispatcher',
  }),
  butlerDelivery: Platform.select({
    ios: 'com.butler.dispatcher',
    android: 'com.butler.dispatcher',
  }),
  swatiRx: Platform.select({
    ios: 'com.SwatiRx.Dispatch',
    android: 'com.SwatiRx.royodispatcher',
  }),
  chowHub: Platform.select({
    ios: 'com.ChowHub.Dispatch',
    android: 'com.ChowHub.royodispatcher',
  }),
  ginDeliver: Platform.select({
    ios: 'com.GinDeliver.Dispatch',
    android: 'com.GinDeliver.royodispatcher',
  }),
  maiz: Platform.select({
    ios: 'com.Maiz.Dispatch',
    android: 'com.Maiz.royodispatcher',
  }),
  orderFirst: Platform.select({
    ios: 'com.OrderFirst.Dispatch',
    android: 'com.OrderFirst.royodispatcher',
  }),
  dingDongEat: Platform.select({
    ios: 'com.dingDongEat.Dispatch',
    android: 'com.dingDongEat.royodispatcher',
  }),
  fazeiTeam: Platform.select({
    ios: 'com.fazeiTeam.Dispatch',
    android: 'com.fazeiTeam.royodispatcher',
  }),
  medicab: Platform.select({
    ios: 'com.medicab.Dispatch',
    android: 'com.medicab.royodispatcher',
  }),

  weTogether: Platform.select({
    ios: 'com.weTogether.Dispatch',
    android: 'com.weTogether.royodispatcher',
  }),

  Jiffex: Platform.select({
    ios: 'com.jiffex.Dispatch',
    android: 'com.jiffex.driver',
  }),
  jazzyBug: Platform.select({
    ios: 'com.jazzyBugDriver',
    android: 'com.jazzyBugDriver',
  }),
  keystoneDelivery: Platform.select({
    ios: 'com.keystonedelivery.driver',
    android: 'com.keystonedelivery.driver',
  }),
  amazingTaxi: Platform.select({
    ios: 'com.amazingTaxi.Driver',
    android: 'com.amazingTaxi.Driver',
  }),
  busTaMove: Platform.select({
    ios: 'com.BusTaMove.Dispatch',
    android: 'com.BusTaMove.royodispatcher',
  }),
  valley: Platform.select({
    ios: 'com.valley.driverapp',
    android: 'com.valley.driverapp',
  }),
  myFarma: Platform.select({
    ios: 'com.myFarma.driver',
    android: 'com.myFarma.royodispatcher',
  }),
  blueBundles: Platform.select({
    ios: 'com.blueBundle.dispatcher',
    android: 'com.blueBundle.dispatcher',
  }),
  kartandkarry: Platform.select({
    ios: 'com.kartandkarry.Dispatch',
    android: 'com.kartandkarry.royodispatcher',
  }),
  atasktt: Platform.select({
    ios: 'com.atasktt.Dispatch',
    android: 'com.atasktt.dispatcher',
  }),
  quicklube: Platform.select({
    ios: 'com.quicklube.Dispatch',
    android: 'com.quicklube.royodispatcher',
  }),
  sorDelivery: Platform.select({
    ios: 'com.sorDelivery.Dispatch',
    android: 'com.sorDelivery.royodispatcher',
  }),
  grubHouse: Platform.select({
    ios: 'com.grubHouse.Dispatch',
    android: 'com.grubHouse.dispatcher',
  }),
  hitchDelivery: Platform.select({
    ios: 'com.hitchDelivery.Dispatch',
    android: 'com.hitchDelivery.dispatcher',
  }),
  zoodMarket: Platform.select({
    ios: 'com.zoodMarket.Dispatch',
    android: 'com.zoodMarket.royodispatcher',
  }),
  meow: Platform.select({
    ios: 'com.meow.Dispatch',
    android: 'com.meow.royodispatcher',
  }),
  carlitoo: Platform.select({
    ios: 'com.Carlitoo.Dispatch',
    android: 'com.carlitoo.royodispatcher',
  }),
  dingDongDelivers: Platform.select({
    ios: 'com.DingDonggDelivers.Driver',
    android: 'com.DingDonggDelivers.Driver',
  }),
  kurs: Platform.select({
    ios: 'com.kurs.Dispatch',
    android: 'com.kurs.royodispatcher',
  }),
  torunz: Platform.select({
    ios: 'com.torunz.driverapp',
    android: 'com.torunz.driverapp',
  }),
  spa: Platform.select({
    ios: 'com.spa.Dispatch',
    android: 'com.spa.royodispatcher',
  }),
  abbeRides: Platform.select({
    ios: 'com.abbeRides.Driver',
    android: 'com.abbeRides.Driver',
  }),
  nrsa: Platform.select({
    ios: 'com.nrsa.dispatch',
    android: 'com.nrsa.dispatch',
  }),
  sadia: Platform.select({
    ios: 'com.sadia.royodispatcher',
    android: 'com.sadia.royodispatcher',
  }),
  elentaMart: Platform.select({
    ios: 'com.elentamart.dispatcher',
    android: 'com.elentamart.dispatcher',
  }),
  exprexpro: Platform.select({
    ios: 'com.Exprexpro.dispatcher',
    android: 'com.Exprexpro.dispatcher',
  }),
  fresHest: Platform.select({
    ios: 'com.fresHest.dispatcher',
    android: 'com.fresHest.dispatcher',
  }),
  servern: Platform.select({
    ios: 'com.servern.driverapp',
    android: 'com.servern.driverapp',
  }),
  smokeRun: Platform.select({
    ios: 'com.smokeRun.dispatcher',
    android: 'com.smokerundriver.app',
  }),
  myEvPlus: Platform.select({
    ios: 'com.myEvPlus.dispatcher',
    android: 'com.myEvPlus.dispatcher',
  }),
  pawsee: Platform.select({
    ios: 'com.pawsee.dispatcher',
    android: 'com.pawsee.dispatcher',
  }),
  hairRun: Platform.select({
    ios: 'com.hairrun.driver',
    android: 'com.hairrun.driver',
  }),
  qdelo: Platform.select({
    ios: 'com.qdeloDriver',
    android: 'com.qdeloDriver',
  }),
  zuriRide: Platform.select({
    ios: 'com.zuriRide.dispatcher',
    android: 'com.zuriRide.dispatcher',
  }),
  americanLuxury: Platform.select({
    ios: 'com.americanLuxury.dispatcher',
    android: 'com.americanLuxury.dispatcher',
  }),
  smartMur: Platform.select({
    ios: 'com.smartMur.dispatcher',
    android: 'com.smartMur.dispatcher',
  }),
  ouiSpeed: Platform.select({
    ios: 'com.ouiSpeed.dispatcher',
    android: 'com.ouiSpeed.dispatcher',
  }),
  getItSent: Platform.select({
    ios: 'com.getItSent.dispatcher',
    android: 'com.getItSent.dispatcher',
  }),
  iAmSelling: Platform.select({
    ios: 'com.iAmSelling.dispatcher',
    android: 'com.iAmSelling.dispatcher',
  }),
  fifteenP: Platform.select({
    ios: 'com.fifteenP.dispatcher',
    android: 'com.fifteenP.dispatcher',
  }),
  euodooTechnologies: Platform.select({
    ios: 'com.euodooTechnologies.dispatcher',
    android: 'com.euodooTechnologies.dispatcher',
  }),
  rota: Platform.select({
    ios: 'com.rota.dispatcher',
    android: 'com.rota.dispatcher',
  }),
  farmMeat: Platform.select({
    ios: 'com.farmMeat.dispatcher',
    android: 'com.farmMeat.dispatcher',
  }),
  yallaEat: Platform.select({
    ios: 'com.yallaEat.dispatcher',
    android: 'com.yallaEat.dispatcher',
  }),
  choizez: Platform.select({
    ios: 'com.choizez.dispatcher',
    android: 'com.choizez.dispatcher',
  }),
  otto: Platform.select({
    ios: 'com.otto.dispatcher',
    android: 'com.otto.dispatcher',
  }),
  rescueRoadsideAssistance: Platform.select({
    ios: 'com.rescueRoadsideAssistance.dispatcher',
    android: 'com.rescueRoadsideAssistance.dispatcher',
  }),
  taxE: Platform.select({
    ios: 'com.taxE.dispatcher',
    android: 'com.taxE.dispatcher',
  }),
  baggageTaxi: Platform.select({
    ios: 'com.baggageTaxi.dispatcher',
    android: 'com.baggageTaxi.dispatcher',
  }),
  mersi: Platform.select({
    ios: 'com.mersi.dispatcher',
    android: 'com.mersi.dispatcher',
  }),
  foodSpot: Platform.select({
    ios: 'com.foodSpot.dispatcher',
    android: 'com.foodSpot.dispatcher',
  }),
  karibaMart: Platform.select({
    ios: 'com.karibaMart.dispatcher',
    android: 'com.karibaMart.dispatcher',
  }),
  sourceWith: Platform.select({
    ios: 'com.sourceWith.dispatcher',
    android: 'com.sourceWith.dispatcher',
  }),
  vdu: Platform.select({
    ios: 'com.vdu.dispatcher',
    android: 'com.vdu.dispatcher',
  }),
  taxiology: Platform.select({
    ios: 'com.taxiology.driverApp',
    android: 'com.taxiology.driverApp',
  }),
  laundroZone: Platform.select({
    ios: 'com.LaundroZone.driver',
    android: 'com.LaundroZone.driver',
  }),
  swipe: Platform.select({
    ios: 'com.app.swipeDriver',
    android: 'com.app.swipeDriver',
  }),
  sheRyders: Platform.select({
    ios: 'com.sheRyders.dispatcher',
    android: 'com.sheRyders.dispatcher',
  }),
  kurrix: Platform.select({
    ios: 'com.kurrix.royoDispatcher',
    android: 'com.goadeliv.driverapp',
  }),
  easyDrink: Platform.select({
    ios: 'com.kurrix.royoDispatcher',
    android: 'com.kurrix.royoDispatcher',
  }),
  mrVeloz: Platform.select({
    ios: 'com.mrVeloz.driverapp',
    android: 'com.mrVeloz.driverapp',
  }),
  pets: Platform.select({
    ios: 'com.pets.royodispatcher',
    android: 'com.pets.royodispatcher',
  }),
  greenCab: Platform.select({
    ios: 'com.greenCab.royodispatcher',
    android: 'com.greenCab.royodispatcher',
  }),
  axxi: Platform.select({
    ios: 'com.axxi.royodispatcher',
    android: 'com.axxi.royodispatcher',
  }),
  shelf: Platform.select({
    ios: 'com.shelf.royodispatcher',
    android: 'com.shelf.royodispatcher',
  }),
  getDress: Platform.select({
    ios: 'com.getdress.royodispatcher',
    android: 'com.getdress.royodispatcher',
  }),
  nuvoni: Platform.select({
    ios: 'com.nuvoni.dispatcher',
    android: 'com.nuvoni.dispatcher',
  }),
  fairDeal: Platform.select({
    ios: 'com.fairdeal.royodispatcher',
    android: 'com.fairdeal.royodispatcher',
  }),
  balyDlvry: Platform.select({
    ios: 'com.balyDlvry.royodispatcher',
    android: 'com.balyDlvry.royodispatcher',
  }),
  hezniTaxi: Platform.select({
    ios: 'com.hezniTaxi.royodispatcher',
    android: 'com.hezniTaxi.royodispatcher',
  }),
  onTheWheel: Platform.select({
    ios: 'com.onthewheel.royodispatcher',
    android: 'com.onthewheel.royodispatcher',
  }),
  valleyMeats: Platform.select({
    ios: 'com.valleymeats.dispatcher',
    android: 'com.valleymeats.dispatcher',
  }),
  perucabs: Platform.select({
    ios: 'com.perucabs.dispatcher',
    android: 'com.perucabs.dispatcher',
  }),
  hafizjwlry: Platform.select({
    ios: 'com.hafizjwlry.royodispatcher',
    android: 'com.hafizjwlry.royodispatcher',
  }),
  jana: Platform.select({
    ios: 'com.jana.royodispatcher',
    android: 'com.jana.royodispatcher',
  }),
  brilApp: Platform.select({
    ios: 'com.brillApp.driver ',
    android: 'com.brillApp.driver',
  }),
  cattch: Platform.select({
    ios: 'com.cattch.royodispatcher',
    android: 'com.cattch.royodispatcher',
  }),
  tezras: Platform.select({
    ios: 'com.tezras.royodispatcher',
    android: 'com.tezras.royodispatcher',
  }),
  eureka: Platform.select({
    ios: 'com.eureka.royodispatcher',
    android: 'com.eureka.royodispatcher',
  }),
  kaypee: Platform.select({
    ios: 'com.kaypee.driverapp',
    android: 'com.kaypee.driverapp',
  }),
  hitaxi: Platform.select({
    ios: 'com.hitaxi.royodispatcherapp',
    android: 'com.hitaxi.royodispatcherapp',
  }),
  kwivar: Platform.select({
    ios: 'com.kwivar.royodispatcher',
    android: 'com.kwivar.royodispatcher',
  }),
  parcel: Platform.select({
    ios: 'com.parcel.royodispatcher',
    android: 'com.parcel.royodispatcher',
  }),
  lex: Platform.select({
    ios: 'com.lex.royodispatcher',
    android: 'com.lex.royodispatcher',
  }),
  flank: Platform.select({
    ios: 'com.flank.royodispatcher',
    android: 'com.flank.royodispatcher',
  }),
  smokyKitchen: Platform.select({
    ios: 'com.smokyKitchen.royodispatcher',
    android: 'com.smokyKitchen.royodispatcher',
  }),
  zynoride: Platform.select({
    ios: 'com.zynoride.royodispatcher',
    android: 'com.zynoride.royodispatcher',
  }),
  mealsarehere: Platform.select({
    ios: 'com.mealsarehere.royodispatcher',
    android: 'com.mealsarehere.royodispatcher',
  }),
  loamscape: Platform.select({
    ios: 'com.loamscape.royodispatcher',
    android: 'com.loamscape.royodispatcher',
  }),
  delcolink: Platform.select({
    ios: 'com.delcolink.royodispatcher',
    android: 'com.delcolink.royodispatcher',
  }),
  youSmokeShop: Platform.select({
    ios: 'com.youSmokeShop.royodispatcher',
    android: 'com.youSmokeShop.royodispatcher',
  }),
  doober: Platform.select({
    ios: 'com.doober.royodispatcher',
    android: 'com.doober.royodispatcher',
  }),
  sylomart: Platform.select({
    ios: 'com.sylomart.royodispatcher',
    android: 'com.sylomart.royodispatcher',
  }),
  inmotion: Platform.select({
    ios: 'com.inmotion.royodispatcher',
    android: 'com.inmotion.royodispatcher',
  }),
  eatHalal: Platform.select({
    ios: 'com.eatHalal.royodispatcher',
    android: 'com.eatHalal.royodispatcher',
  }),
  jeevann: Platform.select({
    ios: 'com.jeevan.driver',
    android: 'com.jeevan.driver',
  }),
  novamed: Platform.select({
    ios: 'com.novamed.royodispatcher',
    android: 'com.novamed.royodispatcher',
  }),
  awamer: Platform.select({
    ios: 'com.awamer.royodispatcher',
    android: 'com.awamer.royodispatcher',
  }),
  goTech: Platform.select({
    ios: 'com.goTech.royodispatcher',
    android: 'com.goTech.royodispatcher',
  }),
  idrv: Platform.select({
    ios: 'com.idvr.royodispatcher',
    android: 'com.idvr.royodispatcher',
  }),
  qwiker: Platform.select({
    ios: 'com.qwiker.royodispatcher',
    android: 'com.qwiker.royodispatcher',
  }),
  spryton: Platform.select({
    ios: 'com.spryton.royodispatcher',
    android: 'com.spryton.royodispatcher',
  }),
  nittosadai: Platform.select({
    ios: 'com.nittosadai.dispatcher',
    android: 'com.nittosadai.dispatcher',
  }),
  clickOkart: Platform.select({
    ios: 'com.clickOkart.royodispatcher',
    android: 'com.clickOkart.royodispatcher',
  }),
  verz: Platform.select({
    ios: 'com.verz.royodispatcher',
    android: 'com.verz.royodispatcher',
  }),
  tiimo: Platform.select({
    ios: 'com.tiimo.driverApp',
    android: 'com.tiimo.driverApp',
  }),
  carryFood: Platform.select({
    ios: 'com.carryFood.royodispatcher',
    android: 'com.carryFood.driver',
  }),
  ragioMigo: Platform.select({
    ios: 'com.ragiomigo.royodispatcher',
    android: 'com.ragiomigo.royodispatcher',
  }),
  jimsAutoRescue: Platform.select({
    ios: 'com.jimsAutoRescue.royodispatcher',
    android: 'com.jimsAutoRescue.royodispatcher',
  }),
  nhazi: Platform.select({
    ios: 'com.nhazi.royodispatcher',
    android: 'com.nhazi.royodispatcher',
  }),
  petverse: Platform.select({
    ios: 'com.petverse.royodispatcher',
    android: 'com.petverse.royodispatcher',
  }),
  clickNDrop: Platform.select({
    ios: 'com.clickNDrop.royodispatcher',
    android: 'com.clickNDrop.royodispatcher',
  }),
  appi: Platform.select({
    ios: 'com.appi.royodispatcher',
    android: 'com.appi.royodispatcher',
  }),
  lifeHomeFit: Platform.select({
    ios: 'com.lifeHomeFit.royodispatcher',
    android: 'com.lifeHomeFit.royodispatcher',
  }),
  dbairro_: Platform.select({
    ios: 'com.royodispatcher.dbairro',
    android: 'com.dbairro_.royodispatcher',
  }),
  genee: Platform.select({
    ios: 'com.royodispatcher.genee',
    android: 'com.genee.royodispatcher',
  }),
  speedyDelivery: Platform.select({
    ios: 'com.speedyDelivery.driver',
    android: 'com.speedyDelivery.driver',
  }),
  holla: Platform.select({
    ios: 'com.dispatcher.holla',
    android: 'com.holla.dispatcher',
  }),
  icabPro: Platform.select({
    ios: 'com.royodispatcher.icabPro',
    android: 'com.icabPro.royodispatcher',
  }),
  uberWeeds: Platform.select({
    ios: 'com.uberweeds.driver',
    android: 'com.uberweeds.driver',
  }),
  stabex: Platform.select({
    ios: 'com.stabex.driver',
    android: 'com.stabex.royodispatcher',
  }),
  pointoneExpediteDelivery: Platform.select({
    ios: 'com.royodispatcher.pointoneExpediteDelivery',
    android: 'com.pointoneExpediteDelivery.royodispatcher',
  }),
  saamanShop: Platform.select({
    ios: 'com.royodispatcher.saamanShop',
    android: 'com.saamanShop.royodispatcher',
  }),
  tdc: Platform.select({
    ios: 'com.royodispatcher.tdc',
    android: 'com.tdc.royodispatcher',
  }),
  flyCommerce: Platform.select({
    ios: 'com.royodispatcher.flyCommerce',
    android: 'com.flyCommerce.royodispatcher',
  }),
  pik: Platform.select({
    ios: 'com.royodispatcher.pik',
    android: 'com.PIK.royodispatcher',
  }),
  motina: Platform.select({
    ios: 'com.royodispatcher.motina',
    android: 'com.motina.royodispatcher',
  }),
  hungry: Platform.select({
    ios: 'com.royodispatcher.hungry',
    android: 'com.hungry.royodispatcher',
  }),
  myMeddy: Platform.select({
    ios: 'com.royodispatcher.myMeddy',
    android: 'com.myMeddy.royodispatcher',
  }),
  greenHippo: Platform.select({
    ios: 'com.greenHippo.driverApp',
    android: 'com.greenHippo.driver',
  }),
  uRyd: Platform.select({
    ios: 'com.royodispatcher.uRyd',
    android: 'com.uRyd.royodispatcher',
  }),
  happySingh: Platform.select({
    ios: 'com.royodispatcher.happySingh',
    android: 'com.happySingh.royodispatcher',
  }),
  vital: Platform.select({
    ios: 'com.royodispatcher.vital',
    android: 'com.vital.royodispatcher',
  }),
  parcelWorks: Platform.select({
    ios: 'com.parcelWorks.dispatcher',
    android: 'com.parcelWorks.dispatcher',
  }),
  konectame: Platform.select({
    ios: 'com.royodispatcher.konectame',
    android: 'com.konectame.royodispatcher',
  }),
  usVetsDeliver: Platform.select({
    ios: 'com.royodispatcher.usVetsDeliver',
    android: 'com.usVetsDeliver.royodispatcher',
  }),
  bigbayong: Platform.select({
    ios: 'com.royodispatcher.bigbayong',
    android: 'com.bigbayong.royodispatcher',
  }),
  locate: Platform.select({
    ios: 'com.royodispatcher.locate',
    android: 'com.locate.royodispatcher',
  }),
  todaysDeliverys: Platform.select({
    ios: 'com.royodispatcher.todaysDeliverys',
    android: 'com.todaysDeliverys.royodispatcher',
  }),
  georgiacollective: Platform.select({
    ios: 'com.royodispatcher.georgiacollective',
    android: 'com.georgiacollective.royodispatcher',
  }),
  lincshare: Platform.select({
    ios: 'com.lincshare.royodispatcher',
    android: 'com.lincshare.royodispatcher',
  }),
  rumbella: Platform.select({
    ios: 'com.rumbella.royodispatcher',
    android: 'com.rumbella.royodispatcher',
  }),
  glavour: Platform.select({
    ios: 'com.glavour.royodispatcher',
    android: 'com.glavour.royodispatcher',
  }),
  shipmoe: Platform.select({
    ios: 'com.shipmoe.royodispatcher',
    android: 'com.shipmoe.royodispatcher',
  }),
  bliss: Platform.select({
    ios: 'com.bliss.royodispatcher',
    android: 'com.bliss.royodispatcher',
  }),
  skyline: Platform.select({
    ios: 'com.skyline.royodispatcher',
    android: 'com.skyline.royodispatcher',
  }),
  rentzy: Platform.select({
    ios: 'com.rentzy.royodispatcher',
    android: 'com.rentzy.royodispatcher',
  }),
  otgWeeds: Platform.select({
    ios: 'com.otgWeeds.royodispatcher',
    android: 'com.otgWeeds.royodispatcher',
  }),
  hectoHomes: Platform.select({
    ios: 'com.hectoHomes.royodispatcher',
    android: 'com.hectoHomes.royodispatcher',
  }),
  glamguide: Platform.select({
    ios: 'com.glamguide.royodispatcher',
    android: 'com.glamguide.royodispatcher',
  }),
  efectibo: Platform.select({
    ios: 'com.efectibo.dispatcher',
    android: 'com.efectibo.dispatcher',
  }),
  zyno: Platform.select({
    ios: 'com.zyno.royodispatcher',
    android: 'com.zyno.royodispatcher',
  }),
  sooq: Platform.select({
    ios: 'com.sooq.dispatcher',
    android: 'com.sooq.dispatcher',
  }),
  superpana: Platform.select({
    ios: 'com.superpana.royodispatcher',
    android: 'com.superpana.royodispatcher',
  }),
  solace: Platform.select({
    ios: 'com.solace.royodispatcher',
    android: 'com.solace.royodispatcher',
  }),
  kero: Platform.select({
    ios: 'com.kero.royodispatcher',
    android: 'com.kero.royodispatcher',
  }),
  housingSubsidies: Platform.select({
    ios: 'com.housingSubsidies.royodispatcher',
    android: 'com.housingSubsidies.royodispatcher',
  }),
  bocch: Platform.select({
    ios: 'com.bocch.royodispatcher',
    android: 'com.bocch.royodispatcher',
  }),
  potolo: Platform.select({
    ios: 'com.potolo.royodispatcher',
    android: 'com.potolo.royodispatcher',
  }),
  earnApp: Platform.select({
    ios: 'com.earnApp.royodisaptcher',
    android: 'com.earnApp.royodisaptcher',
  }),
  aredoo: Platform.select({
    ios: 'com.aredoo.royodispatcher',
    android: 'com.aredoo.royodispatcher',
  }),
  bukam: Platform.select({
    ios: 'com.bukam.royodispatcher',
    android: 'com.bukam.driver',
  }),
  shopcart: Platform.select({
    ios: 'com.shopcart.royodispatcher',
    android: 'com.shopcart.royodispatcher',
  }),
  dot: Platform.select({
    ios: 'com.dot.royodispatcher',
    android: 'com.dot.royodispatcher',
  }),
  wizsonic: Platform.select({
    ios: 'com.wizsonic.royodispatcher',
    android: 'com.wizsonic.royodispatcher',
  }),
  udkay: Platform.select({
    ios: 'com.udkaydispatcher',
    android: 'com.udkaydispatcher',
  }),
  hattaFoodHub: Platform.select({
    ios: 'com.hattaFoodHub.driver',
    android: 'com.hattaFoodHub.royodispatcher',
  }),
  ondgoo: Platform.select({
    ios: 'com.ondgoo.royodispatcher',
    android: 'com.ondgoo.royodispatcher',
  }),
  junkerz: Platform.select({
    ios: 'com.junkerz.royodispatcher',
    android: 'com.junkerz.dispatcher',
  }),
  viralClean: Platform.select({
    ios: 'com.viralclean.royodriver',
    android: 'com.viralclean.royodriver',
  }),
  messiaa: Platform.select({
    ios: 'com.messiaa.driver',
    android: 'com.messiaa.driver',
  }),
  superApp: Platform.select({
    ios: 'com.superApp.royodispatcher',
    android: 'com.superApp.royodispatcher',
  }),
  nounou: Platform.select({
    ios: 'com.nounou.royodispatcher',
    android: 'com.nounou.royodispatcher',
  }),
  laith: Platform.select({
    ios: 'com.laith.royodispatcher',
    android: 'com.laith.royodispatcher',
  }),
  oaks: Platform.select({
    ios: 'com.oaks.royodispatcher',
    android: 'com.oaks.royodispatcher',
  }),
  buzyStores: Platform.select({
    ios: 'com.buzyStores.royodispatcher',
    android: 'com.buzyStores.royodispatcher',
  }),

  etiam: Platform.select({
    ios: 'com.etiam.royodispatcher',
    android: 'com.etiam.driverApp',
  }),
  dotTaxi: Platform.select({
    ios: 'com.dotTaxi.royodispatcher',
    android: 'com.dotTaxi.royodispatcher',
  }),

  airvoltTaxi: Platform.select({
    ios: 'com.airvolt.royodispatcher',
    android: 'com.airvolt.royodispatcher',
  }),
  melak: Platform.select({
    ios: 'com.melak.royodispatcher',
    android: 'com.melak.royodispatcher',
  }),
  vialteran: Platform.select({
    ios: 'com.vialteran.royodispatcher',
    android: 'com.vialteran.royodispatcher',
  }),
  wiEnergi: Platform.select({
    ios: 'com.wiEnergi.royodispatcher',
    android: 'com.wiEnergi.royodispatcher',
  }),
  whatChaGotPckUp: Platform.select({
    ios: 'com.whatChaGotPckUp.royodispatcher',
    android: 'com.whatchaGotPckUp.royodispatcher',
  }),
  nannyAfrica: Platform.select({
    ios: 'com.nannyAfrica.royodispatcher',
    android: 'com.nannyAfrica.royodispatcher',
  }),
  gokart: Platform.select({
    ios: 'com.gokart.royodispatcher',
    android: 'com.gokart.royodispatcher',
  }),
  hqi: Platform.select({
    ios: 'com.hqi.royodispatcher',
    android: 'com.hqi.royodispatcher',
  }),
  nool: Platform.select({
    ios: 'com.nool.royodispatcher',
    android: 'com.nool.royodispatcher',
  }),
  weemoov: Platform.select({
    ios: 'com.weemoov.royodispatcher',
    android: 'com.weemoov.royodispatcher',
  }),
  rally: Platform.select({
    ios: 'com.rally.royodispatcher',
    android: 'com.rally.royodispatcher',
  }),
  shipsmart: Platform.select({
    ios: 'com.shipsmart.royodispatcher',
    android: 'com.shipsmart.royodispatcher',
  }),
  weedLomo: Platform.select({
    ios: 'com.weedlomo.royodispatcher',
    android: 'com.weedlomo.royodispatcher',
  }),
  nGoal: Platform.select({
    ios: 'com.nGoal.driver',
    android: 'com.nGoal.driver',
  }),
  tkaff: Platform.select({
    ios: 'com.tkaff.royodispatcher',
    android: 'com.tkaff.royodispatcher',
  }),
  livraizoo: Platform.select({
    ios: 'com.livraizoo.royodispatcher',
    android: 'com.livraizoo.royodispatcher',
  }),
  boozeBrothers: Platform.select({
    ios: 'com.boozeBrothers.driver',
    android: 'com.boozeBrothers.driver',
  }),
  readyToRent: Platform.select({
    ios: 'com.readyToRent.royodispatcher',
    android: 'com.readyToRent.royodispatcher',
  }),
  theGenie: Platform.select({
    ios: 'com.theGenie.dispatcher',
    android: 'com.theGenie.royodispatcher',
  }),
  sultanCenter: Platform.select({
    ios: 'com.sultanCenter.driver',
    android: 'com.sultanCenter.driver',
  }),
  reedas: Platform.select({
    ios: 'com.reedas.royodispatcher',
    android: 'com.reedas.royodispatcher',
  }),
  onebasket: Platform.select({
    ios: 'com.onebasket.dispatcher',
    android: 'com.onebasket.dispatcher',
  }),
  zozozi: Platform.select({
    ios: 'com.zozozi.dispatcher',
    android: 'com.zozozi.dispatcher',
  }),
  ekobridge: Platform.select({
    ios: 'com.ekobridge.dispatcher',
    android: 'com.ekobridge.dispatcher',
  }),
  ambosSafariExpress: Platform.select({
    ios: 'com.ambosSafariExpress.dispatcher',
    android: 'com.ambosSafariExpress.dispatcher',
  }),
  zulbrand: Platform.select({
    ios: 'com.zulbrand.dispatcher',
    android: 'com.zulbrand.dispatcher',
  }),
  emart: Platform.select({
    ios: 'com.emart.dispatcher',
    android: 'com.emart.dispatcher',
  }),
  stargaze: Platform.select({
    ios: 'com.stargaze.dispatcher',
    android: 'com.stargaze.dispatcher',
  }),
  mealtime: Platform.select({
    ios: 'com.mealtime.driverapp',
    android: 'com.mealtime.driverapp',
  }),
  OyeeRides: Platform.select({
    ios: 'com.OyeeRides.dispatcher',
    android: 'com.OyeeRides.dispatcher',
  }),
  royoRides: Platform.select({
    ios: 'com.royoRides.driver',
    android: 'com.royoRides.driver',
  }),
  autobox: Platform.select({
    ios: 'com.autobox.royodriver',
    android: 'com.autobox.royodriver',
  }),
  tempcorner: Platform.select({
    ios: 'com.tempcorner.royodriver',
    android: 'com.tempcorner.royodriver',
  }),
  emiratesHomeNursing: Platform.select({
    ios: 'com.emiratesHomeNursing.driver',
    android: 'com.emiratesHomeNursing.driver',
  }),
  detailPros: Platform.select({
    ios: 'com.detailPros.driver',
    android: 'com.detailPros.driver',
  }),
  zuluClutch: Platform.select({
    ios: 'com.zuluClutch.driver',
    android: 'com.zuluClutch.driver',
  }),
  ineeda: Platform.select({
    ios: 'com.ineeda.driver',
    android: 'com.ineeda.driver',
  }),
  blink: Platform.select({
    ios: 'com.blink.dispatcher',
    android: 'com.blink.dispatcher',
  }),
  jds: Platform.select({
    ios: 'com.jds.driver',
    android: 'com.jds.driver',
  }),
  ping: Platform.select({
    ios: 'com.Ping.dispatcher',
    android: 'com.Ping.dispatcher',
  }),
  chutneyeah: Platform.select({
    ios: 'com.chutneyeah.driver',
    android: 'com.chutneyeah.driver',
  }),
  virgingate: Platform.select({
    ios: 'com.virgingate.driver',
    android: 'com.virgingate.driver',
  }),
  staFood: Platform.select({
    ios: 'com.stafood.driverapplication',
    android: 'com.stafood.driver',
  }),
  dropoff: Platform.select({
    ios: 'com.dropoff.dispatcher',
    android: 'com.dropoff.dispatcher',
  }),
  exlraet: Platform.select({
    ios: 'com.exlraet.driver',
    android: 'com.exlraet.driver',
  }),
  instaFits: Platform.select({
    ios: 'com.instaFits.driver',
    android: 'com.instaFits.driver',
  }),
  bumprkar: Platform.select({
    ios: 'com.bumprkar.driver',
    android: 'com.bumprkar.driver',
  }),
  bakaramoh: Platform.select({
    ios: 'com.bakaramoh.driver',
    android: 'com.bakaramoh.driver',
  }),
  vamVam: Platform.select({
    ios: 'com.VamVam.driver',
    android: 'com.VamVam.driver',
  }),
  piolfix: Platform.select({
    ios: 'com.piolfix.driver',
    android: 'com.piolfix.driver',
  }),
  rBRiders: Platform.select({
    ios: 'com.rbRiders.driver',
    android: 'com.rbRiders.driver',
  }),
  karis: Platform.select({
    ios: 'com.karis.driver',
    android: 'com.karis.driver',
  }),
  mammysKitchen: Platform.select({
    ios: 'com.mammysKitchen.driver',
    android: 'com.mammysKitchen.driver',
  }),
  japaConnect: Platform.select({
    ios: 'com.japaConnect.driver',
    android: 'com.japaConnect.driver',
  }),
};

export {appIds, shortCodes};
