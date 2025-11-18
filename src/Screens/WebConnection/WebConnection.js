import React, { useState } from "react";
import { Alert } from "react-native";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import WrapperContainer from "../../Components/WrapperContainer";
import imagePath from "../../constants/imagePath";
import strings from "../../constants/lang";
import navigationStrings from "../../navigation/navigationStrings";
import colors from "../../styles/colors";
import commonStylesFun from "../../styles/commonStyles";
import stylesFun from "./styles";
import queryString from "query-string";
import actions from "../../redux/actions";
import axios from "axios";

export default function WebConnection({ navigation, route }) {
  const paramData = route?.params;
  console.log(paramData, "paramData>>>");
  const [state, setState] = useState({});
  const { userData } = useSelector((state) => state?.auth);
  const { clientInfo } = useSelector((state) => state?.initBoot);
  //update your state
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  //Navigation to specific screen
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, { data });
  };

  console.log("paramData", paramData, userData, clientInfo);

  const onNavigationStateChange = (navState) => {
    console.log(navState, "navState>>>UPDATE");
    const URL = queryString.parseUrl(navState.url);
    const queryParams = URL.query;
    const nonQueryURL = URL.url;
    console.log("state change query", queryParams,URL,nonQueryURL);

    if (queryParams.status == "200") {
      // return
      axios
        .get(`${nonQueryURL}?agent_id=${queryParams?.agent_id}&connect_id=${queryParams?.connect_id}`, {
          headers: {
            Authorization: userData?.access_token,
            client: clientInfo.database_name, // ✅ include auth header
          },
        })
        .then((res) => {
          setTimeout(() => {
          navigation.goBack();
          }, 600);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // navigation.navigate(navigationStrings.SUBSCRIPTION);
    }
  };

  return (
    <WrapperContainer
      bgColor={colors.backgroundGrey}
      statusBarColor={colors.white}
    >
      <Header
        leftIcon={imagePath?.backArrow}
        centerTitle={paramData?.data?.title || ""}
        headerStyle={{ backgroundColor: Colors.white }}
      />
      <View
        style={{
          height: 1,
          backgroundColor: colors.lightGreyBgColor,
          opacity: 0.26,
        }}
      />
      <WebView
        source={{ uri: paramData?.data?.stripe_connect_url }}
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
        // onNavigationStateChange={(navState) => {
        //   console.log(navState, 'webProps');

        // }}
      />
    </WrapperContainer>
  );
}
