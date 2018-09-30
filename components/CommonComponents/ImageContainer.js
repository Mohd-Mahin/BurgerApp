import React from 'react';
import {
    View,
    Image
} from 'react-native';


export default (props) => {
    //let img = props.imgSrc.burger.uri;
    return (
        <View style={[props.styles]}>
            <Image 
                source={props.imgSrc}
                style={[{ flex: props.styles.flex, height: undefined, width: undefined, borderRadius: props.circle ? props.imgaeHeight > props.imageWidth ? props.imgaeHeight / 7.2 : props.imgaeHeight/6 : null }]}
                {...props}
            />
        </View>
    );
}