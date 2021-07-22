import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from '@views/AuthHome';
import Login from '@views/Login';
import Logout from '@views/Logout';
import Register from '@views/Register';
import VerifyOTP from '@views/VerifyOTP';
// import ChooseCity from '@views/ChooseCity';
import Categories from '@views/Categories';
import SubCategories from '@views/SubCategories';
import Products from '@views/Products';
import Items from '@views/Items';
import Cart from '@views/Cart';
import Product from '@views/Product';
import AddressForm from '@views/AddressForm';
import HomeRoutes from '@routes/home';
import SideIcon from '@views/SideMenu/sideicon';
import SearchHeader from '@views/Products/searchHeader';
import { colorGrayLight, colorPrimary } from '@colors';

const { Navigator, Screen } = createStackNavigator();

const Auth = (props) => {
  return (
    <Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colorPrimary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      { /* <Screen
        name="AuthHome"
        component={AuthHome}
        options={{ headerShown: false }}
      /> */ }
      <Screen name="Login" component={Login} options={{ headerShown: false }} /> 
      <Screen name="Register" component={Register} options={{ headerShown: false }} /> 
      <Screen name="Logout" component={Logout} options={{ headerShown: false }} /> 
      {
        /*<Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />*/
      }
      
      { <Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{ headerShown: false }}
      />  }
      
      <Screen
        name="Categories"
        component={Categories}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Categories',
          headerLeft: () => <SideIcon />,
          
        }}
      />
      <Screen
        name="SubCategories"
        component={SubCategories}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'SubCategories',
          headerTitle: () => <SearchHeader />
          
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Products',
          headerTitle: () => <SearchHeader />
          
        }}
      />
      <Screen
        name="Items"
        component={Items}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Variants'
          
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Cart'
          
        }}
      />
      <Screen
        name="Product"
        component={Product}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Product'
          
        }}
      />
      <Screen
        name="AddressForm"
        component={AddressForm}
        options={{ headerShown: false }}
      />
      <Screen
        name="Home"
        component={HomeRoutes}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default Auth;
