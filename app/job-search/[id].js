import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { COLORS, SIZES, icons } from '../../constants';
import { NearbyJobCard, ScreenHeaderBtn } from '../../components';

import styles from '../../styles/search';
import axios from 'axios';

export default function JobSearch() {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      let localData = await getJobLocal(params.id);
      if (localData) {
        setSearchResult(localData);
        // alert('local data was fetched');
        return;
      }
      const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/search`,
        // headers: {
        //   'X-RapidAPI-Key':
        //     'c59793d44fmsh83b924a002a55bfp13a5dbjsn4e9d28abac13',
        //   'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        // },
        headers: {
          // 'content-type': 'application/octet-stream',
          'X-RapidAPI-Key':
            '7a3fd20375mshefa4be7dab5455fp117adajsne7681e95b4e6',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      let d = response.data.data;
      setSearchResult(d);
      await saveToFile(params.id, d);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };
  const saveToFile = async (name, data) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/jobs/create',
        { name, data }
      );
      if (response) {
        // alert('result saved successfully');
      } else {
        setSearchError('unable to save result');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getJobLocal = async (name) => {
    if (!name) return false;
    try {
      let qName = slugify(name);
      const response = await axios.get(
        `http://localhost:4000/api/jobs/${qName}`
      );
      if (response) {
        return response.data?.jobs;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  const slugify = (str) =>
    str
      ?.toLowerCase()
      ?.trim()
      ?.replace(/[^\w\s-]/g, '')
      ?.replace(/[\s_-]+/g, '-')
      ?.replace(/^-+|-+$/g, '');
  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === 'right') {
      setPage(page + 1);
      handleSearch();
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <NearbyJobCard
            item={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong:</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
