import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

export default (props) => {
    
    let text = <Text style={styles.textDesign}>{props.children}</Text>;
    return (
        <View 
            style={[ styles.commonDirection, { flex: props.submitStyles.flex }]}
        >
            {Platform.OS == 'ios' ? 
            <TouchableOpacity
                onPress={props.pressHandler}
                {...props}
                style={[styles.touchStyle, styles.commonDirection, { width: props.submitStyles.width, height: props.submitStyles.height}]}
            >
                {text}
            </TouchableOpacity>
            :
            <TouchableNativeFeedback
                onPress={props.pressHandler}
                {...props}
                background={TouchableNativeFeedback.SelectableBackground()}
            >
                <View style={[styles.commonDirection, styles.touchStyle, { width: props.submitStyles.width, height: props.submitStyles.height}]}>
                    {text}
                </View>
            </TouchableNativeFeedback>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    touchStyle: {
        width: '70%',
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: 'green',

    },
    commonDirection: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textDesign: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#fff'
    }
})