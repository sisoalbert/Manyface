import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import withMetaAndControls from './FeedMetaAndControls';

class Feed2x2 extends Component {
  render() {
    return (
      <>
        <Text style={styles.textPost}>{this.props.item.feed.text}</Text>
        <View style={styles.gridContainer}>
          {this.props.item.feed.images.slice(0, 4).map(e => (
            <View style={styles.cell}>
              <Image style={styles.imagePost} source={{uri: e}} />
            </View>
          ))}
        </View>
      </>
    );
  }
}

export default withMetaAndControls(Feed2x2);

const styles = StyleSheet.create({
  textPost: {
    fontSize: 22,
    marginBottom: 20,
  },
  imagePost: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '50%',
    paddingRight: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
