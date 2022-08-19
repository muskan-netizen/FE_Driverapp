import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
// import store from '../../redux/store';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import fontFamily from '../../styles/fontFamily';
import styles from './styles';
import SignatureCapture from 'react-native-signature-capture';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import navigationStrings from '../../navigation/navigationStrings';
import {QRScannerView} from 'react-native-qrcode-scanner-view';

var ACTION_TIMER = 1500;
var COLORS = ['#8FEE90', '#27A468'];
var _value = 0;
export default function Scanner({route, navigation}) {
  const userData = useSelector(state => state?.auth?.userData);
  let params = route?.params?.data;
  console.log(params, 'params>>>');
  const [state, setState] = useState({
    isLoading: false,
  });

  const {isLoading} = state;
  const commonStyles = commonStylesFunc({fontFamily});
  const updateState = data => setState(state => ({...state, ...data}));
  const clientInfo = useSelector(state => state?.initBoot?.clientInfo);

  //Naviagtion to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {data});
  };

  const capture = () => {};
  const barcodeReceived = event => {
    console.log(event,"event>event>event");
    console.log('Type: ' + event.type + '\nData: ' + event.data);
    if (event && event?.data) {
      if (params && params?.updateBarcodeScan) {
        params?.updateBarcodeScan(event);
        updateState({isLoading: false});
        navigation.goBack();
      } else {
        updateState({isLoading: false});
      }
    }
  };
  const camRef = useRef();

  const renderTitleBar = () => {
    return (
      <Header
        headerStyle={{backgroundColor: colors.white}}
        leftIconStyle={{tintColor: colors.themeColor}}
        leftIcon={imagePath.backArrow}
        centerTitle={strings.SCANBARCODE}
        customRight={() => (
          <TouchableOpacity>
            <Text style={styles.clear}>{strings.CLEAR}</Text>
            {/* <Image source={}/> */}
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <WrapperContainer
      statusBarColor={colors.white}
      bgColor={colors.white}
      isLoading={isLoading}
      source={loaderOne}>
      <View style={{...commonStyles.headerTopLine}} />

      <View style={{flex: 1}}>
        <QRScannerView
          // ref={camRef}
          torchOn={true}
          renderHeaderView={renderTitleBar}
          onScanResult={barcodeReceived}
          //   renderHeaderView={this.renderTitleBar}
          renderFooterView={() => (
            <View style={{paddingVertical: moderateScale(20)}}>
              <ButtonComponent buttonTitle={strings.DONE} onPress={capture} />
            </View>
          )}
          scanBarAnimateReverse={true}
          hintText={'Scan barcode to continue'}
        />
      </View>

      {/* <View style={{flex: 1}}>
        
        <View style={{flex: 0.2,paddingVertical:moderateScale(20)}}>
          <ButtonComponent buttonTitle={strings.DONE} onPress={capture} />
        </View>
      </View> */}
    </WrapperContainer>
  );
}
