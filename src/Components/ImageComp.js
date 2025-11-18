//import liraries
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { hitSlopProp } from '../styles/commonStyles';
import colors from '../styles/colors';

// create a component
const ButtonImage = ({
    image = '',
    imgStyle = {},
    onPress = () => { },
    btnStyle = {},
    isDarkMode
}) => {
    return (
        <TouchableOpacity
            hitSlop={hitSlopProp}
            style={{ ...btnStyle }}
            onPress={onPress}
        >
            <Image
                source={image}
                // tintColor={isDarkMode ?colors?.white:colors?.black}
                style={{ ...imgStyle }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
};


export default ButtonImage;
