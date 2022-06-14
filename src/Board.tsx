import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Background from './Background';
import {Chess} from 'chess.js';
import Piece from './Piece';
import {SIZE} from './Notation';
const {width} = Dimensions.get('window');

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{value: T}>();
  if (ref.current === undefined) {
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}
const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: 'w',
    board: chess.board(),
  });
  const onTurn = useCallback(() => {
    setState({
      player: state.player === 'w' ? 'b' : 'w',
      board: chess.board(),
    });
  }, [chess, state.player]);
  return (
    <View style={styles.mainContainer}>
      <Background />
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                position={{x, y}}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === piece.color}
              />
            );
          }
          return null;
        }),
      )}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  mainContainer: {
    width,
    height: width,
  },
});
