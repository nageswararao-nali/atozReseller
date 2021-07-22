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
  Alert,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { getSubCategories } from '@actions/subcategories';
import { updateProductCart } from '@actions/cart';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';
import {AccordionList} from "accordion-collapse-react-native";
import InputSpinner from "react-native-input-spinner";

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
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  cartItem: {
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10
  }
})


const Items = ({ route, mobile, updateCart, cartData }) => {
  const isFocused = useIsFocused();
  const { navigate, goBack } = useNavigation();
  const [product, setCategoryId] = useState((route.params && route.params.product)? route.params.product : {});
  const [subCategoriesList, setSubCategoriesList] = useState([])
  const [activeSections, setActiveSections] = useState([])
  const categoryId = (route.params && route.params.categoryId) ? route.params.categoryId : '';
  const categoryName = (route.params && route.params.categoryName) ? route.params.categoryName : '';
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const init = async () => {
    try {
      // await fetchSubCategoriesProducts({parentId: categoryId});
      // console.log(subCategories)
      // let catsList = subCategories
      // catsList.unshift({id: 1, name: 'New', image: 'https://atoz-reseller.s3.us-east-2.amazonaws.com/product/subcategoryimage/rn_image_picker_lib_temp_df40476b-0154-4f02-b2bb-05354469ba06.jpg'})
      // setSubCategoriesList(catsList)
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
  }, [cartData]);

  const gotoProductView = () => {
    console.log("product page navigatin ....")
    navigate('Product', product)
  }
  const numChangeEvent = (num, itemId, productName, itemName) => {
    updateCart(categoryId, product.id, itemId, num, categoryName, productName, itemName, product.price)
  } 

  return (
    <Layout bgColor="white">
    <ScrollView>
    <View style={{padding:10}}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text style={{fontWeight: 'bold'}}>{product.name}</Text>
      </View>
          {
        (product.items && product.items.length > 0) ?
        <View style={styles.container}>
          <FlatList 
            keyExtractor={(item) => { return Math.random() + item.item.id}}
            data={product.items}
            renderItem={({item}) => (
              <View style={styles.cartItem}>
                {
                  
                
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{width: '20%'}}>
                    <TouchableOpacity onPress={() => gotoProductView()}>
                    <Image style={{width: 50, height: 50, borderRadius: 10}}  source={{uri: product.image}} />
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '48%'}}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
                    </View>
                    <View>
                      <Text style={{}}>{'Price: ' + product.price }</Text>
                    </View>
                  </View>
                  <View style={{width: '20%'}}>
                    <InputSpinner
                    max={item.quantity}
                    min={0}
                    step={1}
                    skin={"round"}
                    style={{minWidth: 100, height: 40}}
                    height={30}
                    colorMax={"#f04048"}
                    colorMin={colorPrimary}
                    value={item.value ? item.value : 0}
                    onChange={num => numChangeEvent(num, item.item.id, product.name, item.item.name)}
                    buttonStyle={{width: 30}}
                    inputStyle={{height: 40}}
                    typingTime={10000}
                  />
                  </View>
                  
                </View>
                
              }
              </View>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={{textAlign:'center', color: 'red'}}>{"Products Not Available"}</Text>
        </View>
      }
        </View>
    </ScrollView>
    {
      <View style={{backgroundColor: colorPrimary, height: 50}}>
        
            { /* <Icon name="cart-outline" size={30} style={styles.floatingButtonStyle} /> */ }
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between'}}>
              <View style={{marginLeft: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>Items: </Text>
                  <Text style={{fontWeight: 'bold'}}>{totalItems} </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>Price: </Text>
                  <Text style={{fontWeight: 'bold'}}>{totalPrice} </Text>
                </View>
              </View>
              <View style={{ marginBottom: 10, marginRight: 10}}>
                <TouchableOpacity
                  onPress={() => navigate('Cart')}
                  >
                  <Text>View Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          
      </View>
    }
      
    </Layout>
  );
};

const mapStateToProps = ({ subCategoriesReducer: { subCategories }, homeReducer: { mobile }, productsReducer: {isLoading, categoryProducts, cartData} }) => ({
  isLoading,
  subCategories,
  mobile,
  categoryProducts,
  cartData
});

const mapDispatchToProps = {
  fetchSubCategoriesData: getSubCategories,
  updateCart: updateProductCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
