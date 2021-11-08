import {debounce} from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header, {stylesFunc} from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import TaskListCard from '../../Components/TaskListCard';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import {
  colorArray,
  transportationArray,
} from '../../utils/constants/ConstantValues';
import {showError} from '../../utils/helperFunctions';
import DatePicker from 'react-native-date-picker';
import DatePickerModal from '../../Components/DatePickerModal';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
import navigationStrings from '../../navigation/navigationStrings';
import stylesFunction from './styles';
export default function Wallet({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  const [state, setState] = useState({
    isLoading: true,
    totalCashCollected: 0,
    allTaskInHistory: [],

    isRefreshing: false,
    pageNo: 1,
    isModalVisibleForDateTime: false,
    selectedDate: null,
    savedDate: null,
    lifetimeAmount: 0.0,
    currentAmount: 0.0,
    limit: 50,
  });

  const {
    lifetimeAmount,
    currentAmount,
    isLoading,
    totalCashCollected,
    allTaskInHistory,
    selectedDate,
    savedDate,
    isRefreshing,
    pageNo,
    isModalVisibleForDateTime,
    limit,
  } = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  const defaultLanguagae = useSelector(
    state => state?.initBoot?.defaultLanguage,
  );

  const styles = stylesFunction({defaultLanguagae});

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  useEffect(() => {
    getWalletDataOfDriver();
  }, [isLoading]);

  const getWalletDataOfDriver = () => {
    actions
      .getWalletData(
        // `/${userData?.id}`,
        `/5?page=${pageNo}&limit=${limit}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        console.log(res, 'getWalletDataOfDriver>>>getWalletDataOfDriver data');
        updateState({
          lifetimeAmount: res?.driver_cost,
          currentAmount: Number(res?.final_balance),
          allTaskInHistory:
            pageNo == 1
              ? res?.payments.data
              : [...allTaskInHistory, ...res?.payments?.data],
          isLoading: false,
          isRefreshing: false,
        });
      })
      .catch(errorMethod);
  };

  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  //pagination of data
  const onEndReached = ({distanceFromEnd}) => {
    updateState({pageNo: pageNo + 1});
  };

  const onEndReachedDelayed = debounce(onEndReached, 1000, {
    leading: true,
    trailing: false,
  });

  const _onPressTask = item => {
    moveToNewScreen(navigationStrings.TASKDETAIL, {
      item: item,
      fromHistory: true,
    })();
  };

  const getDynamicUpdateOnValues = data => {
    var colorData = colorArray;
    return colorData[allTaskInHistory.indexOf(data) % colorData.length];
  };
  const renderTaskList = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: colors.lightGreyBg3,
          marginBottom: moderateScale(15),
          marginHorizontal: moderateScale(10),
          borderRadius: moderateScale(10),
          padding: moderateScale(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.2}}>
            <View
              style={[
                styles.circleView,
                {
                  backgroundColor: getDynamicUpdateOnValues(item),
                },
              ]}>
              <Text style={styles.messageInitial}>
                {item?.task_type_id ? `T` : item?.cr ? `C` : `D`}
              </Text>
            </View>
          </View>

          <View style={{flex: 0.6, justifyContent: 'center'}}>
            <Text numberOfLines={2} style={styles.message}>
              {item?.cr ? `Payment Credited` : `Payment Debited`}
            </Text>
            <Text numberOfLines={1} style={styles.dateTime}>
              {/* {item.dateTime} */}
              {moment(item?.created_at).format('lll')}
            </Text>
          </View>

          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={[
                styles.amount,
                {
                  color:
                    item?.status > 0
                      ? colors.green
                      : item?.task_type_id
                      ? colors.lightGreyBg2
                      : colors.black,
                },
              ]}>
              {item?.task_type_id
                ? `Task# ${item?.id}`
                : item?.cr
                ? `+ ${item?.cr}`
                : `- ${item?.dr}`}
            </Text>
          </View>
        </View>

        {!!item?.task_type_id && (
          <View style={styles.moneyViewTransaction}>
            <View
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.currency}>{'+150.00'}</Text>
              <Text style={styles.earningBottomTextLable}>
                {strings.CASHCOLLECTEDCAPS}
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.currency}>{'+50.00'}</Text>
              <Text style={styles.earningBottomTextLable}>
                {strings.ORDEREARNING}
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.amountToReturn}>{'-100.00'}</Text>
              <Text style={styles.earningBottomTextLable}>{strings.NET}</Text>
            </View>
          </View>
        )}

        {/* address view */}
        {!!item?.task_type_id && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={imagePath?.location} />
            <Text
              style={[styles.address, {marginLeft: moderateScale(10)}]}
              numberOfLines={2}>
              {item?.location ? item?.location?.address : 'Chandigarh, India'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({pageNo: 1, isRefreshing: true});
  };

  const onDateChange = value => {
    console.log(value, 'value>value>value');
    updateState({
      savedDate: value,
    });
  };

  const onSelectDate = () => {
    updateState({isModalVisibleForDateTime: false});
    if (savedDate) {
      updateState({
        selectedDate: savedDate,
        isLoading: true,
      });
    } else {
      updateState({
        selectedDate: new Date(),
        savedDate: new Date(),
        isLoading: true,
      });
    }
  };

  /*****TOP HEADER REVENUE VIEW***** */
  const revenueView = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <LinearGradient
          style={[styles.gradientStyle, {marginRight: moderateScale(20)}]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors?.orangeC, colors?.orangeC, colors?.orangeC]}>
          <Image
            source={imagePath.lifeTimeEarn}
            style={{marginBottom: moderateScale(10)}}
          />
          <Text style={styles.totalRevenue}>{strings.LIFETIMEEARNING}</Text>
          <Text style={styles.amountText}>{currentAmount.toFixed(2)}</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.gradientStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors?.themeColor, colors?.themeColor, colors?.themeColor]}>
          <Image
            source={imagePath.currentBalance}
            style={{marginBottom: moderateScale(10)}}
          />
          <Text style={styles.totalRevenue}>{strings.TOTALREVNUE}</Text>
          <Text style={styles.amountText}>{currentAmount.toFixed(2)}</Text>
        </LinearGradient>
      </View>
    );
  };
  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoading={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIconStyle={{tintColor: colors.themeColor}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={strings.WALLET}
      />
      {/* <View style={{...commonStyles.headerTopLine}} /> */}

      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginVertical: moderateScale(10),
        }}>
        {revenueView()}
      </View>
      <View
        style={{
          marginHorizontal: moderateScale(10),
          marginVertical: moderateScale(10),
        }}>
        <Text style={styles.transactionHistory}>
          {strings.TRANSACTIONHISTORY}
        </Text>
      </View>
      <View style={{backgroundColor: colors.backGround, flex: 1}}>
        <FlatList
          data={allTaskInHistory}
          extraData={allTaskInHistory}
          renderItem={renderTaskList}
          keyExtractor={(item, index) => String(index)}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            marginVertical: moderateScaleVertical(10),
          }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     onRefresh={handleRefresh}
          //     tintColor={colors.themeColor}
          //   />
          // }
          onEndReached={onEndReachedDelayed}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <View style={{height: moderateScaleVertical(65)}} />
          )}
        />
      </View>
      <DatePickerModal
        isVisible={isModalVisibleForDateTime}
        date={savedDate}
        onclose={() => updateState({isModalVisibleForDateTime: false})}
        onSelectDate={() => onSelectDate()}
        onDateChange={value => onDateChange(value)}
      />
    </WrapperContainer>
  );
}
