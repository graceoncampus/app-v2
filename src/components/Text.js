
import React, { PureComponent } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

export default class Text extends PureComponent {
  render() {
    return (
      <RNText 
        {...this.props}
        style={[styles.base, this.props.size && styles[this.props.size], this.props.style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Rubik',
    fontSize: 20,
    color: '#3a3f4b',
    lineHeight: 20,
  },
  heading: {
    fontFamily: 'Rubik-Regular',
    fontSize: 25,
    lineHeight: 30,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    color: '#04164d',
    lineHeight: 25,
  },
  subtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    lineHeight: 18,
  },
  label: {
    fontFamily: 'Rubik-Regular',
    paddingTop: 10,
    fontSize: 12,
    color: '#848895',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  caption: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: '#848895',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  buttonTextGold: {
    fontSize: 12,
    color: '#ae956b',
    letterSpacing: 1,
    textAlign: 'center',
  }
});