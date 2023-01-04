import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import withMetaAndControls from './FeedMetaAndControls';

class Feed extends Component {
  render() {
    return (
      <View>
        <Text style={styles.textPost}>{this.props.item.feed.text}</Text>
        <Image
          style={styles.imagePost}
          source={{uri: this.props.item.feed.images[0]}}
        />
      </View>
    );
  }
}

export default withMetaAndControls(Feed);

const styles = StyleSheet.create({
  textPost: {
    fontSize: 22,
    marginBottom: 20,
  },
  imagePost: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginRight: 20,
  },
});
