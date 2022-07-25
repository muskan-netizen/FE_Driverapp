import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../styles/colors';
import WrapperContainer from '../../Components/WrapperContainer';
import actions from '../../redux/actions';
import { moderateScale } from '../../styles/responsiveSize';
import _ from 'lodash';
import { getSubDomain, showError } from '../../utils/helperFunctions';
import navigationStrings from '../../navigation/navigationStrings';
import stylesFun from './styles';
import moment from 'moment';
import CircularImages from '../../Components/CircularImages';
import strings from '../../constants/lang';
import fontFamily from '../../styles/fontFamily';
import imagePath from '../../constants/imagePath';



export default function ChatRoom({ navigation, route }) {
    const clientInfo = useSelector(state => state?.initBoot?.clientInfo);
    const defaultLanguagae = useSelector(state => state?.initBoot?.defaultLanguage);
    const userData = useSelector((state) => state?.auth?.userData);

    const paramData = route?.params?.data;

    const styles = stylesFun({fontFamily});

    const [state, setState] = useState({
        roomData: [],
        isLoading: true,
    })
    const { roomData, isLoading } = state

    const updateState = (data) => setState((state) => ({ ...state, ...data }))


    const isFocused = useIsFocused();

    const roomDataRef = useRef([])



    useEffect(() => {
        fetchData()
    }, [])



    let fetchData = async () => {
        if (_.isEmpty(roomData)) {
            updateState({ isLoading: true })
        }
        try {
            let headerData = {
                client: clientInfo?.database_name,
                language: defaultLanguagae?.value ? defaultLanguagae?.value : 'en',
            }
            let apiData = {
                // sub_domain: appData?.profile?.sub_domain,
                agent_id: userData?.id,
                sub_domain: '192.168.101.88',
                agent_db: userData?.database_name,
                client_id: 1
            }
            const res =  await actions.fetchAgentChat(apiData, headerData)
            updateState({ isLoading: false })
            if (!!res?.chatrooms && !_.isEmpty(res?.chatrooms) && isFocused) {
                roomDataRef.current = res.chatrooms
                updateState({ roomData: res.chatrooms })

            }
            console.log("room res++++", res)
        } catch (error) {
            console.log('error raised in start chat api', error)
            showError(error?.message)
            updateState({ isLoading: false })
        }
    }


    const goToChatRoom = useCallback((item) => {
        navigation.navigate(navigationStrings.CHAT_SCREEN, { data: { ...item, id: item?.order_vendor_id } })
    }, [])

    const renderItem = useCallback(({ item, index }) => {
        let isAnyMessage = _.isEmpty(item?.chat_Data)
        return (
            <TouchableOpacity
                onPress={() => goToChatRoom(item)}
                style={{
                    backgroundColor: colors.white,
                    borderRadius: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                    margin: 2,
                    padding: moderateScale(8)
                }}
            >
                <View style={styles.flexView}>
                    <Text style={styles.textStyle}><Text>Order</Text> # {item?.room_id}</Text>
                    {!isAnyMessage ?
                        <Text style={styles.timeStyle}>{moment(item?.chat_Data[0]?.created_date).format('LLL')}</Text> : null
                    }
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {_.isEmpty(item?.user_Data) ? null : <CircularImages data={item?.user_Data} />}
                    {!isAnyMessage ? <Text numberOfLines={2} style={styles.textDesc} >{item?.chat_Data[0]?.message}</Text> : null}
                </View>
            </TouchableOpacity>
        )
    }, [])

    const listEmptyComponent = useCallback(() => {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Chat Room Empty</Text>
            </View>
        )
    }, [])

    const awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item?._id}`, [roomData]);

    const itemSeparatorComponent = useCallback(() => {
        return (
            <View style={styles.borderStyle} />
        )
    }, [])

    return (
        <WrapperContainer
            bgColor={colors.white}
            statusBarColor={colors.white}
            isLoading={isLoading}
        >
            <Header
                leftIcon={imagePath.backArrow}
                centerTitle={strings.CHAT_ROOM}

            />
            <View style={styles.container}>
                <FlatList
                    data={roomData}
                    renderItem={renderItem}
                    ListEmptyComponent={!isLoading && listEmptyComponent}
                    keyExtractor={awesomeChildListKeyExtractor}
                    ItemSeparatorComponent={itemSeparatorComponent}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>

        </WrapperContainer>
    );
};
