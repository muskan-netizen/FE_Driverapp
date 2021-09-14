import React, {useState} from 'react';
import {View} from 'react-native';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
// import store from '../../redux/store';
import colors from '../../styles/colors';

export default function MyProfile({route, navigation}) {
  const [state, setState] = useState({
    isLoading: false,
  });

  const {isLoading} = state;
  const updateState = data => setState(state => ({...state, ...data}));

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoadingB={isLoading}
      source={loaderOne}>
      <View style={{flex: 1}}></View>
    </WrapperContainer>
  );
}
