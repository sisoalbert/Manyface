import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntD from 'react-native-vector-icons/AntDesign';

const Feed = () => {
  const MetadataArea = () => {
    return (
      <View style={styles.metaContainer}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://holmeshe.me/05apps/avatar01.jpeg'}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{'Siso'}</Text>
          <Text style={styles.date}>{'July 17'}</Text>
        </View>
      </View>
    );
  };

  const FeedBody = () => {
    return (
      <View>
        <Text style={styles.textPost}>Meet Joy!</Text>
        <Image
          style={styles.imagePost}
          source={{uri: 'https://holmeshe.me/05apps/avatar01.jpeg'}}
        />
      </View>
    );
  };

  const widgetTypes = {
    LIKE: 'like',
    COMMENT: 'comment',
    SHARE: 'share',
    MORE: 'more',
  };

  function Widget(props) {
    let iconName = 'thumb-up-outline';
    switch (props.type) {
      case widgetTypes.LIKE:
        iconName = 'comment-text-outline';
        break;
      case widgetTypes.COMMENT:
        iconName = 'comment-text-outline';
        break;
      case widgetTypes.SHARE:
        iconName = 'launch';
        break;
      case widgetTypes.MORE:
        iconName = 'dots-horizontal';
        break;
    }
    return <MaterialCommunityIcons name={iconName} color={'grey'} size={30} />;
  }

  function NumberedWidget(props) {
    return (
      <View style={[{...props.style}, styles.widget]}>
        <Widget type={props.type} />
        <Text style={styles.widgetText}>{props.number}</Text>
      </View>
    );
  }

  const ControlArea = () => {
    return (
      <View style={styles.controlContainer}>
        <NumberedWidget style={{flex: 1}} type={widgetTypes.LIKE} number={10} />
        <NumberedWidget
          style={{flex: 1}}
          type={widgetTypes.COMMENT}
          number={2}
        />
        <NumberedWidget style={{flex: 1}} type={widgetTypes.SHARE} number={5} />
        <Widget type={widgetTypes.MORE} />
      </View>
    );
  };

  return (
    <>
      <MetadataArea />
      <FeedBody />
      <ControlArea />
    </>
  );
};

export default Feed;

const styles = StyleSheet.create({
  metaContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    fontSize: 18,
  },
  textPost: {
    fontSize: 22,
    marginBottom: 20,
  },
  imagePost: {
    width: '100%',
    aspectRatio: 4 / 3,
    marginRight: 20,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  widget: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  widgetText: {
    marginLeft: 3,
    fontSize: 16,
    color: 'grey',
  },
});
