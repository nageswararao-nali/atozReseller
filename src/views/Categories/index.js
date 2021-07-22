import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
  catBlock: {
      flex: 1,
      justifyContent: "space-around"
  }
})
const Categories = ({ fetchCategoriesData, isLoading, categories, cartData, mobile }) => {
  const isFocused = useIsFocused();
  const { navigate, goBack } = useNavigation();
  const [category, setCategory] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const init = async () => {
    try {
      console.log("calling categories list with date ", todayDate)
      await fetchCategoriesData();
      console.log(categories)
    } catch (error) {
      console.log(error);
    }
  };

  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  useEffect(() => {
    console.log("cart Data")
    console.log(cartData)
    if(cartData.length) {
      let quantity = 0;
      let price = 0
      cartData.map((cData) => {
        // console.log("cData")
        // console.log(cData)
        quantity = quantity + cData.value;
        price = price + (cData.value * cData.price);
      })
      setTotalItems(quantity)
      setTotalPrice(price)
    }
  }, [isFocused]);

  if (isLoading) {
    return <Loader />;
  }
  const gotoSubCategories = (categoryId) => {
    // navigate('Products', {categoryId})
    navigate('SubCategories', {categoryId})
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
      {
        categories.length ?
        <View style={styles.container}>
          <FlatList 
            numColumns={2}
            columnWrapperStyle={styles.catBlock} 
            keyExtractor={(item) => { return item.id + item.name}}
            data={categories}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => gotoSubCategories(item.id)}>
                  <Card style={{width: 200}}>
                    <View>
                      <View>
                        <Image style={{width: 120, height: 120, borderRadius: 10}}  source={{uri: item.image}} />
                      </View>
                      <View>
                        <Text style={styles.routeName}>{item.name}</Text>
                      </View>
                    </View>
                    
                  </Card>
              </TouchableOpacity>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataContent}>No Categories Found</Text>
        </View>
      }
    </Layout>
  );
};

const mapStateToProps = ({ categoriesReducer: { isLoading, categories }, homeReducer: { mobile }, productsReducer: {cartData} }) => ({
  isLoading,
  categories,
  mobile,
  cartData
});

const mapDispatchToProps = {
  fetchCategoriesData: getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
