import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

export default class Button extends Component {
  render() {
    const style = {
      ...this.props.style,
      backgroundColor: this.props.clear ? 'transparent' : '#ae956b',
      borderColor: this.props.clear ? '#ae956b' : 'transparent',
      borderWidth: this.props.clear ? 1 : 0,
      borderRadius: 6,
      paddingHorizontal: 15,
      paddingVertical: 15,
      width: '100%',
      height: 50,
    };
    delete style.underlayColor;
    return (
      <TouchableOpacity
        {...this.props}
        style={style}
      />
    );
  }
}
