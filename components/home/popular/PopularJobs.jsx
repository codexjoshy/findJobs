import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import styles from './popularJobs.style';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import { PopularJobCard } from '../../../components';
import useFetch from '../../../hooks/useFetch';

const PopularJobs = () => {
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

  const [selectedJob, setSelectedJob] = useState('');

  const handleCardPress = (item) => {
    setSelectedJob(item.job_id);
    router.push(`/job-details/${item.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
              <PopularJobCard
                selectedJob={selectedJob}
                handleCardPress={() => handleCardPress(item)}
                item={item}
              />
            )}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
