import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, StatusBar, Platform, AsyncStorage } from 'react-native';
import {Spinner, Row, Image, Icon } from '@shoutem/ui';
import {Divider, Text, Button } from '../components';


export default class Home extends Component {
  state = {
    posts: [],
    readList: null,
    admin: false,
    isFetching: false,
  }

  componentWillMount() {
    AsyncStorage.getItem('perms').then((perms) => {
      this.setState({ admin: JSON.parse(perms).admin });
    });
    AsyncStorage.getItem('read').then((readList) => {
      if (readList) this.setState({ readList: JSON.parse(readList) });
      else this.setState({ readList: [] });
    });
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
    let result = false;
    this.state.readList.forEach((item) => {
      if (item === announcement.key) result = true;
    });
    let image;
    // if (announcement.role === 'Grace on Campus') image = require('../../images/notification-icon.png');
    // else if (announcement.role === 'Chris Gee') image = require('../../images/chrisgee.jpg');
    return (
        <TouchableOpacity key={announcement.key} onPress={() => this.setRead(announcement)}>
          <Row>
            <View style={{ flex: 1 }} styleName="horizontal v-start">
              <View style={{ flex: 0.9 }} styleName="vertical">
                <View styleName="horizontal v-center">
                  <Image style={{ width: 25, height: 25, marginRight: 8 }} styleName="small-avatar" source={image} />
                  <View styleName='vertical'>
                    <Text size="subtitle" style={{
                        marginBottom: 2,
                        fontSize: 14,
                        lineHeight: 18,
                        fontFamily: 'Akkurat-Bold',
                      }}
                    >
                      {announcement.role}
                    </Text>
                    <Caption style={{ lineHeight: 15 }} >{announcement.time}</Caption>
                  </View>
                </View>
                <View style={{ marginTop: 12 }} styleName="vertical">
                  <Text size="subtitle" style={{ fontFamily: 'Akkurat-Bold', marginBottom: 5 }} styleName="bold">{announcement.title}</Text>
                  <Text size="subtitle" numberOfLines={2} ellipsizeMode='tail'>{announcement.post}</Text>
                </View>
              </View>
              { !result ?
                <View styleName="vertical stretch space-between h-end" style={{ flex: 0.1 }}>
                  <View style={{
                      width: 8,
                      height: 8,
                      marginRight: 3,
                      borderRadius: 4,
                      backgroundColor: '#617cce',
                    }}
                    styleName="notification-dot"
                  />
                  <Icon style={{ fontSize: 22, opacity: 0.5, marginRight: -4 }} styleName="disclosure" name="right-arrow" />
                  <View style={{
                      width: 8,
                      height: 8,
                      marginRight: 3,
                      marginTop: 3,
                      borderRadius: 4,
                      borderWidth: 0.8,
                      opacity: 0,
                    }}
                    styleName="notification-dot"
                  />
                </View>
                :
                <View styleName="vertical stretch space-between h-end" style={{ flex: 0.1 }}>
                  <View style={{
                      width: 8,
                      height: 8,
                      marginRight: 3,
                      borderRadius: 4,
                      borderWidth: 0.8,
                      borderColor: '#617cce',
                    }}
                    styleName="notification-dot"
                  />
                  <Icon style={{ fontSize: 22, opacity: 0.5, marginRight: -4 }} styleName="disclosure" name="right-arrow" />
                  <View style={{
                      width: 8,
                      height: 8,
                      marginRight: 3,
                      marginBottom: 3,
                      borderRadius: 4,
                      borderWidth: 0.8,
                      opacity: 0,
                    }}
                    styleName="notification-dot"
                  />
                </View>
              }
            </View>
          </Row>
          <Divider styleName="line" />
        </TouchableOpacity>
    );
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