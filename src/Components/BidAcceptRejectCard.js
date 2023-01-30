import { View, Text, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import GradientButton from './GradientButton';
import { moderateScale, moderateScaleVertical, textScale, width } from '../styles/responsiveSize';
import SwitchSelectorComponent from './SwitchSelector';
import strings from '../constants/lang';
import imagePath from '../constants/imagePath';
import { FlatList } from 'react-native-gesture-handler';

const BidAcceptRejectCard = ({
  data = [],
  bidExpiryDuration = {},
  _onDeclineBid = () => { },
  _onAcceptRideBid = () => { },
  _onChangeBidPrice = () => { },
}) => {
  const [state, setState] = useState({
    options: [
      { label: 'Bid Amount', value: 0, testID: "1" },
      { label: 'Recommended Bid Amount', value: 1, testID: "2" },
    ],
    selectedOption: 0,
  });
  const {
    options,
    selectedOption,
  } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const renderDotContainer = () => {
    return (
      <>
        <View style={{ height: 40, overflow: "hidden", alignItems: "center" }}>
          <View style={{
            height: 40,
            width: 0.5,
            backgroundColor: colors.textGreyLight,
          }} />
        </View>

        <Image
          style={{
            tintColor: colors.redB,
          }}
          source={imagePath.blackSquare}
        />
      </>
    );
  };
  //  const  allBidLocations = data?.tasks.replace(/'/g, '"') //replacing all ' with "

  return (
    <View style={{
      marginTop: moderateScaleVertical(20),
      width: moderateScale(width - 40),
      alignSelf: 'center',
      backgroundColor: colors.whiteSmokeColor,
      borderRadius: moderateScale(15), overflow: 'hidden'
    }}>
      <View style={{
        alignSelf: 'flex-end',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScaleVertical(8)
      }} >
        <CountdownCircleTimer
          isPlaying
          duration={bidExpiryDuration}
          colors={[colors.themeColor]}
          size={40}
          strokeWidth={5}
        >
          {({ remainingTime }) => {
            remainingTime == 0 && _onDeclineBid(data?.id)
            return (
              <Text>{remainingTime}</Text>
            )
          }}
        </CountdownCircleTimer>

      </View>
      <View style={{ marginHorizontal: moderateScale(10), flexDirection: 'row', alignItems: 'center', }}>
        <View
          style={{
            marginHorizontal: moderateScale(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
          }}>
          <View style={{ flex: 0.5, }}>
            <Image
              style={{ height: moderateScaleVertical(50), width: moderateScale(50), borderRadius: moderateScale(25) }}
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80' }} />
            <Text style={{ fontSize: textScale(13), fontFamily: fontFamily.bold }}>{data?.driver_name}</Text>

            {/* {data.map((item,index)=>{
              if(item?.task_type_id ==2){
               return(
                <View style={{flexDirection:'row',marginTop:moderateScaleVertical(4)}}>
                  <Image source={imagePath.location1}/>
                <Text numberOfLines={2} style={{marginLeft:moderateScale(5),fontFamily:fontFamily?.regular}}>{item?.address}</Text>
                </View>
               )
              }else{
                return null
              }
             
            })} */}
            <Text style={{ fontSize: textScale(15), color: colors.themeColor, fontFamily: fontFamily?.bold }}>${200}</Text>
          </View>
          {/* address location */}
          <View style={{ flex: 0.7, }}>
            <View style={{ flexDirection: 'row', marginVertical: moderateScaleVertical(4) }}>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <Image
                  style={{
                    tintColor: colors.greenA
                  }}
                  source={imagePath.grayDot}
                />
              </View>
              <Text numberOfLines={2}
                style={{ marginLeft: moderateScale(5), fontFamily: fontFamily?.regular, color: colors.black }}>
                {data?.address}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: moderateScaleVertical(4) }}>
              <View style={{ marginHorizontal: moderateScale(10) }}>
                {renderDotContainer()}
              </View>
              <Text numberOfLines={2}
                style={{
                  marginLeft: moderateScale(5),
                  fontFamily: fontFamily?.regular, color: colors.black,
                  marginTop: moderateScaleVertical(28),
                }}>{data?.address}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginVertical: moderateScaleVertical(4), marginHorizontal: moderateScale(10) }}>
              <Text>Distance : 17 Km</Text>
            </View>
          </View>
          {/* end */}
        </View>
      </View>
      {/* Accept button */}
      <View style={{ marginVertical: moderateScaleVertical(10), width: '80%', alignSelf: 'center' }}>
        <GradientButton
          colorsArray={[colors.themeColor, colors.themeColor]}
          textStyle={{
            textTransform: 'none',
            fontSize: textScale(13),
            color: colors.white,
          }}
          onPress={() => _onAcceptRideBid(data?.id)}
          btnText={`Accept $${data?.bidAmount}`}
          btnStyle={{ width: moderateScale(width / 2.5) }}
        />
      </View>

      <View style={{ width: '90%', marginVertical: moderateScaleVertical(10), alignSelf: 'center' }}>
        <Text style={{ fontSize: textScale(15), color: colors.themeColor, fontFamily: fontFamily?.bold }}>
          Offer you fare for the trip
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={[...Array(5)]}
          renderItem={({ item, index }) => {
            return (
              <GradientButton
                colorsArray={[colors.white, colors.white]}
                textStyle={{
                  textTransform: 'none',
                  fontSize: textScale(13),
                  color: colors?.redB,
                }}
                onPress={() => _onChangeBidPrice(index)}
                btnText={`$ 200`}
                btnStyle={{ width: moderateScale(width / 4.6), borderWidth: moderateScale(1), borderColor: colors.redB }}
                containerStyle={{ backgroundColor: colors.whiteSmokeColor, padding: moderateScale(6) }}
              />
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default BidAcceptRejectCard;