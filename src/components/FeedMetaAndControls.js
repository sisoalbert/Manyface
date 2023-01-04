import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default function withMetaAndControls(Feed) {
  return class extends Component {
    render() {
      return (
        <View style={[...this.props.style, styles.commonPadding]}>
          <View style={styles.metaContainer}>
            <Image
              style={styles.avatar}
              source={{uri: this.props.item.meta.avatarUri}}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.userName}>{this.props.item.meta.name}</Text>
              <Text style={styles.date}>{this.props.item.meta.date}</Text>
            </View>
          </View>
          <Feed {...this.props} />
          <View style={styles.controlContainer}>
            <NumberedWidget
              style={{flex: 1}}
              type={widgetTypes.LIKE}
              number={this.props.item.meta.numOfLikes}
            />
            <NumberedWidget
              style={{flex: 1}}
              type={widgetTypes.COMMENT}
              number={this.props.item.meta.numOfComments}
            />
            <NumberedWidget
              style={{flex: 1}}
              type={widgetTypes.SHARE}
              number={this.props.item.meta.numOfShares}
            />
            <Widget type={widgetTypes.MORE} />
          </View>
        </View>
      );
    }
  };
}
