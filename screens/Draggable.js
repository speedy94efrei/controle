import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Text } from "react-native";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start();
      }
    });
  }

  componentDidMount() {
    // Code with side effects can be moved here
  }

  componentWillUnmount() {
    // Cleanup code can be placed here if necessary
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.draggable]}
      >
        <Text>{this.props.name}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  draggable: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center"
  }
});
