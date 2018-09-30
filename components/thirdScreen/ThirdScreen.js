import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import { navbarStyles } from '../css/navBar';
import Icon from 'react-native-vector-icons/Ionicons';
import SubmitButton from '../CommonComponents/SubmitButton';
import ImageContainer from '../CommonComponents/ImageContainer';
import { HeadingSix } from '../headings';
import CardDetails from '../CommonComponents/CardDetails';
let { width, height } = Dimensions.get('screen');
let address = [ '234/3H Hope farm', 'Whitefield', 'Banglore Karnataka', 'Contact Number'];

const passportSize = {
    image: {
        id: 'passportSize',
        uri: require('../images/passportSize.jpg'),
    }
}

export default class ThirdScreen extends Component {
    static navigatorStyle = {
        ...navbarStyles,
         navBarButtonColor: '#fff'
     }

    static navigatorButtons = {
        rightButtons: [{
            buttonColor: '#fff',
            id: 'CartThirdSreen'

        }]
    };

    constructor(props) {
        super(props);
        this.isPotrait = height > width ? true : false;
        this.state = {
            isPotrait: this.isPotrait
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.imageContainer = this.imageContainer.bind(this);
    }

    onNavigatorEvent(evt) {
        if (evt.type == 'NavBarButtonPress') {
            if (evt.id == 'CartThirdSreen') {
                alert('Cart Button Pressed');
            }
        }
    }

    componentDidMount() {
        Icon.getImageSource('ios-cart', 29).then((cart) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'CartThirdSreen', icon: cart }
                ]
            });
        });

        Dimensions.addEventListener('change', this.dimensionListener.bind(this))
    }

    dimensionListener(dim) {
        this.isPotrait = dim.screen.height > dim.screen.width ? true : false;
        width = dim.screen.width;
        height = dim.screen.height;
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
        this.props.navigator.push({
            screen: 'myproject.FourthScreen',
            title: 'Payment Details',
            backButtonTitle: '',
            animationType: 'fade'
        })
    }

    imageContainer() {
        return(
            <View style={[
                { 
                    flexDirection: this.isPotrait ? 'column' : 'row' 
                }, 
                styles.imgContainerOuter
            ]}>
                <View style={
                    { 
                        width: this.isPotrait ? '50%' : '18%', 
                        height: this.isPotrait ? '82%' : '97%',  
                        alignSelf: 'center'
                    }
                }>
                    <ImageContainer 
                        imgSrc={passportSize.image.uri} 
                        styles={{flex: 1}}
                        resize={'contain'}
                        circle
                        imageWidth={width}
                        imgaeHeight={height}
                    />
                </View>
                <View style={
                    { 
                        height: 30,
                        width: this.isPotrait ? '100%' : '50%'
                    }
                }>
                    <HeadingSix>
                        Home Address
                    </HeadingSix>
                </View>
            </View>
        )
    }

    cardDetails() {
        let resAdress = address.map((add, index) => { 
            return (
                <CardDetails 
                    index={index} 
                    key={index} 
                    cardStyles={{ width: this.isPotrait ? '75%' : '45%' }}
                >
                    {add}
                </CardDetails>
            )
        });
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                {resAdress}
            </View>
        )
    }

    render() {
        return(
            <View style={styles.outerContainer}>
                <View style={[
                    styles.imageContainer, 
                    { marginTop: (Platform.OS == 'ios' ? (this.isPotrait ? 64 : 45) : 55)}
                ]}>
                    {this.imageContainer()}
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