import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const HeadingFour = (props) => {
    return(
        <View
            style={styles.headingOuter}
        >
            <Text style={[styles.headingFive, props.styles]}>
                {props.children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headingOuter: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7
    },
    headingFive: {
        fontSize: 22,
    }
});

export { HeadingFour };