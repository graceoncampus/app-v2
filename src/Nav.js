
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import firebase from 'react-native-firebase';

registerScreens();

export const startLogin = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'goc.Login',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });
}

export const startMainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'goc.Main',
      title: 'ANNOUNCEMENTS',
    },
    navigatorStyle: {
      navBarTextFontSize: 15,
      navBarTextColor: '#222222',
      navBarBackgroundColor: '#fff',
    },
    drawer: { // optional, add this if you want a side menu drawer in your app
      left: { // optional, define if you want a drawer from the left
        screen: 'goc.Menu', // unique ID registered with Navigation.registerScreen
        passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
        fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
      },
      style: { // ( iOS only )
        drawerShadow: false, // optional, add this if you want a side menu drawer shadow
        leftDrawerWidth: 60, // optional, add this if you want a define left drawer width (50=percent)
        shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
      },
      type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
      animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                                            // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
      disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
    },
  });
}
// firebase.auth().signOut();
export const init = () => firebase.auth().onAuthStateChanged(user => user ? startMainApp() : startLogin());