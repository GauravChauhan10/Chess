import 'react-native-gesture-handler';
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Board from './src/Board';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
      }}>
      <Board />
    </View>
  );
};

export default App;
