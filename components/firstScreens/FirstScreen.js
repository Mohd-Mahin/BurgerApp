import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import ImageContainer from '../CommonComponents/ImageContainer';
import { HeadingFive } from '../headings/index';
import SubmitButton from '../CommonComponents/SubmitButton';
import { navbarStyles } from '../css/navBar'; 
import Counter from '../CommonComponents/Counter'; 
let { width, height } = Dimensions.get('screen');
import {Navigation} from 'react-native-navigation';

const images = {
    burger: {
      uri: require('../images/BurgerOne.jpg')
    }
};

export default class FirstScreen extends React.Component {
    static navigatorStyle = navbarStyles;
    constructor(props) {
        super(props);
        this.isPotrait = height > width ? true : false;
        this.state = {
            counter: 0,
            isPotrait: this.isPotrait
        }
    }

    componentDidMount() {
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

    textContainerElems = () => (
        <View>
            <HeadingFive styles={styles.textGreen}>{this.state.counter * 13}$</HeadingFive>
            <View style={styles.textContainerElem}>
                <View style={{width: '55%'}}>
                    <Text style={[{textAlign: 'center'}, styles.textGreen]}>
                        Classic old school burger with 2 paddys, lettuce and cheddar cheese.
                    </Text>
                </View>
            </View>
            <Counter 
                direction={'row'}
                getValue
                value={(counter) => this.setState({counter})}
            />
        </View>
    );

    handleBtnActivity() {
        if (Platform.OS == 'android') {
            Navigation.showModal({
                screen: 'myproject.SecondScreen',
                title: 'Your Order',
                backButtonTitle: '',
                animationType: 'fade'
            })
        } else {
            this.props.navigator.push({
                screen: 'myproject.SecondScreen',
                title: 'Your Order',
                backButtonTitle: '',
                animationType: 'fade'
            })
        }
    }

    render() {
        return(
            <View 
                style={styles.parentContainer}
            >   
                <View style={[styles.imgTextContainer, {flexDirection: this.isPotrait ? 'column' : 'row', alignItems: !this.isPotrait ?'center' : null }]}>
                    <View style={styles.imgContainer}>
                        <ImageContainer
                            imgSrc={images.burger.uri} 
                            resize={'contain'}
                            styles={{flex: 1, padding: 40}}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        {this.textContainerElems()}
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <SubmitButton 
                        submitStyles={{ flex: 0.4, width: this.isPotrait ? '70%' : '50%', height: this.isPotrait ? 50 : 40  }}
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
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 65
    },
    innerContainer: {
        flex: 1,
    },
    imgContainer: {
        flex: 2
    },
    textContainer: {
        flex: 1.6,
    },
    textContainerElem: { 
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingTop: 10
    },
    textGreen: {
        color: 'green'
    },
    imgTextContainer: { 
        flex: 3.6
    }
});

