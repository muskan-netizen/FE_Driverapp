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
    allTaskInHistory: [
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 2,
        message: 'Jio mobility',
        dateTime: '31 Oct, 17:16',
        amount: '101.00',
        status: -1,
      },
      {
        id: 1,
        message: 'BillDesk Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 1,
        message: 'Sandeep Das',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 1,
        message: 'Punjab Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 2,
        message: 'Jio mobility',
        dateTime: '31 Oct, 17:16',
        amount: '101.00',
        status: -1,
      },
      {
        id: 1,
        message: 'BillDesk Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 1,
        message: 'Sandeep Das',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
      {
        id: 1,
        message: 'UTC1231 Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: -1,
      },
      {
        id: 1,
        message: 'Punjab Payment done',
        dateTime: '31 Oct, 17:16',
        amount: '651.80',
        status: 1,
      },
    ],
    isRefreshing: false,
    pageNo: 1,
    isModalVisibleForDateTime: false,
    selectedDate: null,
    savedDate: null,
  });

  const {
    isLoading,
    totalCashCollected,
    allTaskInHistory,
    selectedDate,
    savedDate,
    isRefreshing,
    pageNo,
    isModalVisibleForDateTime,
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
    {
      (isLoading || isRefreshing) && getAllTaskHistory();
    }
  }, [isLoading, isRefreshing]);

  const getAllTaskHistory = () => {
    // let url = '';
    // if (selectedDate) {
    //   url = `?from_date=${moment(selectedDate).format(
    //     'YYYY-MM-DD',
    //   )}&to_date=${moment(selectedDate).format('YYYY-MM-DD')}`;
    // } else {
    //   url = `?from_date=&to_date=`;
    // }
    // console.log(url, 'url');
    // actions
    //   .getListOfTaskHistory(url, {}, {client: clientInfo?.database_name})
    //   .then(res => {
    //     console.log(res, 'getAllTaskHistory>>>getAllTaskHistory data');
    //     updateState({
    //       isLoading: false,
    //       isRefreshing: false,
    //       totalCashCollected: res?.data?.totalCashCollected,
    //       allTaskInHistory: res?.data?.tasks,
    //     });
    //   })
    //   .catch(errorMethod);
    updateState({
      isLoading: false,
      isRefreshing: false,
    });
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
          flexDirection: 'row',
          marginBottom: moderateScale(15),
          marginHorizontal: moderateScale(10),
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
              {item.message.slice(0, 1)}
            </Text>
          </View>
        </View>

        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <Text numberOfLines={2} style={styles.message}>
            {item.message}
          </Text>
          <Text numberOfLines={1} style={styles.dateTime}>
            {item.dateTime}
          </Text>
        </View>

        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Text
            style={[
              styles.amount,
              {color: item?.status > 0 ? colors.green : colors.black},
            ]}>
            {`${item?.status > 0 ? '+' : '-'}${item.amount}`}
          </Text>
        </View>
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

  const revenueView = () => {
    return (
      <LinearGradient
        style={styles.gradientStyle}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#0892d0', '#0892d0', colors?.themeColor]}>
        <Text style={styles.totalRevenue}>{strings.TOTALREVNUE}</Text>
        <Text style={styles.amountText}>{'0.00'}</Text>
      </LinearGradient>
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
      <View style={{...commonStyles.headerTopLine}} />

      <View style={styles.cashCollectionContainer}>
        <View style={styles.cashTextView}>
          <Text style={styles.cashCollected}>{`${
            strings.LIFETIMEEARNING
          } :- ${totalCashCollected.toFixed(2)}`}</Text>
        </View>
      </View>

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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.themeColor}
            />
          }
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
