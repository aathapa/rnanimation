import React, { Component } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HEADER_MAX_HEIGHT = 200
const HEADER_MIN_HEIGHT = 60
const HEADER_SCROLL_DISTANCE = 200 - 60

export default class ScrollableHeader extends Component {
  constructor(props) {
    super(props);
    const scrollY = new Animated.Value(0);
    this.scrollY = scrollY;
  }

  renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0,HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const imageOpacity = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50 ,-100],
      extrapolate: 'clamp',
    });

    const textOpacity = this.scrollY.interpolate({
      inputRange: [0,HEADER_SCROLL_DISTANCE],
      outputRange: [0,1]
    })

    return (
      <View style={styles.fill}>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }]
          )}
        >
          {this.renderScrollViewContent()}
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
            source={require('./images/aaa.png')}
          />
          <View style={styles.bar}>
            <Animated.Text style={[styles.title,{opacity: textOpacity}]}>Title</Animated.Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  }
});