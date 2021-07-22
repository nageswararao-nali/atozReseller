import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils, Input, Button } from '@components';
import {
  colorDanger,
  colorPrimary,
  colorGrayShade3,
  colorSecondary,
} from '@colors';
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { registerUser } from '@actions/auth';
import { connect } from 'react-redux';

Icon.loadFont();

const Register = ({ registerUserFn }) => {
  const { navigate, goBack } = useNavigation();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched,
    // resetForm,
    // setSubmitting,
    // isSubmitting,
  } = useFormik({
    initialValues: { mobile: '', password: '', name: '', shopName: '', city: '' },
    validationSchema: object().shape({
      mobile: string().trim().required().max(10).min(10),
      password: string().trim().required().max(4).min(4),
      name: string().trim().required().max(20).min(2),
      email: string().trim().required().max(50).min(5),
      shopName: string().trim().required().max(25).min(2),
      city: string().trim().required().max(20).min(2),
    }),
  });

  const handleContinue = async () => {
    const { mobile } = values;
    console.log("values ............")
    console.log(values)
    console.log(errors)
    /*if (mobile.length !== 10) {
      setFieldTouched({ mobile: true });
      setFieldError({ mobile: 'Please enter valid mobile number' });
      return;
    }*/
    if(Object.keys(errors).length) {
      const errorData = Object.keys(errors);
      setFieldError(errors);
      return
    }
    try {
      await registerUserFn(values);
      navigate('Login');
    } catch (exception) {
      let errorMsg;
      if (exception.non_field_errors) {
        errorMsg = exception?.non_field_errors[0];
      }
      Alert.alert(
        'Error',
        errorMsg || 'Failed to send OTP. Please try again later.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={Utils.flex(1)}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <Layout bgColor="white">
        <ScrollView
          contentContainerStyle={{ ...Utils.flexGrow(1), ...Utils.px(32) }}>
          <View
            style={{
              ...Utils.flex(1),
              ...Utils.mt(50),
            }}>
            <Row>
              <Pressable onPress={() => goBack()}>
                <Icon name="arrow-back" size={24} />
              </Pressable>
            </Row>
            <TextView fontWeight={600} fontSize={24} style={Utils.my(24)}>
              Let's get you started
            </TextView>
            <TextView style={Utils.mb(16)}>Mobile number</TextView>
            <Input
              placeholder="Enter 10 digit mobile number"
              style={Utils.mb(8)}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType="numeric"
              blurOnSubmit={false}
              maxLength={10}
            />
            {touched.mobile && errors.mobile ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.mobile}
              </TextView>
            ) : null}
            <TextView style={Utils.mb(16)}>Password</TextView>
            <Input
              placeholder="Enter 4 digit Password"
              style={Utils.mb(8)}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType="numeric"
              blurOnSubmit={false}
              maxLength={4}
            />
            {touched.password && errors.password ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.password}
              </TextView>
            ) : null}
            <TextView style={Utils.mb(16)}>Name</TextView>
            <Input
              placeholder="Enter Name"
              style={Utils.mb(8)}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              blurOnSubmit={false}
              maxLength={20}
            />
            {touched.name && errors.name ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.name}
              </TextView>
            ) : null}
            <TextView style={Utils.mb(16)}>Email</TextView>
            <Input
              placeholder="Enter Email Id"
              style={Utils.mb(8)}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              blurOnSubmit={false}
              maxLength={50}
            />
            {touched.email && errors.email ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.email}
              </TextView>
            ) : null}
            <TextView style={Utils.mb(16)}>Shop Name</TextView>
            <Input
              placeholder="Enter Shop Name"
              style={Utils.mb(8)}
              onChangeText={handleChange('shopName')}
              onBlur={handleBlur('shopName')}
              value={values.shopName}
              blurOnSubmit={false}
              maxLength={25}
            />
            {touched.shopName && errors.shopName ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.shopName}
              </TextView>
            ) : null}
            <TextView style={Utils.mb(16)}>City</TextView>
            <Input
              placeholder="Enter City"
              style={Utils.mb(8)}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              blurOnSubmit={false}
              maxLength={20}
            />
            {touched.city && errors.city ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.city}
              </TextView>
            ) : null}
            {Object.keys(errors).length > 0 ? (
              <TextView color={colorDanger} fontSize={14}>
                {'Please fill all the details'}
              </TextView>
            ) : null}
            <Button style={Utils.my(16)} onPress={handleContinue}>
              <TextView textAlign="center" style={Utils.flex(1)}>
                Continue
              </TextView>
            </Button>
            <Row justifyContent="center" style={Utils.mt(32)}>
              <TextView fontWeight="bold">Create a</TextView>
              <Pressable style={Utils.ml(4)}>
                <TextView
                  fontWeight="bold"
                  color={colorPrimary}
                  textTransform="uppercase">
                  RESELLER ACCOUNT
                </TextView>
              </Pressable>
            </Row>
            <Row justifyContent="center" style={Utils.mt(32)}>
              <TextView
                fontWeight="bold"
                textTransform="uppercase"
                color={colorGrayShade3}>
                I agree to the
              </TextView>
              <Pressable style={Utils.ml(4)}>
                <TextView
                  fontWeight="bold"
                  color={colorSecondary}
                  textTransform="uppercase">
                  Privacy Policy
                </TextView>
              </Pressable>
            </Row>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = { registerUserFn: registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
