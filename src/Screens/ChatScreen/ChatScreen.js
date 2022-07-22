import { StyleSheet, Text, View ,SafeAreaView,TouchableOpacity,Image,Platform} from 'react-native'
import React, { useState, useCallback, useEffect, } from 'react'

import styles from './styles'
import { GiftedChat } from 'react-native-gifted-chat'
import imagePath from '../../constants/imagePath';
import { color } from 'react-native-reanimated';
import colors from '../../styles/colors';
import { moderateScale } from '../../styles/responsiveSize';

export default function ChatScreen({navigation}) {
    const [messages, setMessages] = useState([]);
 
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
  return (
    <SafeAreaView style={{flex:1}}>
   {Platform.OS == "android"?<TouchableOpacity onPress={()=> navigation.goBack()}>
    <Image source={imagePath.backArrow} style={{tintColor:colors.blueColor,paddingHorizontal:moderateScale(13)}}/>
   </TouchableOpacity>:null}
          <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </SafeAreaView>
  )
}

