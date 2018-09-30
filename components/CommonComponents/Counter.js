import React from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import Buttons from '../CommonComponents/Buttons';
import {HeadingFour} from '../headings';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    handleQuantity(decider) {
        this.setState(prevState => {
            if (!decider && this.state.counter == 0) return; 
            if (decider == 'add') {
                return { counter: ++prevState.counter }
            } else {
                return { counter: --prevState.counter }
            }
        },
        () => this.props.getValue ? this.props.value(this.state.counter, this.props.id, decider) : null);
    }

    render() {
        return(
            <View style={{flexDirection: this.props.direction, justifyContent: 'space-around', marginTop: Platform.OS === 'ios' ? 25 : 10 }}>
                <Buttons icon={'ios-remove-circle-outline'} subtractQuantity={this.handleQuantity} /> 
                <HeadingFour styles={{color: '#9A9C9A'}}>{this.state.counter}</HeadingFour>
                <Buttons icon={'ios-add-circle-outline'} add addQuantity={this.handleQuantity} />
            </View>
        )
    }
}