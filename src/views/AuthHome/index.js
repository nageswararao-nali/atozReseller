import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Utils, Row, BrandLogo, Button, TextView } from '@components';
import { colorPrimary, colorGrayShade3 } from '@colors';
import Logo from '@images/logo.png';

const AuthHome = () => {
  const { navigate } = useNavigation();

  return (
    <Layout bgColor="white">
      <ScrollView contentContainerStyle={Utils.flexGrow(1)}>
        <View style={{ ...Utils.flex(1), ...Utils.mt(60) }}>
          <Row justifyContent="center">
            <TextView 
            fontWeight="bold"
            color={colorPrimary}
            textTransform="uppercase"> Reseller App </TextView>
          </Row>
          <Row justifyContent="center">
            <BrandLogo source={Logo} />
          </Row>
          <Row justifyContent="center" style={Utils.mt(60)}>
            <Button
              onPress={() => navigate('AtoZ', {screen: 'Login'})}
              style={{
                ...Utils.width('50%'),
                ...Utils.justifyContent('center'),
              }}>
              <TextView>Login</TextView>
            </Button>
          </Row>
          {
          
          
          <Pressable
            style={{ ...Utils.mt(32), ...Utils.alignItems('center') }}
            onPress={() => navigate('AtoZ',{screen: 'Register'})}>
            <TextView
              color={colorGrayShade3}
              textTransform="uppercase"
              fontWeight="bold">
              Register
            </TextView>
          </Pressable>
          
          }
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AuthHome;
