import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  AppRegistry,
  View,
  Platform,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import Login from './src/screens/Login';
import Main from './src/screens/Home';
// import Signup from './src/screens/auth/signup';
// import ForgotPassword from './src/screens/auth/forgotPassword';
// import leaders from './src/screens/leadership/leaders';
// import roster from './src/screens/roster/roster';
// import IndividualUser from './src/screens/roster/individualUser';
// import gocConnect from './src/screens/connect';
// import events from './src/screens/events/events';
// import event from './src/screens/events/event';
// import rides from './src/screens/rides/ridesTab';
// import myRide from './src/screens/rides/myRide';
// import classes from './src/screens/classes/classes';
// import Class from './src/screens/classes/class';
// import ClassInfo from './src/screens/classes/classInfo';
// import leader from './src/screens/leadership/leader';
// import UserInvite from './src/screens/settings/userinvite';
// import Settings from './src/screens/settings/settings';
// import ChangePassword from './src/screens/settings/changePassword';

const homeStack = createStackNavigator({
  Home: { screen: Main },
  // AddPost: { screen: addPost },
  // Post: { screen: Post },
  // editPost: { screen: editPost },
});

// const eventsStack = createStackNavigator({
//   Events: { screen: events },
//   Event: { screen: event },
// });

// const classesStack = createStackNavigator({
//   Classes: { screen: classes },
//   Class: { screen: Class },
//   ClassInfo: { screen: ClassInfo },
// });

// const ridesStack = createStackNavigator({
//   Rides: { screen: rides },
//   MyRide: { screen: myRide },
//   User: { screen: IndividualUser },
// });

// const leadershipStack = createStackNavigator({
//   Leaders: {
//     screen: leaders,
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//   },
//   Leader: {
//     screen: leader,
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//   },
// });

// const connectStack = createStackNavigator({
//   GOCConnect: { screen: gocConnect },
// });

// const rosterStack = createStackNavigator({
//   Roster: { screen: roster },
//   IndividualUser: { screen: IndividualUser },
// });

// const settingsStack = createStackNavigator({
//   Settings: { screen: Settings },
//   PasswordChange: { screen: ChangePassword },
//   inviteUser: { screen: UserInvite },
// });

const AppStack = createDrawerNavigator({
  Home: {
    screen: homeStack,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  // Connect: {
  //   screen: connectStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Leadership: {
  //   screen: leadershipStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Events: {
  //   screen: eventsStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Classes: {
  //   screen: classesStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Rides: {
  //   screen: ridesStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Roster: {
  //   screen: rosterStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  // Settings: {
  //   screen: settingsStack,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
}, {
  drawerWidth: 160,
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#ae956b',
    labelStyle: {
      fontFamily: 'Akkurat TT',
    },
    style: {
      height: 'auto',
      ...Platform.select({
        android: { paddingTop: StatusBar.currentHeight },
      }),
    },
  },
});

const AuthStack = createStackNavigator({
  Auth: {
    screen: Login,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  // ForgotPassword: {
  //   screen: ForgotPassword,
  // },
  // Signup: {
  //   screen: Signup,
  // },
}, {
  headerMode: 'none',
});


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.auth();
  }

  // Fetch the token from storage then navigate to our appropriate place
  auth = async () => {
    firebase.auth().onAuthStateChanged(user => (this.props.navigation.navigate(user ? 'App' : 'Auth')));
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

AppRegistry.registerComponent('GOC', () => RootStack);
