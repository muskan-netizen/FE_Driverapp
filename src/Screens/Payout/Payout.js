import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import stylesFun from './styles';

export default function AddMoney({navigation}) {
  const [state, setState] = useState({
    isLoadingB: false,
  });

  const styles = stylesFun();
  const {isLoadingB} = state;

  const updateState = data => setState(state => ({...state, ...data}));

  return (
    <WrapperContainer
      bgColor={colors.white}
      statusBarColor={colors.white}
      isLoadingB={isLoadingB}
      source={loaderOne}>
      <Header
        leftIcon={imagePath.backArrow}
        centerTitle={strings.PAYOUT}
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
      <View style={styles.payoutBlockView}>
        <View style={styles.payoutBlockSubView}>
          <Text style={styles.payoutNumbersTxt}>0</Text>
          <Text style={styles.payoutTitlesTxt}>{strings.LIFE_TIME_ORDER}</Text>
        </View>
        <View style={styles.payoutBlockSubView}>
          <Text style={styles.payoutNumbersTxt}>0</Text>
          <Text style={styles.payoutTitlesTxt}>{strings.PAST_PAYOUT}</Text>
        </View>
        <View style={styles.payoutBlockSubView}>
          <Text style={styles.payoutNumbersTxt}>0</Text>
          <Text style={styles.payoutTitlesTxt}>{strings.AVAILABLE_FUNDS}</Text>
        </View>
      </View>
    </WrapperContainer>
  );
}
