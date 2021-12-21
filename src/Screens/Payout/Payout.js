import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import {
  height,
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
import moment from 'moment';
import {currencyNumberFormatter} from '../../utils/commonFunction';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validator from '../../utils/validations';
import {useFocusEffect} from '@react-navigation/native';

export default function AddMoney({navigation}) {
  const {userData} = useSelector(state => state?.auth);
  const {clientInfo} = useSelector(state => state?.initBoot);

  const [state, setState] = useState({
    isPayoutModal: false,
    isLoading: true,
    payoutAmount: '',
    payoutDetails: [],
    isRefreshing: false,
    selectedPayoutOption: {},
    beneficiaryName: '',
    beneficiaryAcNum: '',
    beneficiaryISFC: '',
    beneficiaryAddrs: '',
    pageNo: 1,
    limit: 5,
  });

  const styles = stylesFun();
  const {
    isPayoutModal,
    isLoading,
    payoutAmount,
    payoutDetails,
    isRefreshing,
    selectedPayoutOption,
    beneficiaryName,
    beneficiaryAcNum,
    beneficiaryISFC,
    beneficiaryAddrs,
    pageNo,
    limit,
  } = state;

  const updateState = data => setState(state => ({...state, ...data}));

  useFocusEffect(
    React.useCallback(() => {
      getPayoutDetails();
      getBankDetails();
    }, [userData?.id]),
  );

  useEffect(() => {
    if (isRefreshing) {
      getPayoutDetails();
    }
  }, [isRefreshing]);

  const getBankDetails = () => {
    actions
      .agentBankDetails(
        {},
        {
          client: clientInfo?.database_name,
        },
      )
      .then(res => {
        console.log(res, 'resFromServer >>> Bank Details');
        updateState({
          beneficiaryName: !!res?.data?.agent_bank_details
            ? res?.data?.agent_bank_details?.beneficiary_name
            : '',
          beneficiaryAcNum: !!res?.data?.agent_bank_details
            ? res?.data?.agent_bank_details?.beneficiary_account_number
            : '',
          beneficiaryISFC: !!res?.data?.agent_bank_details
            ? res?.data?.agent_bank_details?.beneficiary_ifsc
            : '',
          beneficiaryAddrs: !!res?.data?.agent_bank_details
            ? res?.data?.agent_bank_details?.beneficiary_address
            : '',
        });
      })
      .catch(errorMethod);
  };

  const getPayoutDetails = () => {
    actions
      .agentPayoutDetails(
        `?page=${pageNo}&limit=${limit}`,
        {},
        {
          client: clientInfo?.database_name,
        },
      )
      .then(res => {
        console.log(res, 'resFromServer');
        updateState({
          payoutDetails: res?.data,
          isLoading: false,
          isRefreshing: false,
        });
      })
      .catch(errorMethod);
  };

  const renderPayoutBox = (numberTxt = 0, descTitle = '') => (
    <View style={styles.payoutBlockSubView}>
      <Text style={styles.payoutNumbersTxt}>
        {' '}
        {userData?.client_preference?.currency?.symbol}
        {currencyNumberFormatter(Number(numberTxt).toFixed(2))}
      </Text>
      <Text style={styles.payoutTitlesTxt}>{descTitle}</Text>
    </View>
  );

  const isValidData = () => {
    const error = validator({
      payoutAmount: payoutAmount,
      selectedPayoutOption: selectedPayoutOption,
    });
    if (error) {
      alert(error);
      return;
    }
    return true;
  };

  const isValidBankData = () => {
    const error = validator({
      beneficiaryName: beneficiaryName,
      beneficiaryAcNum: beneficiaryAcNum,
      beneficiaryISFC: beneficiaryISFC,
      beneficiaryAddrs: beneficiaryAddrs,
    });
    if (error) {
      alert(error);
      return;
    }
    return true;
  };

  const _onContinuePayout = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    const data = {};
    if (selectedPayoutOption.id == 4) {
      const checkValid = isValidBankData();
      if (!checkValid) {
        return;
      }
      data['amount'] = payoutAmount;
      data['beneficiary_name'] = beneficiaryName;
      data['beneficiary_account_number'] = beneficiaryAcNum;
      data['beneficiary_ifsc'] = beneficiaryISFC;
      data['beneficiary_address'] = beneficiaryAddrs;
      data['payout_option_id'] = selectedPayoutOption?.id;
    } else {
      data['amount'] = payoutAmount;
      data['payout_option_id'] = selectedPayoutOption?.id;
    }

    actions
      .agentPayoutCreate(`/${userData?.id}`, data, {
        client: clientInfo?.database_name,
      })
      .then(res => {
        console.log(res, 'responseFromServer');
        updateState({isPayoutModal: false});
        getBankDetails();
        getPayoutDetails();
        showSuccess(res?.message, 2000);
      })
      .catch(errorMethod);
  };

  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isPayoutModal: false});
    setTimeout(() => {
      showError(error?.message || error?.error || error?.description, 2000);
    }, 500);
  };

  const renderPayoutDetails = ({item, index}) => {
    return (
      <View style={styles.mainViewPayoutDetail}>
        <View style={{flex: 0.2}}>
          <View
            style={[
              styles.circleView,
              {
                backgroundColor:
                  item?.status_id == '0'
                    ? colors.blueB
                    : item?.status_id == '1'
                    ? colors.green
                    : colors.redB,
              },
            ]}>
            <Text style={styles.messageInitial}>
              {item?.status_id == '0'
                ? 'P'
                : item?.status_id == '1'
                ? 'S'
                : 'F'}
            </Text>
          </View>
        </View>

        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text style={styles.message}>
            {strings.PAYOUT_REQUEST}{' '}
            {item?.status_id == '0'
              ? 'Pending'
              : item?.status_id == '1'
              ? 'Created'
              : 'Faild'}
          </Text>
          <Text numberOfLines={1} style={styles.dateTime}>
            {moment(item?.created_at).format('lll')}
          </Text>
        </View>

        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.amount,
              {
                color: colors.black,
              },
            ]}>
            {userData?.client_preference?.currency?.symbol}{' '}
            {currencyNumberFormatter(Number(item?.amount).toFixed(2))}
          </Text>
          <View
            style={{
              ...styles.statusView,
              backgroundColor:
                item?.status_id == '0'
                  ? colors.blueB
                  : item?.status_id == '1'
                  ? colors.green
                  : colors.redB,
            }}>
            <Text
              style={[
                styles.amount,
                {
                  color: colors.white,
                },
              ]}>
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const handleRefresh = () => {
    updateState({pageNo: 1, isRefreshing: true});
  };

  const getBankForm = () => {
    return (
      <View>
        <TextInputWithlabel
          label={strings.BENEFICIARY_NAME}
          value={beneficiaryName}
          mainStyle={{
            marginTop: moderateScale(10),
          }}
          onChangeText={text => updateState({beneficiaryName: text})}
          editable
        />

        <TextInputWithlabel
          label={strings.BENEFICIARY_AC_NUMBER}
          value={beneficiaryAcNum}
          mainStyle={{
            marginTop: moderateScale(5),
          }}
          keyboardType="number-pad"
          onChangeText={text => updateState({beneficiaryAcNum: text})}
          editable
        />

        <TextInputWithlabel
          label={strings.BENEFICIARY_IFSC}
          value={beneficiaryISFC}
          mainStyle={{
            marginTop: moderateScale(5),
          }}
          onChangeText={text => updateState({beneficiaryISFC: text})}
          editable
        />
        <TextInputWithlabel
          label={strings.BENEFICIARY_ADDRESS}
          value={beneficiaryAddrs}
          mainStyle={{
            marginTop: moderateScale(5),
          }}
          onChangeText={text => updateState({beneficiaryAddrs: text})}
          editable
        />
      </View>
    );
  };

  const onEndReached = () => {
    // alert();
  };

  return (
    <WrapperContainer
      bgColor={colors.white}
      statusBarColor={colors.white}
      isLoading={isLoading}
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
        {renderPayoutBox(payoutDetails?.past_payout_value, strings.PAST_PAYOUT)}
        {renderPayoutBox(
          payoutDetails?.available_funds,
          strings.AVAILABLE_FUNDS,
        )}
      </View>

      <View style={{flex: 1, marginHorizontal: moderateScale(15)}}>
        <View
          style={{
            marginVertical: moderateScale(10),
          }}>
          <Text style={styles.transactionHistory}>
            {strings.TRANSACTIONHISTORY}
          </Text>
        </View>
        <FlatList
          data={payoutDetails?.agent_payout_list?.data}
          extraData={payoutDetails?.agent_payout_list?.data}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={renderPayoutDetails}
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            marginVertical: moderateScaleVertical(10),
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.themeColor}
            />
          }
          onEndReached={onEndReached}
          // onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <View style={{height: moderateScaleVertical(65)}} />
          )}
        />
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
        status
        style={{margin: 0, justifyContent: 'flex-end'}}
        onBackdropPress={() => updateState({isPayoutModal: false})}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(10),
            borderRadius: moderateScale(10),
            maxHeight: height - moderateScale(100),
          }}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontFamily: fontFamily.bold,
                fontSize: textScale(18),
              }}>
              {strings.PAYOUT}
            </Text>
            <TextInputWithlabel
              label={strings.AMOUNT}
              value={payoutAmount}
              mainStyle={{
                marginTop: moderateScale(10),
              }}
              keyboardType="number-pad"
              onChangeText={text => updateState({payoutAmount: text})}
              editable
            />

            {!isLoading && !!payoutDetails?.available_funds ? (
              <TextInputWithlabel
                label={strings.AVAILABLE_FUNDS}
                placeholder={String(payoutDetails?.available_funds.toFixed(2))}
                mainStyle={{
                  marginTop: moderateScale(5),
                }}
              />
            ) : (
              <></>
            )}
            {!isLoading &&
              !!payoutDetails.payout_options &&
              payoutDetails.payout_options.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => updateState({selectedPayoutOption: item})}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: moderateScale(15),
                    }}>
                    <Image
                      source={imagePath.icRadio}
                      style={{
                        tintColor:
                          selectedPayoutOption.id == item.id
                            ? colors.blueB
                            : colors.blackB,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: fontFamily.regular,
                        fontSize: textScale(13),
                        marginLeft: moderateScale(10),
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}

            {selectedPayoutOption.id == 4 ? getBankForm() : <></>}

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: moderateScale(35),
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
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </WrapperContainer>
  );
}
