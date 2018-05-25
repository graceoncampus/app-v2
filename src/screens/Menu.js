import React from 'react'
import { View, Text } from 'react-native';

export default class Menu extends React.Component {
    static navigatorStyle = {
        statusBarHideWithNavBar: true,
        statusBarHidden: true,
        statusBarTextColorScheme: 'light',
    };
    render() {
        return (
            <View style={{ paddingTop: 30, paddingHorizontal: 15, flex: 1, backgroundColor: "#3a3f4b"}}>
                <Text style={{color: '#fff', }}>ANNOUNCEMENTS</Text>
                <Text style={{color: '#fff', }}>CONNECT</Text>
                <Text style={{color: '#fff', }}>LEADERSHIP</Text>
                <Text style={{color: '#fff', }}>EVENTS</Text>
                <Text style={{color: '#fff', }}>CLASSES</Text>
                <Text style={{color: '#fff', }}>RIDES</Text>
                <Text style={{color: '#fff', }}>ROSTER</Text>
            </View>
        )
    }
}