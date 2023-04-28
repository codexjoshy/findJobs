import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState } from 'react';

import { COLORS, SIZES, icons, images } from '../constants';
import { Stack, useRouter } from 'expo-router';

import {
  NearbyJobs,
  PopularJobs,
  ScreenHeaderBtn,
  Welcome,
} from '../components';

function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
          ),
          headerTitle: '',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={(value) => setSearchTerm(value)}
            handleSearch={() => {
              if (searchTerm) {
                router.push(`/job-search/${searchTerm}`);
              } else {
              }
            }}
          />
          <PopularJobs />
          <NearbyJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
});
