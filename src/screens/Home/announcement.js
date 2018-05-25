import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Spinner, Row, Icon } from '@shoutem/ui';
import { Divider } from '../../components';

const chrisGee = '../../../assets/images/chrisgee.jpg';
const notificationIcon = '../../../assets/images/notification-icon.png';

export default class Announcment extends React.Component {
    render() {
        const { announcement, isRead } = this.props;
        const image = announcement.role === 'Chris Gee' ? require(chrisGee) : require(notificationIcon);
        console.log(image)
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
                          }}
                        >
                          {announcement.role}
                        </Text>
                        <Text size="caption" style={{ lineHeight: 15 }} >{announcement.time}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 12 }} styleName="vertical">
                      <Text size="subtitle" style={{ marginBottom: 5 }} styleName="bold">{announcement.title}</Text>
                      <Text size="subtitle" numberOfLines={2} ellipsizeMode='tail'>{announcement.post}</Text>
                    </View>
                  </View>
                  <View styleName="vertical stretch space-between h-end" style={{ flex: 0.1 }}>
                    <View style={{
                        width: 8,
                        height: 8,
                        marginRight: 3,
                        borderRadius: 4,
                        backgroundColor: isRead && '#617cce',
                        borderColor: !isRead && '#617cce',
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
                </View>
              </Row>
              <Divider styleName="line" />
            </TouchableOpacity>
        );
    }
}