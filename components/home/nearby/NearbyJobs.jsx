import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import styles from './nearbyjobs.style';
import { useRouter } from 'expo-router';

import { NearbyJobCard } from '../../../components';
import useFetch from '../../../hooks/useFetch';
import { SIZES } from '../../../constants';
const NearbyJobs = () => {
  const router = useRouter();
  const {
    data: popularJobData,
    isLoading,
    error,
  } = useFetch('search', {
    query: 'react native',
    local: 'react native',
    num_pages: 1,
  });

  const [selectedJob] = useState('');

  const handleCardPress = (item) => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Near by Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={popularJobData}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => (
              <NearbyJobCard
                selectedJob={selectedJob}
                handleNavigate={() =>
                  router.push(`/job-details/${item.job_id}`)
                }
                item={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
