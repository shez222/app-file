// components/ReviewSection.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewSection = ({ productId }) => {
  // Sample reviews data
  const reviews = [
    {
      id: '1',
      userName: 'Alice Johnson',
      rating: 5,
      comment: 'This course was extremely helpful and well-structured.',
      date: 'September 20, 2023',
    },
    {
      id: '2',
      userName: 'Bob Smith',
      rating: 4,
      comment: 'Great content, but could use more practice problems.',
      date: 'August 15, 2023',
    },
    {
      id: '3',
      userName: 'Carol Williams',
      rating: 5,
      comment: 'Absolutely loved it! The instructor was fantastic.',
      date: 'July 10, 2023',
    },
    // Add more reviews as needed
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }, (_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>{item.date}</Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.reviewSection}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.reviewList}
        ListEmptyComponent={
          <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#00796B',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reviewList: {
    paddingBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#00796B',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#757575',
    marginVertical: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReviewSection;
