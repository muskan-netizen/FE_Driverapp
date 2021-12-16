import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../navigation/navigationStrings';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {showError} from '../../utils/helperFunctions';
import stylesFun from './styles';
import RazorpayCheckout from 'react-native-razorpay';

export default function AddMoney({navigation}) {
  const {clientInfo} = useSelector(state => state?.initBoot);
  const {userData} = useSelector(state => state?.auth);

  const [state, setState] = useState({
    customAmount: [
      {id: 0, amount: 300},
      {id: 1, amount: 5000},
      {id: 2, amount: 4500},
    ],
    isLoadingB: false,
    amount: '',
    allPaymentOptions: [],
    seletedPaymentGateway: {},
  });

  const styles = stylesFun();
  const {
    amount,
    customAmount,
    isLoadingB,
    allPaymentOptions,
    seletedPaymentGateway,
  } = state;

  useEffect(() => {
    getWalletData();
  }, []);

  const getWalletData = () => {
    actions
      .getPaymentOptions(
        `/wallet`,
        {},
        {
          client: clientInfo?.database_name,
        },
      )
      .then(res => {
        console.log(res, '<<<res all payment gateways');
        updateState({
          allPaymentOptions: res?.data,
        });
      })
      .catch(errorMethod);
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const _onChangeText = key => val => {
    updateState({[key]: val});
  };

  const chooseAmount = item => {
    let addedAmount = item.amount;
    updateState({amount: addedAmount});
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => chooseAmount(item)}>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            paddingVertical: moderateScaleVertical(8),
          }}>
          <View style={styles.selectAmountCon}>
            <Text numberOfLines={1} style={styles.chooseAddMoney}>
              {`+ ₹`} {item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const mainView = () => {
    return (
      <>
        <View style={styles.addMoneyTopCon}>
          <View style={styles.inputAmountCon}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputAmountText}>{strings.INPUT_AMOUNT}</Text>
            </View>

            <View
              style={{
                height: moderateScaleVertical(35),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: moderateScale(3),
                borderBottomWidth: 0.5,
                borderBottomColor: colors.textGreyJ,
              }}>
              <Text style={styles.currencySymble}>
                {/* {currencies?.primary_currency?.symbol} */}
                {'₹'}
              </Text>
              <TextInput
                style={styles.addMoneyInputField}
                value={`${amount}`}
                onChangeText={_onChangeText('amount')}
                keyboardType={'numeric'}
                placeholder={strings.ENTER_AMOUNT}
                placeholderTextColor={colors.textGreyJ}
              />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={customAmount}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                ItemSeparatorComponent={(data, index) =>
                  index == data.length ? null : (
                    <View style={styles.cartItemLine}></View>
                  )
                }
                keyExtractor={(item, index) => String(index)}
                renderItem={_renderItem}
              />
            </View>
          </View>
        </View>
        <View />

        {/* botttom add money button */}
        <View style={styles.bottomButtonStyle}>
          <GradientButton
            containerStyle={{marginTop: moderateScaleVertical(40)}}
            onPress={_onTopUp}
            textStyle={{color: colors.black}}
            btnText={strings.ADD}
            colorsArray={[colors.themeColor, colors.themeColor]}
          />
        </View>
      </>
    );
  };

  const _onTopUp = () => {
    if (amount > 0) {
      if (seletedPaymentGateway.id === 10) {
        _onRazorPay();
      } else {
        showError(strings.PLEASE_SELECT_PAYMENT_METHOD);
      }
    } else {
      showError(strings.PLEASE_ENTER_VALID_AMOUNT);
    }
  };

  const errorMethod = error => {
    console.log(error);
    showError(error?.message || error?.error || error?.description);
  };

  const _onRazorPay = () => {
    var options = {
      description: 'Goody',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: seletedPaymentGateway?.api_key,
      amount: Number(amount) * 100,
      name: userData?.name,
      prefill: {
        email: 'test@gmail.com',
        contact: userData?.phone_number,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(res => {
        console.log(`Success for razor: `, res);
        if (res?.razorpay_payment_id) {
          const data = {};
          data['amount'] = amount;
          data['transaction_id'] = res?.razorpay_payment_id;
          actions
            .walletCredit(data, {
              client: clientInfo?.database_name,
            })
            .then(res => {
              console.log(res, 'response credit wallet');
              Alert.alert('', strings.PAYMENT_SUCCESS, [
                {
                  text: strings.OK,
                  onPress: () => console.log('Okay pressed'),
                },
              ]);
              navigation.navigate(navigationStrings.WALLET);
            })
            .catch(errorMethod);
        }
      })
      .catch(errorMethod);
  };

  const _renderPaymentOptions = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          updateState({
            seletedPaymentGateway: item,
          })
        }
        activeOpacity={0.7}
        style={{
          paddingHorizontal: moderateScale(5),
          paddingVertical: moderateScale(12),
          backgroundColor: colors.borderColorB,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={
            seletedPaymentGateway?.id === item.id
              ? imagePath.icRadioActive
              : imagePath.icRadio
          }
          style={{tintColor: seletedPaymentGateway?.id && colors.themeColor}}
        />
        <Text
          style={{
            fontFamily: fontFamily.regular,
            marginLeft: moderateScale(5),
          }}>
          {item?.title_lng ? item?.title_lng : item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer
      bgColor={colors.backgroundGrey}
      statusBarColor={colors.white}
      isLoadingB={isLoadingB}
      source={loaderOne}>
      <Header
        leftIcon={imagePath.backArrow}
        centerTitle={strings.ADD_MONEY}
        headerStyle={{backgroundColor: colors.white}}
        leftIconStyle={{tintColor: colors.themeColor}}
      />
      <View
        style={{
          height: 1,
          backgroundColor: colors.lightGreyBgColor,
          opacity: 0.26,
        }}
      />
      {mainView()}
      <View style={{marginHorizontal: moderateScale(15)}}>
        <Text
          style={{
            fontFamily: fontFamily.medium,
            fontSize: textScale(14),
            marginVertical: moderateScale(10),
          }}>
          {strings.PAYMENT_METHODS}
        </Text>
        <FlatList data={allPaymentOptions} renderItem={_renderPaymentOptions} />
      </View>
    </WrapperContainer>
  );
}
