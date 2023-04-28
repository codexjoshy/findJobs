import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './tabs.style';
import { useRouter } from 'expo-router';
import { SIZES } from '../../../constants';

const TabButton = ({ name, activeTab, onHandleSearchType }) => {
  return (
    <TouchableOpacity
      onPress={onHandleSearchType}
      style={styles.btn(name, activeTab)}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
};
const Tabs = ({ tabs, setActiveTab, activeTab }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default Tabs;
