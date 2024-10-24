// components/ReviewPopup.js

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ReviewPopup = ({ closePopup, productId }) => {
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
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.length > 0 ? (
            reviews.map((item) => (
              <View key={item.id} style={styles.reviewItem}>
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
            ))
          ) : (
            <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
          )}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  modalContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#00796B',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
  closeButton: {
    backgroundColor: '#009688',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ReviewPopup;
