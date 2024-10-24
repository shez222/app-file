// ProductPage.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ReviewPopup from '../components/ReviewPopup'; // Import the ReviewPopup component

const { width } = Dimensions.get('window');

const ProductPage = () => {
  const route = useRoute();
  const { item } = route.params;

  const [isReviewPopupVisible, setReviewPopupVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const openReviewPopup = () => {
    setReviewPopupVisible(true);
  };

  const closeReviewPopup = () => {
    setReviewPopupVisible(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00695C" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color="#FF5252"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{item.examName}</Text>
          <Text style={styles.productSubtitle}>
            {item.subjectName} ({item.subjectCode})
          </Text>

          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <Ionicons
                key={index}
                name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
                size={20}
                color="#FFD700"
              />
            ))}
            <TouchableOpacity onPress={openReviewPopup}>
              <Text style={styles.reviewCount}> ({item.reviews} reviews)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.productPrice}>${item.price}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>{item.description}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton}>
            <MaterialIcons name="add-shopping-cart" size={24} color="#FFFFFF" />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Review Popup */}
        <Modal
          visible={isReviewPopupVisible}
          animationType="slide"
          onRequestClose={closeReviewPopup}
          transparent={true}
        >
          <ReviewPopup closePopup={closeReviewPopup} productId={item.id} />
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFFFFFAA',
    borderRadius: 30,
    padding: 8,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  productTitle: {
    fontSize: 26,
    color: '#00695C',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productSubtitle: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewCount: {
    fontSize: 16,
    color: '#009688',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  productPrice: {
    fontSize: 24,
    color: '#E91E63',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#00695C',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
    marginBottom: 30,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProductPage;
