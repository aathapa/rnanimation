import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import Animation from './Animation';
import ScrollableHeader from './ScrollableHeader';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollableHeader />
    );
  }
}