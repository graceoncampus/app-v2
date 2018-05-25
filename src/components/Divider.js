import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { connectStyle } from '@shoutem/theme';
import { connectAnimation } from '@shoutem/animation';

export default class Divider extends PureComponent {
  render() {
    return <View style={[styles.divider, this.props.type && styles[this.props.type]]} />
  }
}

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'stretch',
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    paddingTop: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
  },
  sectionHeader: {
    paddingTop: 23,
    backgroundColor: '#F2F2F2',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
  }
})
