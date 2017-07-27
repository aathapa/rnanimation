import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const { height,width } = Dimensions.get('window')

export default class Opacity extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY(0, 0);
    this.position = position;
  }

  componentWillMount() {
    Animated.timing(this.position, {
      toValue: { x: 100, y: 300 },
      duration: 1000,
    }).start()
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [0,50,100],
      outputRange: ['0deg','180deg','0deg']
    })
    const scale = this.position.x.interpolate({
      inputRange: [0,50,100],
      outputRange: [1,1.5,2]
    })
    const bgColor = this.position.x.interpolate({
      inputRange: [0,25,50,75,100],
      outputRange: ['rgba(155, 89, 182,1.0)', 'rgba(46, 204, 113,1.0)', 'rgba(52, 73, 94,1.0)', 'rgba(192, 57, 43,1.0)','rgba(127, 140, 141,1.0)']
    })
    return {
      transform: [{ scale }],
      backgroundColor: bgColor
    }
  }

  render() {
    return (
      <Animated.View style={[this.getCardStyle(),this.position.getLayout(), styles.cardStyles, ]}>

      </Animated.View>
    );
  }
}

const styles = {
  cardStyles: {
    height: 50,
    width: 50,
    borderRadius: 25
  }

}