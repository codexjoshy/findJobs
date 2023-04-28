import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import styles from './welcome.style';
import { useRouter } from 'expo-router';
import { SIZES, icons } from '../../../constants';

const Welcome = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const router = useRouter();
  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract'];
  const [activeJob, setActiveJob] = useState('Full-time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Josh</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What would you like to search"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
          <Image
            resizeMode="contain"
            style={styles.searchBtnImage}
            source={icons.search}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item: job }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveJob(job);
                router.push(`/job-search/${job}`);
              }}
              style={styles.tab(activeJob, job)}
            >
              <Text style={styles.tabText(activeJob, job)}>{job}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
