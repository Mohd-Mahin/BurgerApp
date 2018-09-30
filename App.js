
import  { Navigation } from 'react-native-navigation';
import FirstScreen from './components/firstScreens/FirstScreen';
import SecondScreen from './components/secondScreen/SecondScreen';
import ThirdScreen from './components/thirdScreen/ThirdScreen';
import FourthScreen from './components/fourthScreen/FourthScreen';

// registery 
Navigation.registerComponent('myproject.FirstScreen', () => FirstScreen);
Navigation.registerComponent('myproject.SecondScreen', () => SecondScreen);
Navigation.registerComponent('myproject.ThirdScreeen', () => ThirdScreen);
Navigation.registerComponent('myproject.FourthScreen', () => FourthScreen);

// start First Screen
Navigation.startSingleScreenApp({
    screen: {
      screen: 'myproject.FirstScreen',
      title: 'Wayback Burger'
    }
});