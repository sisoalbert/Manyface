import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default function FeedFactory(props) {
  let numOfImages = props.item.feed.images.length;
  if (numOfImages > 4 && numOfImages <= 9) {
    return <Feed3x3 {...props} />;
  } else if (numOfImages > 1 && numOfImages <= 4) {
    return <Feed2x2 {...props} />;
  } else if (numOfImages === 1) {
    return <Feed {...props} />;
  }

  return <Feed3x3 {...props} />;
}
