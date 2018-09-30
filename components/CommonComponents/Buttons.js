import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Buttons extends Component {

    handleButtonPress() {
        if (this.props.add) {
            this.props.addQuantity('add');
        } else {
            this.props.subtractQuantity();
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handleButtonPress.bind(this)}
            >
                <Icon name={this.props.icon} color={'#9A9C9A'} size={40} />
            </TouchableOpacity>
        );
    }
}