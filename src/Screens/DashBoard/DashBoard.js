import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {cloneDeep, debounce} from 'lodash';
import {Image, Switch, View, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import SwitchSelectorComponent from '../../Components/SwitchSelector';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScaleVertical} from '../../styles/responsiveSize';
import TaskListCard from '../../Components/TaskListCard';
import {showError} from '../../utils/helperFunctions';
import ListEmptyComponent from '../../Components/ListEmptyComponent';
import strings from '../../constants/lang';
export default function DashBoard({route, navigation}) {
  const [state, setState] = useState({
    isLoading: false,
    isEnabled: true,
    options: [
      {label: "Today's Tasks", value: 0, testID: '1'},
      {label: 'All Tasks', value: 1, testID: '2'},
    ],
    initial: 0,
    selectedOption: 0,
    todaysTasks: [],
    allTasks: [],
    isRefreshing: false,
    pageNo: 1,
  });
  const {
    todaysTasks,
    allTasks,
    initial,
    options,
    isEnabled,
    isLoading,
    selectedOption,
    isRefreshing,
    pageNo,
  } = state;
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  useEffect(() => {
    getTasks();
  }, [selectedOption]);

  useEffect(() => {
    {
      (isLoading || isRefreshing) && getTasks();
    }
  }, [isLoading, isRefreshing]);

  //get all tasks
  const getTasks = () => {
    actions
      .getListOfTasks(
        `?all=${selectedOption}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        // updateState({isRefreshing: false});
        if (selectedOption) {
          updateState({
            allTasks: res?.data,
            isRefreshing: false,
            isLoading: false,
          });
        } else {
          updateState({
            todaysTasks: res?.data,
            isRefreshing: false,
            isLoading: false,
          });
        }
        console.log(res, 'res>res');
      })
      .catch(errorMethod);
  };
  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false, isRefreshing: false, isLoading: false});
    showError(error?.message || error?.error);
  };

  const updateState = data => setState(state => ({...state, ...data}));

  const commonStyles = commonStylesFunc({fontFamily});

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };
  const toggleSwitch = () => {
    updateState({isEnabled: !isEnabled});
  };
  const updateContent = value => {
    updateState({selectedOption: value, isLoading: true});
  };
  const customCenter = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingHorizontal: 10}}>
          <Image source={imagePath.locationOff} />
        </View>
        <Switch
          trackColor={{false: colors.backGround, true: colors.themeColor}}
          thumbColor={colors.white}
          // ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <View style={{paddingHorizontal: 10}}>
          <Image source={imagePath.locationOn} />
        </View>
      </View>
    );
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
        allTasks={selectedOption ? allTasks : todaysTasks}
        onPress={_onPressTask}
      />
    );
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({pageNo: 1, isRefreshing: true});
  };

  const homeMainView = () => {
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: moderateScaleVertical(20),
            paddingBottom: moderateScaleVertical(20),
            borderBottomWidth: moderateScaleVertical(1),
            borderBottomColor: colors.lightGreyBg,
          }}>
          <SwitchSelectorComponent
            options={options}
            initial={initial}
            onPress={value => updateContent(value)}
          />
        </View>

        <View style={{flex: 1}}>
          <FlatList
            data={selectedOption ? allTasks : todaysTasks}
            renderItem={renderTaskList}
            keyExtractor={(item, index) => String(index)}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              backgroundColor: !!(selectedOption == 1 && !allTasks.length)
                ? colors.backGround
                : !!(selectedOption == 0 && !todaysTasks.length)
                ? colors.backGround
                : colors.white,
            }}
            contentContainerStyle={{
              flexGrow: 1,
              marginVertical: moderateScaleVertical(20),
            }}
            refreshing={isRefreshing}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                // tintColor={colors.primary_color}
              />
            }
            onEndReached={onEndReachedDelayed}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              <View style={{height: moderateScaleVertical(65)}} />
            )}
            ListEmptyComponent={
              <ListEmptyComponent
                isLoading={isLoading}
                message={strings.NOTASK}
                subMessage={strings.NOTASKASSIGNED}
                containerStyle={{backgroundColor: colors.backGround}}
              />
            }
          />
        </View>
      </>
    );
  };

  const offDutyView = () => {
    return (
      <>
        <ListEmptyComponent
          isLoading={isLoading}
          message={strings.OFFDUTY}
          subMessage={strings.OFFDUTYMESSAGE}
          containerStyle={{backgroundColor: colors.backGround}}
          image={imagePath?.offDuty}
        />
      </>
    );
  };
  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.backGround}
      isLoading={isLoading}
      source={loaderOne}>
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIcon={imagePath.menu}
        onPressLeft={() => navigation.toggleDrawer()}
        // hideRight={true}
        customCenter={() => customCenter()}
        rightIcon={imagePath.map}
        onPressRight={() => {
          // navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
        }}
      />
      <View style={{...commonStyles.headerTopLine}} />

      {isEnabled ? homeMainView() : offDutyView()}
    </WrapperContainer>
  );
}
