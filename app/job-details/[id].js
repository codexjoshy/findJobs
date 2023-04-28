import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hooks/useFetch';

export default function JobDetails() {
  const router = useRouter();
  const params = useSearchParams();

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
    local: params.id,
  });

  const tabs = ['About', 'Qualifications', 'Responsibilities'];

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  });

  const displayTabContents = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title={activeTab}
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No description'} />;
      case 'Responsibilities':
        return (
          <Specifics
            title={activeTab}
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              dimension={'60%'}
              handlePress={() => router.back()}
              iconUrl={icons.left}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              dimension={'60%'}
              handlePress={() => router.back()}
              iconUrl={icons.share}
            />
          ),
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : !data.length ? (
          <Text>No Data</Text>
        ) : (
          <View style={styles.content}>
            <Company
              companyLogo={data[0]?.employer_logo}
              jobTitle={data[0]?.job_title}
              companyName={data[0]?.employer_name}
              location={data[0]?.job_country}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab)}
            />
            {displayTabContents()}
          </View>
        )}
      </ScrollView>
      <JobFooter
        url={
          data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  content: {
    padding: SIZES.medium,
    paddingBottom: 100,
  },
});
