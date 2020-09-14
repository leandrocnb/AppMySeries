import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginScreen from './src/pages/LoginScreen';
import SeriesScreen from './src/pages/SeriesScreen';

const AppNavigator = createStackNavigator({
	'Login': {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Bem vindo'
		}
	},
	'Main': {
		screen: SeriesScreen
	}
}, {
	defaultNavigationOptions: {
		title: "Minhas Séries",
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#003994',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5',
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,
		}
	}
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;