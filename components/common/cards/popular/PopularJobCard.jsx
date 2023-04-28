import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './popularjobcard.style';
import { checkImageURL } from '../../../../utils';

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      style={styles.container(selectedJob, item)}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.logoContainer(selectedJob, item)}
      >
        <Image
          source={{
            uri: !checkImageURL(item.employer_logo)
              ? item.employer_logo
              : 'https://alabiansolutions.com/images/alabian-logo.png',
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.companyName}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.jobName(selectedJob, item)}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
