import React, {useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import {loaderOne} from '../../Components/Loaders/AnimatedLoaderFiles';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';
import stylesFun from './styles';

export default function AddMoney({navigation}) {
  const [state, setState] = useState({
    customAmount: [
      {id: 0, amount: 300},
      {id: 1, amount: 5000},
      {id: 2, amount: 4500},
    ],
    isLoadingB: false,
    amount: '',
  });

  const styles = stylesFun();
  const {amount, customAmount, isLoadingB} = state;

  const updateState = data => setState(state => ({...state, ...data}));

  const _onChangeText = key => val => {
    updateState({[key]: val});
  };

  const chooseAmount = item => {
    let addedAmount = item.amount;
    updateState({amount: addedAmount});
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => chooseAmount(item)}>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            paddingVertical: moderateScaleVertical(8),
          }}>
          <View style={styles.selectAmountCon}>
            <Text numberOfLines={1} style={styles.chooseAddMoney}>
              {`+ $`} {item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const mainView = () => {
    return (
      <>
        <View style={styles.addMoneyTopCon}>
          <View style={styles.inputAmountCon}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputAmountText}>{strings.INPUT_AMOUNT}</Text>
            </View>

            <View
              style={{
                height: moderateScaleVertical(35),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: moderateScale(3),
                borderBottomWidth: 0.5,
                borderBottomColor: colors.textGreyJ,
              }}>
              <Text style={styles.currencySymble}>
                {/* {currencies?.primary_currency?.symbol} */}
                {'$'}
              </Text>
              <TextInput
                style={styles.addMoneyInputField}
                value={`${amount}`}
                onChangeText={_onChangeText('amount')}
                keyboardType={'numeric'}
                placeholder={strings.ENTER_AMOUNT}
                placeholderTextColor={colors.textGreyJ}
              />
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={customAmount}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                ItemSeparatorComponent={(data, index) =>
                  index == data.length ? null : (
                    <View style={styles.cartItemLine}></View>
                  )
                }
                keyExtractor={(item, index) => String(index)}
                renderItem={_renderItem}
              />
            </View>
          </View>
        </View>
        <View />

        {/* botttom add money button */}
        <View style={styles.bottomButtonStyle}>
          <GradientButton
            containerStyle={{marginTop: moderateScaleVertical(40)}}
            // onPress={() => {
            //   _onLogin();
            // }}
            textStyle={{color: colors.black}}
            btnText={strings.ADD}
            colorsArray={[colors.themeColor, colors.themeColor]}
          />
        </View>
      </>
    );
  };
  return (
    <WrapperContainer
      bgColor={colors.backgroundGrey}
      statusBarColor={colors.white}
      isLoadingB={isLoadingB}
      source={loaderOne}>
      <Header
        leftIcon={imagePath.backArrow}
        centerTitle={strings.ADD_MONEY}
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
      {mainView()}
    </WrapperContainer>
  );
}
