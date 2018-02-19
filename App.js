/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import StatusBarBackground from './components/statusBarBackground';
import CoinRow from './components/CoinRow';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ListView
} from 'react-native';
// https://api.coinmarketcap.com/v1/ticker/?convert=TWD&start=10&limit=20

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      dataset: null,
      dataSource: [],
      currency: 'TWD',
      start: 0,
      limit: 30,
    }
  }

  componentDidMount() {
    
    return fetch(`https://api.coinmarketcap.com/v1/ticker/?convert=${this.state.currency}&start=${this.state.start}&limit=${this.state.limit}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function() {
          // do something with new state
          console.log(responseJson);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBarBackground />
        <ScrollView
          alwaysBounceVertical={true}>
          <Accordion
            sections={this.state.dataSource}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}/>
        </ScrollView>
      </View>
    );
  }

  _renderHeader(section, index, isActive, sections) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={ [
          styles.header,
          { backgroundColor: (isActive ? '#857e95' : '#c4c3cb') }
        ] }>
        <Text style={styles.headerText}>{section.rank} - {section.symbol}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, index, isActive, sections) {
    return (
       <Animatable.View
          duration={300}
          transition="backgroundColor"
          style={[
            styles.content, { backgroundColor: (isActive ? '#857e95' : '#c4c3cb') }
          ] }>
        <Text style={styles.text}>{section.name}</Text>
        <Text style={styles.text}>當前價格: {section.price_usd} USD</Text>
        <Text style={styles.text}>過去一小時漲跌: {section.percent_change_1h} %</Text>
        <Text style={styles.text}>過去一天漲跌: {section.percent_change_24h} %</Text>
        <Text style={styles.text}>過去一週漲跌: {section.percent_change_7d} %</Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    padding: 5
  },
  content: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#3e3c3d',
    height: 38,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center'
  },
  row: {
    height:44,
  },
  item: {
    padding: 10,
    height: 44,
  }
});
