import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import {moderateScale} from '../../styles/responsiveSize';

export default function Settings({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  console.log(userData, 'userData');
  const [state, setState] = useState({
    isLoading: false,
    allLanguages: [
      {
        value: 'English',
      },
      {
        value: 'Spanish',
      },
      {
        value: 'Arabic',
      },
    ],
  });

  const {isLoading, allLanguages} = state;
  const commonStyles = commonStylesFunc({fontFamily});

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
      <Header
        headerStyle={{backgroundColor: colors.white}}
        // hideRight={true}
        // onPressLeft={()=>navigation.goBack()}
        centerTitle={strings.SETTING}
      />
      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginVertical: moderateScale(20),
        }}>
      
      </View>
    </WrapperContainer>
  );
}
