import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Spinner } from '@shoutem/ui';
import Svg, { Path } from 'react-native-svg';
import { Divider, Text, Button } from '../../components';
import Announcement from './announcement';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class Home extends Component {
  
  state = {
    posts: [
      {
        key: 1,
        role: 'Jeff',
        time: '8:00 pm',
      },
    ],
    readList: null,
    admin: false,
    isFetching: false,
  }

  constructor(props) {
    super(props);
    AsyncStorage.getItem('perms').then((perms) => {
      this.setState({ admin: JSON.parse(perms).admin });
    }).catch(() => (console.warn('no perms')));
    AsyncStorage.getItem('read').then((readList) => {
      if (readList) this.setState({ readList: JSON.parse(readList) });
      else this.setState({ readList: [] });
    }).catch(() => (console.warn('none read')));
  }

  static navigationOptions = ({ navigation }) => ({
    drawer: () => ({
      label: 'Announcements',
    }),
    title: 'ANNOUNCEMENTS',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
      </TouchableOpacity>
    ),
    headerRight: <View />,
    headerStyle: {
      backgroundColor: '#fff',
      ...Platform.select({
        ios: { marginTop: 0, paddingTop: 20 },
        android: {
          elevation: 0, height: 70, paddingTop: 16 + StatusBar.currentHeight, paddingBottom: 12,
        },
      }),
      borderBottomWidth: 1,
      borderBottomColor: '#ecedef',
    },
    headerTitleStyle: {
      alignSelf: 'center', fontFamily: 'Akkurat TT', fontSize: 15, color: '#222222', lineHeight: 18,
    },
  })

  static getDerivedStateFromProps = (props, state) => {
    const { posts, isFetching } = props;
    if (posts) {
      return {
        isFetching,
        posts,
      };
    } else if (!state.isFetching) {
      return {
        isFetching,
      };
    }
    return null;
  }

  setRead = (announcement) => {
    let result = false;
    this.state.readList.forEach((item) => {
      if (item === announcement.key) result = true;
    });
    if (!result) {
      const newList = this.state.readList;
      newList.push(announcement.key);
      this.setState({ readList: newList });
      this.props.setReadList(newList);
    }
    this.props.navigation.navigate('Post', { announcement });
  }

  renderRow = () => this.state.posts.map(announcement => (
      <Announcement key={announcement.key} announcement={announcement} isRead />
  ))

  render() {
    const {
      isFetching,
      admin,
    } = this.state;
    if (!isFetching) {
      return (
        <View style={styles.screen}>
          {
            (admin) &&
             <View style={{ padding: 25 }} styleName='vertical h-center v-end'>
               <Button onPress={() => this.props.navigation.navigate('AddPost')}>
                 <Text>ADD POST</Text>
               </Button>
             </View>
          }

          <Divider type="sectionHeader">
            <Text size="caption">Announcements</Text>
          </Divider>
          <ScrollView>
            { this.renderRow() }
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.screen} >
        <View styleName='vertical fill-parent v-center h-center'>
          <Spinner size="large" />
        </View>
      </View>
    );
  }
}
