import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Platform
} from 'react-native';
import { navbarStyles } from '../css/navBar';
import ImageContainer from '../CommonComponents/ImageContainer';
import Counter from '../CommonComponents/Counter';
import SubmitButton from '../CommonComponents/SubmitButton';
import { HeadingSix, HeadingFive } from '../headings';
import Icon from 'react-native-vector-icons/Ionicons';

let { width, height } = Dimensions.get('screen');
const images = [
    {
        id: 'burgerOne',
        uri: require('../images/BurgerOne.jpg'),
        name: 'Wayback Burger',
        price: '$10'
    },
    {
        id: 'burgerTwo',
        uri: require('../images/b.jpg'),
        name: 'Double Bacon Burger',
        price: '$15'
    },
    {
        id: 'burgerFour',
        uri: require('../images/burger2.jpg'),
        name: 'Wayback Burger',
        price: '$50'
    },
    {
        id: 'burgerFive',
        uri: require('../images/BurgerOne.jpg'),
        name: 'Wayback Burger',
        price: '$100'
    },
];

export default class SecondScreen extends Component {
    static navigatorStyle = {
       ...navbarStyles,
        navBarButtonColor: '#fff'
    }

    static navigatorButtons = {
        rightButtons: [{
            buttonColor: '#fff',
            id: 'Cart'

        }]
    };

    constructor(props) {
        super(props);
        this.isPotrait = height > width ? true : false;
        this.state = {
            isPotrait: this.isPotrait,
            amount: 0
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.priceList = {};
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
        width = dim.screen.width;
        this.setState((prevState) => {
            return {
                isPotrait: !prevState.isPotrait 
            } 
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionListener);
    }

    counterHandler(qty, id, decider) {
        let amount = 0;
        switch (id) {
            case 'burgerOne':
                this.priceList['burgerOne'] = this.getTotalAmount(qty, 10, decider);
            break;
            case 'burgerTwo':
                this.priceList['burgerTwo'] = this.getTotalAmount(qty, 15, decider);
            break; 
            case 'burgerThree':
                this.priceList['burgerThree'] = this.getTotalAmount(qty, 20, decider);
            break; 
            case 'burgerFour':
                this.priceList['burgerFour'] = this.getTotalAmount(qty, 50, decider);
            break; 
            case 'burgerFive':
                this.priceList['burgerFive'] = this.getTotalAmount(qty, 100, decider);
            break; 
            default:  
                console.log("default");
        }
        Object.values(this.priceList).forEach( price => {
            amount += price
        });
        this.setState({ amount });
    }

    getTotalAmount = ( qty, rate, decider ) => {
        if (decider == 'add') {
            return qty * rate;
        } else {
            return qty * rate;
        }
    }

    renderItems(item) {
        return (
            <View style={[{ width: this.isPotrait ? '100%' : '95%', height: this.isPotrait ? 200 : 280 }, styles.horizontalCenter]}>
                <ImageContainer 
                    imgSrc={item.uri} 
                    styles={{ flex: this.isPotrait ? width/650 : width/1200}}
                    resize={'contain'}
                />
                <View style={{ width: "27%"}}>
                    <HeadingSix 
                        styles={{textAlign: 'center', color: '#7C897C'}}
                    >
                        {item.name}
                    </HeadingSix>
                    <Text style={{textAlign: 'center', color: 'red'}}>{item.price}</Text>
                </View>
                <View>
                    <Counter
                        id={item.id} 
                        getValue
                        value={this.counterHandler.bind(this)}
                        direction={'column-reverse'}
                    />
                </View>
            </View>
        )
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    backgroundColor: "#CED0CE",
                    alignSelf: 'center'
                }}
            />
        );
    };

    handleBtnActivity() {
        this.props.navigator.push({
            screen: 'myproject.ThirdScreeen',
            title: 'Your Order',
            backButtonTitle: '',
            animationType: 'fade'
        })
    }
    
    render() {
        return(
            <View style={styles.outerContainer}>
                <View style={styles.viewContainer}>
                    <FlatList
                        data={images}
                        renderItem={({item}) => this.renderItems(item)}
                        ItemSeparatorComponent={this.renderSeparator.bind(this)}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
                <View style={[styles.buttonContainer, {flexDirection: this.isPotrait ? 'column' : 'row-reverse'}, styles.center]}>
                    <View style={[{ width: this.isPotrait ? '100%' : '40%', height: 40 , marginBottom: Platform.OS == 'ios' ? 10 : 0}, styles.center]}>
                        <HeadingFive>Total ${this.state.amount}</HeadingFive>
                    </View>
                    <SubmitButton
                        submitStyles={{ flex: 0.66, width: this.isPotrait ? '75%' : '100%', height: this.isPotrait ? 50 : 40 }}
                        pressHandler={this.handleBtnActivity.bind(this)}
                    >
                        Process Order
                    </SubmitButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewContainer: {
        marginTop: 65,
        flex: .78
    },
    buttonContainer: {
        flex: .22,
        backgroundColor: 'white'
    },
    separator: {
        backgroundColor: 'black'
    },
    horizontalCenter: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center' 
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})