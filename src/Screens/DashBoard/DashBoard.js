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

  //get all tasks
  const getTasks = () => {
    actions
      .getListOfTasks(
        `?all=${selectedOption}`,
        {},
        {client: clientInfo?.database_name},
      )
      .then(res => {
        if (selectedOption) {
          updateState({allTasks: res?.data});
        } else {
          updateState({todaysTasks: res?.data});
        }
        console.log(res, 'res>res');
      })
      .catch(errorMethod);
  };
  //Error handling in api
  const errorMethod = error => {
    updateState({isLoading: false});
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
    updateState({selectedOption: value});
  };
  const customCenter = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingHorizontal: 10}}>
          <Image source={imagePath.locationOff} />
        </View>
        <Switch
          trackColor={{false: '#767577', true: colors.themeColor}}
          thumbColor={colors.white}
          ios_backgroundColor="#3e3e3e"
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
    return <TaskListCard data={item} onPress={_onPressTask} />;
  };

  //Pull to refresh
  const handleRefresh = () => {
    updateState({pageNo: 1, isRefreshing: true});
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoadingB={isLoading}
      source={loaderOne}>
      <Header
        centerTitle={'Hello'}
        leftIcon={imagePath.menu}
        // hideRight={true}
        customCenter={() => customCenter()}
        rightIcon={imagePath.map}
        onPressRight={() =>
          navigation.navigate(navigationStrings.SEARCHPRODUCTOVENDOR)
        }
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScaleVertical(20),
        }}>
        <SwitchSelectorComponent
          options={options}
          initial={initial}
          onPress={value => updateContent(value)}
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={allTasks}
          renderItem={renderTaskList}
          keyExtractor={(item, index) => String(index)}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
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
          // ListEmptyComponent={<EmptyListLoader />}
        />
      </View>
    </WrapperContainer>
  );
}
