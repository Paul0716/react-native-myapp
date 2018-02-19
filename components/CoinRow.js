'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
} from 'react-native';

class CoinRow extends Component{

    constructor() {
        super();
        this._showDetail.bind(this);
    }

    _showDetail(data) {
        
    }
    // <Text style={styles.row}>{ this.props.data.name }</Text>
    render(){
        return(
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 44,
        padding: 10,
        justifyContent: 'flex-start',
    },
    row: {
        fontSize: 24,
    }
});

module.exports= CoinRow;