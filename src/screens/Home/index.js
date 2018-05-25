import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, StatusBar, Platform, AsyncStorage } from 'react-native';
import {Spinner } from '@shoutem/ui';
import {Divider, Text, Button } from '../../components';
import Announcement from './announcement';

export default class Home extends Component {
  state = {
    posts: [
      {
        key: 1,
        role: 'Jeff',
        time: '8:00 pm'
      }
    ],
    readList: null,
    admin: false,
    isFetching: false,
  }

  componentWillMount() {
    AsyncStorage.getItem('perms').then((perms) => {
      this.setState({ admin: JSON.parse(perms).admin });
    }).catch(() => (console.error('no perms')));
    AsyncStorage.getItem('read').then((readList) => {
      if (readList) this.setState({ readList: JSON.parse(readList) });
      else this.setState({ readList: [] });
    }).catch(() => (console.error('none read')))
  }

  componentWillReceiveProps = (nextProps) => {
    const { posts, isFetching } = nextProps;
    console.log(nextProps)
    if (posts) {
      this.setState({
        isFetching,
        posts,
      });
    } else if (!this.state.isFetching) {
      this.setState({
        isFetching,
      });
    }
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

  renderRow = () => this.state.posts.map((announcement) => {
    return (
      <Announcement announcement={announcement} isRead />
    )
  })

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
      <Screen>
        <View styleName='vertical fill-parent v-center h-center'>
          <Spinner size="large" />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: '#dfe0e3',
      fontFamily: 'Rubik-Regular',
      marginTop: 3,
      height: 50,
      paddingVertical: 9,
      paddingHorizontal: 15,
      marginBottom: 7,
      borderRadius: 1,
    },
    focused: {
      borderColor: '#ae956b',
    },
    screen: {
      flex: 1
    },
    tile: {
      alignSelf: 'stretch',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 0,
      paddingHorizontal: 25,
      flex: 0.32,
      backgroundColor: 'transparent'
    }
  });