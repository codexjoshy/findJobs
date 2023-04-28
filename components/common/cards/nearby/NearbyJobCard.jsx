import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './nearbyjobcard.style';
import { checkImageURL } from '../../../../utils';

const NearbyJobCard = ({ item, handleNavigate }) => {
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.logoContainer}>
        <Image
          source={{
            uri: !checkImageURL(item?.employer_logo)
              ? item?.employer_logo
              : 'https://alabiansolutions.com/images/alabian-logo.png',
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.jobName}>
          {item?.job_title}
        </Text>
        <Text style={styles.jobType}>{item.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
