import React from 'react';
import { ScrollView, View } from 'react-native';

import Layout from '@components/Layout';
import { Utils, TextView } from '@components';
import { colorGrayShade3 } from '@colors';

const Account = () => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={Utils.flexGrow(1)}>
        <View style={{ ...Utils.flex(1), ...Utils.p(16) }}>
          <TextView
            color={colorGrayShade3}
            textTransform="uppercase"
            fontWeight="bold">
            Account
          </TextView>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Account;
