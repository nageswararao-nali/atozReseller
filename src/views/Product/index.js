import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, Col, TextView, Utils, Button } from '@components';
import { colorGrayLight, colorPrimary } from '@colors';
import { Card, SearchBar } from 'react-native-elements'
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '@actions/categories';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';
import { SliderBox } from "react-native-image-slider-box";

Icon.loadFont();
MCIcon.loadFont();

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    margin: 20,
    padding: 20,
    backgroundColor: colorPrimary,
    textAlign: 'center'
  },
  routeName: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  noDataContainer: {

  },
  noDataContent: {
    color: '#b02502',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: colorPrimary,
    borderRadius: 100
  },
  floatingButtonStyle: {
    // resizeMode: 'contain',
    width: 50,
    height: 50,
    left: 10,
    top: 10

    //backgroundColor:'black'
  },
})
const Product = ({route, fetchCategoriesData, isLoading, categories, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [category, setCategory] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const product = route.params
  const images = [
    product.image,
    product.displayImage,
    product.mainImage
  ]
  console.log("images")
  console.log(images)
  console.log(route.params)
  console.log(product.items)
  const init = async () => {
    try {
      // console.log("calling categories list with date ", todayDate)
      // await fetchCategoriesData();
      // console.log(categories)
    } catch (error) {
      console.log(error);
    }
  };

  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  const gotoSubCategories = (categoryId) => {
    navigate('Products', {categoryId})
  }
  const getLocalTimeF = (isoDateTime) => {
    return new Date(isoDateTime)
  }
  /*let options = Object.keys(cities).map((item) => ({
    label: capitalize(item),
    value: item,
  }));*/

  return (
    <Layout bgColor="white">
      <ScrollView>
      {
        <View style={styles.container}>
          <View style={{marginTop: 20}}>
            <SliderBox 
            images={images} 
            sliderBoxHeight={400}
            />
          </View>
          <View style={{marginTop: 10, marginLeft: 10}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', justifyContent: 'center'}}>{product.name}</Text>
            </View>
            <View>
              <Text style={{}}>Price: ₹{product.price} </Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontWeight: 'bold', justifyContent: 'center'}}>Variants</Text>
            </View>
            {
              product.items.map((item) => 
                <View style={{}}>
                  <Text>{item.item.name}</Text>
                </View>
              )
            }
          </View>
        </View>
        
      }
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = ({ categoriesReducer: { isLoading, categories }, homeReducer: { mobile } }) => ({
  isLoading,
  categories,
  mobile
});

const mapDispatchToProps = {
  fetchCategoriesData: getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
