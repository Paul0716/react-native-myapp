/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import StatusBarBackground from './components/StatusBarBackground';
import CoinRow from './components/CoinRow';
import Accordion from 'react-native-collapsible/Accordion';

import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ListView,
  ActivityIndicator
} from 'react-native';
// https://api.coinmarketcap.com/v1/ticker/?convert=TWD&start=10&limit=20

type Props = {};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
export default class App extends Component<Props> {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      dataset: null,
      rawData: [],
      dataSource: ds,
      currency: 'TWD',
      start: 0,
      limit: 30,
    }
  }

  _fetchData() {
    return fetch(`https://api.coinmarketcap.com/v1/ticker/?convert=${this.state.currency}&start=${this.state.start}&limit=${this.state.limit}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ rawData: this.state.rawData.concat(responseJson) });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(this.state.rawData),
        }, function() {
          // do something with new state
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    return this._fetchData()
      .then(() => {
        const start = this.state.start;
        this.setState({ start: start + this.state.limit });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarBackground />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <CoinRow data={data}/>} 
          onEndReachedThreshold={20}
          onEndReached={() => {
            this.state.isLoading = true;
            this._fetchData()
              .then(() => {
                const start = this.state.start;
                console.log(`start: ${start}`);
                this.setState({ start: start + this.state.limit });
              });
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  content: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: '#3e3c3d',
    height: 38,
  },
  row: {
    height:44,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    height: 200,
  }
});
