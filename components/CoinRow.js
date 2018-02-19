'use strict';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'native-base';
import Collapsible from 'react-native-collapsible';

class CoinRow extends Component{

    constructor() {
        super();
        this.state = this._initState();
        this._showDetail.bind(this);
    }

    _initState() {
        return {
            isActive: false,
        }
    }

    _showDetail(data) {
        const isActive = this.state.isActive;
        this.setState({ isActive: !isActive });
        console.log(data);
    }

    render(){
        const section = this.props.data;
        return(
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={styles.container}>
                <Button full light
                    onPress={() => {
                        this._showDetail(section);
                    }}
                    >
                    <Text>{section.symbol}</Text>
                </Button>
                <Collapsible collapsed={!this.state.isActive}>
                    <Text style={styles.text}>當前價格: {section.price_usd} USD</Text>
                    <Text style={styles.text}>過去一小時漲跌: {section.percent_change_1h} %</Text>
                    <Text style={styles.text}>過去一天漲跌: {section.percent_change_24h} %</Text>
                    <Text style={styles.text}>過去一週漲跌: {section.percent_change_7d} %</Text>
                </Collapsible>
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
            
          </Animatable.View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        padding: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        minWidth: 200,
        borderBottomWidth: 2,
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        textAlign: 'center'
    }
});

module.exports= CoinRow;