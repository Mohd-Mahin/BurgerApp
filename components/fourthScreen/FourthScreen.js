import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { navbarStyles } from '../css/navBar';
let { width, height } = Dimensions.get('screen');
import SubmitButton from '../CommonComponents/SubmitButton';
import Icon from 'react-native-vector-icons/Ionicons';
import CardDetails from '../CommonComponents/CardDetails';
import ImageContainer from '../CommonComponents/ImageContainer';
let paymentDetails = [ 'Mohd. Mahin Ansari', '1121 3321 2245 6654', '9/23', 'CCV'];
let visaImage = {
    card: {
        uri: require('../images/visa.jpg')
    }
}

export default class FourthScreen extends Component {
    static navigatorStyle = {
        ...navbarStyles,
        navBarButtonColor: '#fff',
    }

    static navigatorButtons = {
        rightButtons: [{
            buttonColor: '#fff',
            id: 'cartFourth'
        }]
    };

    constructor(props) {
        super(props);
        this.isPotrait = height > width ? true : false;
        this.state = {
            isPotrait: this.isPotrait
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(evt) {
        if (evt.type == 'NavBarButtonPress') {
            if (evt.id == 'Cart') {
                alert('Cart Button Pressed');
            }
        }
    }

    componentDidMount() {
        Icon.getImageSource('ios-cart', 29).then((cart) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'Cart', icon: cart }
                ]
            });
        });

        Dimensions.addEventListener('change', this.dimensionListener.bind(this));
    }

    dimensionListener(dim) {
        this.isPotrait = dim.screen.height > dim.screen.width ? true : false;
        this.setState((prevState) => {
            return {
                isPotrait: !prevState.isPotrait 
            } 
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionListener);
    }

    handleBtnActivity() {
        alert("Done");
    }

    cardDetails() {
        let payments = paymentDetails.map((pay, index) => { 
            return (
                <CardDetails 
                    index={index} 
                    key={index} 
                    cardStyles={{ width: this.isPotrait ? '75%' : '45%' }}
                >
                    {pay}
                </CardDetails>
            )
        });
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                {payments}
            </View>
        )
    }

    render() {
        return(
            <View style={styles.outerContainer}>
                <View style={[
                    styles.imageContainer, 
                    { marginTop: (Platform.OS == 'ios' ? (this.isPotrait ? 64 : 45) : 55), justifyContent: 'center', alignItems: 'center'}
                ]}>
                    <View style={{ flex: 0.8, backgroundColor: 'gray', width: this.isPotrait ?'76%' : '48%'}}>
                        <ImageContainer 
                            imgSrc={visaImage.card.uri}
                            resize={'contain'}
                            styles={{flex: 1, margin: Platform.OS == 'ios' ? 1 : 0}}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {this.cardDetails()}
                
                </View>
                <View style={styles.submitButton}>
                    <SubmitButton
                        submitStyles={{ flex: 0.7, width: this.isPotrait ? '75%' : '45%', height: this.isPotrait ? 50 : Platform.OS == 'android' ? 30 : 40 }} 
                        pressHandler={this.handleBtnActivity.bind(this)}
                        >
                        Add to Cart
                    </SubmitButton>
                </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {
        
        flex: 0.4
    },
    buttonContainer: {
        flex: 0.48
    },
    submitButton: {
        flex: 0.12,
        paddingTop: 5,
    },
    imgContainerOuter: {
        flex: 1, 
        justifyContent: 'space-around', 
        alignItems: 'center'
    }
})