import React, { Component } from 'react';
 
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SearchHeader(props) {
  const navigation = useNavigation();
  const gotoSearch = () => {
    console.log("search clicked")
  }
    return (
 
      <View style={{ flexDirection: 'row' }}>
 
        <TouchableOpacity onPress={() => gotoSearch()}>
 
          <Text>Search</Text>
 
        </TouchableOpacity>
 
      </View>
 
    );
 
 
  
}
export default SearchHeader;