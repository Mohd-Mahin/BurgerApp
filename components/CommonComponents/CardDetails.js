import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

export default (props) => {
    let content;
    if (Platform.OS == 'ios') {
        content = (
            <View style={{flex: 0.5, width: props.cardStyles.width, justifyContent: 'center'}}>
                <TouchableOpacity 
                    style={{ flex: 0.6, backgroundColor: '#EDEFED', borderRadius: 5, opacity: props.index == 3 ? 0.5 : 1 }} 
                    disabled={ props.index == 3 ? true : false}
                >
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            {props.children}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        content = (
            <View style={{flex: 0.5, width: props.cardStyles.width, justifyContent: 'center'}}>
                <TouchableNativeFeedback  
                    background={TouchableNativeFeedback.SelectableBackground()}
                    disabled={ props.index == 3 ? true : false}
                >
                    <View style={{flex: 0.6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#EDEFED', borderRadius: 5}}>
                        <Text>
                            {props.children}
                        </Text>
                    </View> 
                </TouchableNativeFeedback> 
            </View>
        );
    }
    
    return content;
}