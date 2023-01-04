import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';

import Feed from './src/components/FeedAll';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Feed />
        <Feed />
        <Feed />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
