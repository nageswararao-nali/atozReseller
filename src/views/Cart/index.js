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
  PermissionsAndroid,
  Alert,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { getSubCategories } from '@actions/subcategories';
import { getSubCategoriesProducts, updateProductCart, clearCart } from '@actions/products';
import { bookOrder } from '@actions/order';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';
import {AccordionList} from "accordion-collapse-react-native";
import InputSpinner from "react-native-input-spinner";

import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const {config, fs} = RNFetchBlob;
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
  touchableOpacityStyle: {
    position: 'absolute',
    width: '90%',
    height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    // right: 30,
    bottom: 30,
    backgroundColor: colorPrimary,
    borderRadius: 10,
    // marginRight: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  floatingButtonStyle: {
    // resizeMode: 'contain',
    width: 50,
    height: 50,
    left: 10,
    top: 10

    //backgroundColor:'black'
  },
  floatingCartStyle: {
    // resizeMode: 'contain',
    // width: 50,
    // height: 50,
    // left: 10,
    // top: 10

    //backgroundColor:'black'
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


const Cart = ({ route, cartData, updateCart, bookOrderFn, orderDocumentUrl, clearCartFn, isLoading }) => {
  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isPlaceOrder, setIsPlaceOrder] = useState(false)
  
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
    // init();
    return () => {};
  }, []);

  useEffect(() => {
    if(cartData.length) {
      updateCartData()
    }
  }, [isFocused]);

  useEffect(() => {
    console.log("cart update")
    if(cartData.length) {
      updateCartData()
    }
  }, [cartData]);

  const updateCartData = () => {
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
  
  useEffect(() => {
    if(orderDocumentUrl) {
      console.log("order doucment .......", orderDocumentUrl)
      checkPermissionsPdf()
    }
  }, [orderDocumentUrl])

  const downloadPdf = async () => {
    if(orderDocumentUrl) {
      var pdf_url = orderDocumentUrl;
      let PictureDir = fs.dirs.DownloadDir;
      let date = new Date();
      let dFilePath = PictureDir +
            '/order_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) 
           +'.pdf';
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            dFilePath,
          description: 'Order Document',
        },
      };
      
      RNFetchBlob
        .fetch('GET', pdf_url)
        .then(res => {
          //Showing alert after successful downloading
          // console.log('res -> ', JSON.stringify(res));
          setIsPlaceOrder(false)
          console.log(`file://${dFilePath}`)
          let base64Str = res.base64()
          console.log(base64Str)
          let type = 'application/pdf';
          Share.open({
                url: `data:${type};base64,  ${base64Str}`,
                  type: 'application/pdf',
                  showAppsToView: true,
                  title: 'order doc'
            }).then((res1) => {
              console.log("share success res");
              console.log(res1);
              clearCartFn()
              navigate('Categories')
            })
            .catch((err) => {
              console.log("share err");
              console.log(err);
              clearCartFn()
              navigate('Categories')
            });
          // Alert.alert('Order Document Downloaded');
          // 
        });
    } else {
      Alert.alert('Problem in Downloading Order Document');
    }
      
  }

  const checkPermissionsPdf = () => {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === 'ios') {
      downloadPdf();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'storage title',
            message:'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            downloadPdf();
          } else {
            //If permission denied then show alert 'Storage Permission  Not Granted'
           Alert.alert('storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  }
  
  if (isLoading) {
    return <Loader />;
  }
  
  const numChangeEvent = (num, cartItem) => {
    console.log("in change num")
    updateCart(cartItem.categoryId, cartItem.productId, cartItem.itemId, num, cartItem.categoryName, cartItem.productName, cartItem.itemName, cartItem.price)
  } 
  const placeOrder = async () => {
    console.log("cartData")
    console.log(cartData)
    setIsPlaceOrder(true)
    await bookOrderFn({cart: cartData})

  }
  const _head = (item) => {
    return(
      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:'20%'}}>
            <Image style={{width: 30, height: 30, borderRadius: 10}}  source={{uri: item.image}} />
          </View>
          <View>
            <Text style={styles.routeName}>{item.name}</Text>
          </View>
        </View>
      </Card>
    );
  }

  

  return (
    <Layout bgColor="white">
    <ScrollView>
    {
      cartData.length > 0 &&
     <FlatList 
            keyExtractor={(item) => { return item.itemName + item.productName}}
            data={cartData}
            renderItem={({item}) => (
              <View style={styles.cartItem}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <View style={{width: '70%'}}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>{item.itemName + " - " +item.productName} </Text>
                    </View>
                    <View>
                      <Text style={{}}>{'Price: ' + item.price }</Text>
                    </View>
                    <View>
                      <Text style={{}}>{item.categoryName }</Text>
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
                    onChange={num => numChangeEvent(num, item)}
                    buttonStyle={{width: 30}}
                    inputStyle={{height: 40}}
                    typingTime={10000}
                  />
                  </View>
                  
                </View>
              
              </View>
              )}
          />
    }
    
    </ScrollView>
    {
      <View style={{backgroundColor: colorPrimary, height: 50, marginTop: 10}}>
        
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
                  onPress={() => placeOrder()}
                  disabled={isPlaceOrder}
                  >
                  <Text>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          
      </View>
    }
      
    </Layout>
  );
};

const mapStateToProps = ({ subCategoriesReducer: { subCategories }, homeReducer: { mobile }, productsReducer: { categoryProducts, cartData, updateProductCart}, orderReducer: {isLoading, orderDocumentUrl} }) => ({
  isLoading,
  subCategories,
  mobile,
  categoryProducts,
  cartData,
  orderDocumentUrl
});

const mapDispatchToProps = {
  fetchSubCategoriesData: getSubCategories,
  fetchSubCategoriesProducts: getSubCategoriesProducts,
  updateCart: updateProductCart,
  bookOrderFn: bookOrder,
  clearCartFn: clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
