import {debounce} from 'lodash';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, RefreshControl, FlatList} from 'react-native';
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
} from '../../styles/responsiveSize';
import {transportationArray} from '../../utils/constants/ConstantValues';
import {showError} from '../../utils/helperFunctions';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import DatePickerModal from '../../Components/DatePickerModal';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';
export default function TaskHistory({route, navigation}) {
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
    let url = '';
    if (selectedDate) {
      url = `?from_date=${moment(selectedDate).format(
        'YYYY-MM-DD',
      )}&to_date=${moment(selectedDate).format('YYYY-MM-DD')}`;
    } else {
      url = `?from_date=&to_date=`;
    }
    console.log(url, 'url');
    actions
      .getListOfTaskHistory(url, {}, {client: clientInfo?.database_name})
      .then(res => {
        console.log(res, 'getAllTaskHistory>>>getAllTaskHistory data');
        updateState({
          isLoading: false,
          isRefreshing: false,
          totalCashCollected: res?.data?.totalCashCollected,
          allTaskInHistory: res?.data?.tasks,
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

  const _onPressTask = () => {
    console.log('Here it is');
  };
  const renderTaskList = ({item, index}) => {
    return (
      <TaskListCard
        data={item}
        index={index}
        allTasks={allTaskInHistory}
        showCurrency={true}
        onPress={_onPressTask}
      />
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
    }else{
      updateState({
        selectedDate: new Date(),
        savedDate:new Date(),
        isLoading: true,
      });
    }
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
        centerTitle={strings.TASKHISTORY}
      />
      <View style={{...commonStyles.headerTopLine}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: colors.white,
        }}>
        <View style={{flexDirection: 'row', flex: 0.5, alignItems: 'center'}}>
          <Text style={styles.cashCollected}>{`${
            strings.CASHCOLLECTED
          } :- ${totalCashCollected.toFixed(2)}`}</Text>
        </View>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              updateState({
                selectedDate: null,
                savedDate:null,
                isLoading: true,
              })
            }
            style={styles.viewStyle}>
            <Text style={styles.clear}>{strings.CLEAR}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateState({isModalVisibleForDateTime: true})}
            style={{
              justifyContent: 'center',
              marginHorizontal: moderateScale(10),
            }}>
            <Text style={styles.selectedDate}>
              {selectedDate
                ? moment(selectedDate).format('DD-MM-YYYY')
                : strings.SELECTADATE}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateState({isModalVisibleForDateTime: true})}
            style={{justifyContent: 'center'}}>
            <Image source={imagePath.taskHistory} />
          </TouchableOpacity>
        </View>
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
          }}
          contentContainerStyle={{
            flexGrow: 1,
            marginVertical: moderateScaleVertical(20),
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
        onclose={()=>updateState({isModalVisibleForDateTime:false})}
        onSelectDate={() => onSelectDate()}
        onDateChange={value => onDateChange(value)}
      />
    </WrapperContainer>
  );
}
