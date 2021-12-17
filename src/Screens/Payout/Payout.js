import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import stylesFun from './styles';
import Modal from 'react-native-modal';
import fontFamily from '../../styles/fontFamily';
import TextInputWithlabel from '../../Components/TextInputWithlabel';
import actions from '../../redux/actions';
import {useSelector} from 'react-redux';
import {showError, showSuccess} from '../../utils/helperFunctions';

export default function AddMoney({navigation}) {
  const {userData} = useSelector(state => state?.auth);
  const {clientInfo} = useSelector(state => state?.initBoot);

  const [state, setState] = useState({
    isPayoutModal: false,
    isLoading: false,
    payoutAmount: 0,
  });

  const styles = stylesFun();
  const {isPayoutModal, isLoading, payoutAmount} = state;

  const updateState = data => setState(state => ({...state, ...data}));

  const renderPayoutBox = (numberTxt = 0, descTitle = '') => (
    <View style={styles.payoutBlockSubView}>
      <Text style={styles.payoutNumbersTxt}>{numberTxt}</Text>
      <Text style={styles.payoutTitlesTxt}>{descTitle}</Text>
    </View>
  );

  const _onContinuePayout = () => {
    if (payoutAmount <= 0) {
      alert(strings.PLEASE_ENTER_VALID_AMOUNT);
      return;
    }

    actions
      .agentPayout(
        `/${userData?.id}`,
        {
          amount: payoutAmount,
        },
        {
          client: clientInfo?.database_name,
        },
      )
      .then(res => {
        console.log(res, 'responseFromServer');
        updateState({isPayoutModal: false});
        showSuccess(res?.message, 2000);
      })
      .catch(errorMethod);
  };

  const errorMethod = error => {
    console.log(error, 'inErrorMethod');
    updateState({isPayoutModal: false});
    showError(error?.message || error?.error || error?.description, 2000);
  };

  return (
    <WrapperContainer
      bgColor={colors.white}
      statusBarColor={colors.white}
      isLoadingB={isLoading}
      source={loaderOne}>
      <Header
        leftIcon={imagePath.backArrow}
        centerTitle={strings.PAYOUT}
        headerStyle={{
          backgroundColor: colors.white,
          paddingHorizontal: moderateScale(10),
        }}
        leftIconStyle={{tintColor: colors.themeColor}}
      />
      <View
        style={{
          height: 1,
          backgroundColor: colors.lightGreyBgColor,
          opacity: 0.26,
        }}
      />
      <View style={styles.payoutBlockView}>
        {renderPayoutBox(0, strings.LIFE_TIME_ORDER)}
        {renderPayoutBox(0, strings.PAST_PAYOUT)}
        {renderPayoutBox(0, strings.AVAILABLE_FUNDS)}
      </View>
      <View style={styles.bottomButtonStyle}>
        <GradientButton
          containerStyle={{marginTop: moderateScaleVertical(40)}}
          onPress={() => updateState({isPayoutModal: true})}
          textStyle={{color: colors.black}}
          btnText={strings.PAYOUT}
          colorsArray={[colors.themeColor, colors.themeColor]}
        />
      </View>
      <Modal
        isVisible={isPayoutModal}
        onBackdropPress={() => updateState({isPayoutModal: false})}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(10),
            borderRadius: moderateScale(5),
          }}>
          <Text
            style={{
              fontFamily: fontFamily.bold,
              fontSize: textScale(18),
              marginTop: moderateScale(20),
            }}>
            {strings.PAYOUT}
          </Text>
          <TextInputWithlabel
            label={strings.AMOUNT}
            mainStyle={{
              marginTop: moderateScale(30),
            }}
            keyboardType="number-pad"
            onChangeText={text => updateState({payoutAmount: text})}
            editable
          />

          <TextInputWithlabel
            label={strings.AVAILABLE_FUNDS}
            mainStyle={{
              marginTop: moderateScale(15),
            }}
          />
          <TouchableOpacity
            // onPress={() => alert()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(15),
            }}>
            <Image source={imagePath.icRadio} />
            <Text
              style={{
                fontFamily: fontFamily.regular,
                fontSize: textScale(13),
                marginLeft: moderateScale(10),
              }}>
              {strings.OFF_THE_PLATFORM}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginVertical: moderateScale(30),
            }}>
            <GradientButton
              containerStyle={{width: '45%'}}
              onPress={() => updateState({isPayoutModal: false})}
              textStyle={{color: colors.black}}
              btnText={strings.CANCEL}
              colorsArray={[colors.themeColor, colors.themeColor]}
            />
            <GradientButton
              containerStyle={{width: '45%'}}
              onPress={_onContinuePayout}
              textStyle={{color: colors.black}}
              btnText={strings.CONTINUE}
              colorsArray={[colors.themeColor, colors.themeColor]}
            />
          </View>
        </View>
      </Modal>
    </WrapperContainer>
  );
}
