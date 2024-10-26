// src/screens/MarketPage.js

import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Vibration,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash'; // Ensure lodash is installed
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';
import { CartContext } from '../contexts/CartContext'; // Corrected path
import  CustomHeader  from '../components/CustomHeader'

const MarketPage = () => {
  const navigation = useNavigation();

  // Get theme from context
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  // Access cart context
  const { cartItems, addToCart } = useContext(CartContext);

  // Sample data with unique ids
  const data = [
    {
      id: '1',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      examName: 'Calculus I',
      image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg',
      description: 'An introduction to differential and integral calculus.',
      rating: 4.5,
      reviews: 120,
      price: '29.99',
    },
    {
      id: '2',
      subjectName: 'Physics',
      subjectCode: 'PHYS201',
      examName: 'Classical Mechanics',
      image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg',
      description: 'Study of motion and forces in classical physics.',
      rating: 4.0,
      reviews: 85,
      price: '24.99',
    },
    {
      id: '3',
      subjectName: 'Chemistry',
      subjectCode: 'CHEM301',
      examName: 'Organic Chemistry',
      image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg',
      description: 'Exploration of the structure and reactions of organic compounds.',
      rating: 4.7,
      reviews: 200,
      price: '34.99',
    },
    {
      id: '4',
      subjectName: 'Biology',
      subjectCode: 'BIOL101',
      examName: 'Genetics',
      image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
      description: 'Introduction to genetic principles and practices.',
      rating: 4.3,
      reviews: 95,
      price: '27.99',
    },
    {
      id: '5',
      subjectName: 'Computer Science',
      subjectCode: 'CS202',
      examName: 'Data Structures',
      image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
      description: 'Study of data organization and manipulation.',
      rating: 4.8,
      reviews: 150,
      price: '39.99',
    },
    {
      id: '6',
      subjectName: 'History',
      subjectCode: 'HIST101',
      examName: 'World History',
      image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
      description: 'Comprehensive overview of world historical events.',
      rating: 4.2,
      reviews: 110,
      price: '22.99',
    },
    {
      id: '7',
      subjectName: 'Literature',
      subjectCode: 'LIT202',
      examName: 'Modern Literature',
      image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
      description: 'Study of literary works from the modern era.',
      rating: 4.6,
      reviews: 130,
      price: '25.99',
    },
    {
      id: '8',
      subjectName: 'Economics',
      subjectCode: 'ECON301',
      examName: 'Microeconomics',
      image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
      description: 'Analysis of individual and business decision-making.',
      rating: 4.4,
      reviews: 100,
      price: '28.99',
    },
    {
      id: '9',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      examName: 'Calculus I',
      image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
      description: 'An introduction to differential and integral calculus.',
      rating: 4.5,
      reviews: 120,
      price: '29.99',
    },
    {
      id: '10',
      subjectName: 'Physics',
      subjectCode: 'PHYS201',
      examName: 'Classical Mechanics',
      image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Study of motion and forces in classical physics.',
      rating: 4.0,
      reviews: 85,
      price: '24.99',
    },
    {
      id: '11',
      subjectName: 'Chemistry',
      subjectCode: 'CHEM301',
      examName: 'Organic Chemistry',
      image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Exploration of the structure and reactions of organic compounds.',
      rating: 4.7,
      reviews: 200,
      price: '34.99',
    },
    {
      id: '12',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      examName: 'Calculus I',
      image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
      description: 'An introduction to differential and integral calculus.',
      rating: 4.5,
      reviews: 120,
      price: '29.99',
    },
    {
      id: '13',
      subjectName: 'Physics',
      subjectCode: 'PHYS201',
      examName: 'Classical Mechanics',
      image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Study of motion and forces in classical physics.',
      rating: 4.0,
      reviews: 85,
      price: '24.99',
    },
    {
      id: '14',
      subjectName: 'Chemistry',
      subjectCode: 'CHEM301',
      examName: 'Organic Chemistry',
      image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Exploration of the structure and reactions of organic compounds.',
      rating: 4.7,
      reviews: 200,
      price: '34.99',
    },
    {
      id: '15',
      subjectName: 'Mathematics',
      subjectCode: 'MATH101',
      examName: 'Calculus I',
      image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
      description: 'An introduction to differential and integral calculus.',
      rating: 4.5,
      reviews: 120,
      price: '29.99',
    },
    {
      id: '16',
      subjectName: 'Physics',
      subjectCode: 'PHYS201',
      examName: 'Classical Mechanics',
      image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Study of motion and forces in classical physics.',
      rating: 4.0,
      reviews: 85,
      price: '24.99',
    },
    {
      id: '17',
      subjectName: 'Chemistry',
      subjectCode: 'CHEM301',
      examName: 'Organic Chemistry',
      image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      description: 'Exploration of the structure and reactions of organic compounds.',
      rating: 4.7,
      reviews: 200,
      price: '34.99',
    },
    // Add more items as needed with unique ids
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Default');
  const [favorites, setFavorites] = useState([]); // State for favorite items

  const { width } = useWindowDimensions();

  // Determine number of columns based on screen width
  const getNumberOfColumns = () => {
    if (width <= 375) return 1; // Single column for small screens
    if (width <= 800) return 2; // Two columns for medium screens
    if (width <= 1200) return 3; // Three columns for large screens
    return 4; // Four columns for extra large screens
  };

  const numColumns = getNumberOfColumns();

  // Debounced search handler
  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedFilter(text);
  };

  const filterData = (text) => {
    const newData = data.filter((item) => {
      const itemData = `
        ${item.subjectName.toUpperCase()}
        ${item.subjectCode.toUpperCase()}
        ${item.examName.toUpperCase()}
      `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setFilteredData(sortData(newData, sortOption));
  };

  const debouncedFilter = useCallback(debounce(filterData, 300), [sortOption]);

  const sortData = (dataToSort, option) => {
    let sortedData = [...dataToSort];
    if (option === 'Name (A-Z)') {
      sortedData.sort((a, b) => a.examName.localeCompare(b.examName));
    } else if (option === 'Name (Z-A)') {
      sortedData.sort((a, b) => b.examName.localeCompare(a.examName));
    } else if (option === 'Price (Low to High)') {
      sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === 'Price (High to Low)') {
      sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return sortedData;
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setFilteredData(sortData(filteredData, option));
    setSortModalVisible(false);
  };

  const handleAddToCart = (item) => {
    const added = addToCart(item);
    if (added) {
      Alert.alert('Success', `${item.examName} has been added to your cart.`);
    } else {
      Alert.alert('Info', `${item.examName} is already in your cart.`);
    }
  };

  const handleToggleFavorite = (item) => {
    if (favorites.includes(item.id)) {
      // Remove from favorites
      setFavorites(favorites.filter((favId) => favId !== item.id));
    } else {
      // Add to favorites
      setFavorites([...favorites, item.id]);
    }
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <View
        style={[
          styles.card,
          { backgroundColor: currentTheme.cardBackground, width: getCardWidth() },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductPage', { item })}
          accessibilityLabel={`View details for ${item.examName}`}
          activeOpacity={0.8}
          style={styles.cardTouchable}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          {/* Favorite Icon */}
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => handleToggleFavorite(item)}
            accessibilityLabel={
              isFavorite
                ? `Remove ${item.examName} from favorites`
                : `Add ${item.examName} to favorites`
            }
            accessibilityRole="button"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#E91E63' : currentTheme.placeholderTextColor}
            />
          </TouchableOpacity>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: currentTheme.cardTextColor }]}>
              {item.examName}
            </Text>
            <Text style={[styles.cardSubtitle, { color: currentTheme.textColor }]}>
              {item.subjectName} ({item.subjectCode})
            </Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }, (_, index) => (
                <Ionicons
                  key={index}
                  name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
                  size={16}
                  color="#FFD700"
                />
              ))}
              <Text style={[styles.reviewCount, { color: currentTheme.textColor }]}>
                {' '}
                ({item.reviews})
              </Text>
            </View>
            <Text style={[styles.cardPrice, { color: currentTheme.cardTextColor }]}>
              ${item.price}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Cart Icon */}
        <TouchableOpacity
          style={[styles.cartIcon, { backgroundColor: currentTheme.primaryColor }]}
          onPress={() => handleAddToCart(item)}
          accessibilityLabel={`Add ${item.examName} to Cart`}
          accessibilityRole="button"
        >
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const getCardWidth = () => {
    // Calculate card width based on number of columns and screen width
    const totalMargin = 20 * (numColumns + 1); // 20 is the horizontal margin between cards
    const availableWidth = width - totalMargin;
    return availableWidth / numColumns;
  };

  useEffect(() => {
    // Initial sort based on default option
    setFilteredData(sortData(filteredData, sortOption));
    return () => {
      debouncedFilter.cancel();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <StatusBar
        backgroundColor={currentTheme.headerBackground[1]}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
        <CustomHeader />

      <View style={styles.header}>
        {/* Gradient Overlay */}
        <LinearGradient
          colors={currentTheme.headerBackground}
          style={styles.headerGradient}
          start={[0, 0]}
          end={[0, 1]}
        />
        <Text style={[styles.title, { color: currentTheme.headerTextColor }]}>
          Marketplace
        </Text>
        {/* Cart Button in Header with Badge */}
        {/* <TouchableOpacity
          style={styles.headerCartButton}
          onPress={() => navigation.navigate('CartPage')}
          accessibilityLabel="Go to Cart"
          accessibilityRole="button"
        >
          <Ionicons name="cart-outline" size={28} color={currentTheme.arrowColor} />
          {cartItems.length > 0 && (
            <View style={styles.headerCartBadge}>
              <Text style={styles.headerCartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity> */}
      </View>
      <View style={styles.searchSortContainer}>
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: currentTheme.cardBackground },
          ]}
        >
          <Ionicons
            name="search"
            size={24}
            color={currentTheme.placeholderTextColor}
            style={styles.searchIcon}
            accessibilityLabel="Search Icon"
          />
          <TextInput
            style={[styles.searchInput, { color: currentTheme.textColor }]}
            placeholder="Search by subject, code, or exam name"
            placeholderTextColor={currentTheme.placeholderTextColor}
            value={searchQuery}
            onChangeText={handleSearch}
            accessibilityLabel="Search Input"
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.sortButton,
            { backgroundColor: currentTheme.primaryColor },
          ]}
          onPress={() => setSortModalVisible(true)}
          accessibilityLabel="Sort Button"
          accessibilityRole="button"
        >
          <MaterialIcons name="sort" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      {sortModalVisible && (
        <Modal
          visible={sortModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSortModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: currentTheme.cardBackground },
              ]}
            >
              <Text style={[styles.modalTitle, { color: currentTheme.cardTextColor }]}>
                Sort By
              </Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Name (A-Z)')}
                accessibilityLabel="Sort by Name A-Z"
                accessibilityRole="button"
              >
                <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
                  Name (A-Z)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Name (Z-A)')}
                accessibilityLabel="Sort by Name Z-A"
                accessibilityRole="button"
              >
                <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
                  Name (Z-A)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Price (Low to High)')}
                accessibilityLabel="Sort by Price Low to High"
                accessibilityRole="button"
              >
                <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
                  Price (Low to High)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Price (High to Low)')}
                accessibilityLabel="Sort by Price High to Low"
                accessibilityRole="button"
              >
                <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
                  Price (High to Low)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Default')}
                accessibilityLabel="Sort by Default"
                accessibilityRole="button"
              >
                <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
                  Default
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id} // Ensure each id is unique
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          numColumns === 1 && styles.singleColumnContent, // Center items for single column
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search"
              size={80}
              color={currentTheme.placeholderTextColor}
            />
            <Text style={[styles.emptyText, { color: currentTheme.textColor }]}>
              No results found.
            </Text>
          </View>
        }
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        key={numColumns} // Re-render FlatList when numColumns changes
      />
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    zIndex: 1,
  },
  headerCartButton: {
    position: 'absolute',
    right: 15,
    top: 40,
    padding: 5,
  },
  headerCartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#E53935', // Red color for badge
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    height: 60,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  sortButton: {
    marginLeft: 10,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  singleColumnContent: {
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    // width is set dynamically
    elevation: 3,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    backgroundColor: '#fff',
    // Responsive adjustments
    minHeight: 300,
  },
  cardTouchable: {
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 5,
  },
  cartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#009688', // Can use currentTheme.primaryColor
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    marginLeft: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 15,
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MarketPage;














// // src/screens/MarketPage.js

// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   Modal,
//   TouchableWithoutFeedback,
//   Alert,
// } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { debounce } from 'lodash'; // Ensure lodash is installed

// import { ThemeContext } from '../../ThemeContext';
// import { lightTheme, darkTheme } from '../../themes';
// import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// import { CartContext } from '../contexts/CartContext'; // Corrected path

// const { width, height } = Dimensions.get('window');

// const MarketPage = () => {
//   const navigation = useNavigation();

//   // Get theme from context
//   const { theme } = useContext(ThemeContext);
//   const currentTheme = theme === 'light' ? lightTheme : darkTheme;

//   // Access cart context
//   const { cartItems, addToCart } = useContext(CartContext);

//   // Sample data with unique ids
//   const data = [
//     {
//       id: '1',
//       subjectName: 'Mathematics',
//       subjectCode: 'MATH101',
//       examName: 'Calculus I',
//       image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg',
//       description: 'An introduction to differential and integral calculus.',
//       rating: 4.5,
//       reviews: 120,
//       price: '29.99',
//     },
//     {
//       id: '2',
//       subjectName: 'Physics',
//       subjectCode: 'PHYS201',
//       examName: 'Classical Mechanics',
//       image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg',
//       description: 'Study of motion and forces in classical physics.',
//       rating: 4.0,
//       reviews: 85,
//       price: '24.99',
//     },
//     {
//       id: '3',
//       subjectName: 'Chemistry',
//       subjectCode: 'CHEM301',
//       examName: 'Organic Chemistry',
//       image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg',
//       description: 'Exploration of the structure and reactions of organic compounds.',
//       rating: 4.7,
//       reviews: 200,
//       price: '34.99',
//     },
//     {
//       id: '4',
//       subjectName: 'Biology',
//       subjectCode: 'BIOL101',
//       examName: 'Genetics',
//       image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
//       description: 'Introduction to genetic principles and practices.',
//       rating: 4.3,
//       reviews: 95,
//       price: '27.99',
//     },
//     {
//       id: '5',
//       subjectName: 'Computer Science',
//       subjectCode: 'CS202',
//       examName: 'Data Structures',
//       image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
//       description: 'Study of data organization and manipulation.',
//       rating: 4.8,
//       reviews: 150,
//       price: '39.99',
//     },
//     {
//       id: '6',
//       subjectName: 'History',
//       subjectCode: 'HIST101',
//       examName: 'World History',
//       image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
//       description: 'Comprehensive overview of world historical events.',
//       rating: 4.2,
//       reviews: 110,
//       price: '22.99',
//     },
//     {
//       id: '7',
//       subjectName: 'Literature',
//       subjectCode: 'LIT202',
//       examName: 'Modern Literature',
//       image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
//       description: 'Study of literary works from the modern era.',
//       rating: 4.6,
//       reviews: 130,
//       price: '25.99',
//     },
//     {
//       id: '8',
//       subjectName: 'Economics',
//       subjectCode: 'ECON301',
//       examName: 'Microeconomics',
//       image: 'https://th.bing.com/th/id/OIP.OQ6VVpQlGtFPkDJsw72k2gHaIz?rs=1&pid=ImgDetMain', // Replace with actual image URL
//       description: 'Analysis of individual and business decision-making.',
//       rating: 4.4,
//       reviews: 100,
//       price: '28.99',
//     },
//     {
//       id: '9',
//       subjectName: 'Mathematics',
//       subjectCode: 'MATH101',
//       examName: 'Calculus I',
//       image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
//       description: 'An introduction to differential and integral calculus.',
//       rating: 4.5,
//       reviews: 120,
//       price: '29.99',
//     },
//     {
//       id: '10',
//       subjectName: 'Physics',
//       subjectCode: 'PHYS201',
//       examName: 'Classical Mechanics',
//       image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Study of motion and forces in classical physics.',
//       rating: 4.0,
//       reviews: 85,
//       price: '24.99',
//     },
//     {
//       id: '11',
//       subjectName: 'Chemistry',
//       subjectCode: 'CHEM301',
//       examName: 'Organic Chemistry',
//       image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Exploration of the structure and reactions of organic compounds.',
//       rating: 4.7,
//       reviews: 200,
//       price: '34.99',
//     },
//     {
//       id: '12',
//       subjectName: 'Mathematics',
//       subjectCode: 'MATH101',
//       examName: 'Calculus I',
//       image: 'https://img.freepik.com/free-psd/science-class-print-template_23-2148990557.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
//       description: 'An introduction to differential and integral calculus.',
//       rating: 4.5,
//       reviews: 120,
//       price: '29.99',
//     },
//     {
//       id: '13',
//       subjectName: 'Physics',
//       subjectCode: 'PHYS201',
//       examName: 'Classical Mechanics',
//       image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Study of motion and forces in classical physics.',
//       rating: 4.0,
//       reviews: 85,
//       price: '24.99',
//     },
//     {
//       id: '14',
//       subjectName: 'Chemistry',
//       subjectCode: 'CHEM301',
//       examName: 'Organic Chemistry',
//       image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Exploration of the structure and reactions of organic compounds.',
//       rating: 4.7,
//       reviews: 200,
//       price: '34.99',
//     },
//     {
//       id: '15',
//       subjectName: 'Mathematics',
//       subjectCode: 'MATH101',
//       examName: 'Calculus I',
//       image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
//       description: 'An introduction to differential and integral calculus.',
//       rating: 4.5,
//       reviews: 120,
//       price: '29.99',
//     },
//     {
//       id: '16',
//       subjectName: 'Physics',
//       subjectCode: 'PHYS201',
//       examName: 'Classical Mechanics',
//       image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Study of motion and forces in classical physics.',
//       rating: 4.0,
//       reviews: 85,
//       price: '24.99',
//     },
//     {
//       id: '17',
//       subjectName: 'Chemistry',
//       subjectCode: 'CHEM301',
//       examName: 'Organic Chemistry',
//       image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
//       description: 'Exploration of the structure and reactions of organic compounds.',
//       rating: 4.7,
//       reviews: 200,
//       price: '34.99',
//     },
//     // Add more items as needed with unique ids
//   ];

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState(data);
//   const [sortModalVisible, setSortModalVisible] = useState(false);
//   const [sortOption, setSortOption] = useState('Default');
//   const [favorites, setFavorites] = useState([]); // State for favorite items

//   // Debounced search handler
//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     debouncedFilter(text);
//   };

//   const filterData = (text) => {
//     const newData = data.filter((item) => {
//       const itemData = `
//         ${item.subjectName.toUpperCase()}
//         ${item.subjectCode.toUpperCase()}
//         ${item.examName.toUpperCase()}
//       `;
//       const textData = text.toUpperCase();

//       return itemData.indexOf(textData) > -1;
//     });

//     setFilteredData(sortData(newData, sortOption));
//   };

//   const debouncedFilter = debounce(filterData, 300);

//   const sortData = (dataToSort, option) => {
//     let sortedData = [...dataToSort];
//     if (option === 'Name (A-Z)') {
//       sortedData.sort((a, b) => a.examName.localeCompare(b.examName));
//     } else if (option === 'Name (Z-A)') {
//       sortedData.sort((a, b) => b.examName.localeCompare(a.examName));
//     } else if (option === 'Price (Low to High)') {
//       sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//     } else if (option === 'Price (High to Low)') {
//       sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//     }
//     return sortedData;
//   };

//   const handleSortOption = (option) => {
//     setSortOption(option);
//     setFilteredData(sortData(filteredData, option));
//     setSortModalVisible(false);
//   };

//   const handleToggleFavorite = (item) => {
//     if (favorites.includes(item.id)) {
//       // Remove from favorites
//       setFavorites(favorites.filter((favId) => favId !== item.id));
//     } else {
//       // Add to favorites
//       setFavorites([...favorites, item.id]);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isFavorite = favorites.includes(item.id);
//     return (
//       <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ProductPage', { item })}
//           accessibilityLabel={`View details for ${item.examName}`}
//           activeOpacity={0.8}
//         >
//           <Image source={{ uri: item.image }} style={styles.cardImage} />
//           {/* Favorite Icon */}
//           <TouchableOpacity
//             style={styles.favoriteIcon}
//             onPress={() => handleToggleFavorite(item)}
//             accessibilityLabel={isFavorite ? `Remove ${item.examName} from favorites` : `Add ${item.examName} to favorites`}
//             accessibilityRole="button"
//           >
//             <Ionicons
//               name={isFavorite ? 'heart' : 'heart-outline'}
//               size={24}
//               color={isFavorite ? '#E91E63' : currentTheme.placeholderTextColor}
//             />
//           </TouchableOpacity>
//           <View style={styles.cardContent}>
//             <Text style={[styles.cardTitle, { color: currentTheme.cardTextColor }]}>
//               {item.examName}
//             </Text>
//             <Text style={[styles.cardSubtitle, { color: currentTheme.textColor }]}>
//               {item.subjectName} ({item.subjectCode})
//             </Text>
//             <View style={styles.ratingContainer}>
//               {Array.from({ length: 5 }, (_, index) => (
//                 <Ionicons
//                   key={index}
//                   name={index < Math.floor(item.rating) ? 'star' : 'star-outline'}
//                   size={16}
//                   color="#FFD700"
//                 />
//               ))}
//               <Text style={[styles.reviewCount, { color: currentTheme.textColor }]}>
//                 {' '}
//                 ({item.reviews})
//               </Text>
//             </View>
//             <Text style={[styles.cardPrice, { color: currentTheme.cardTextColor }]}>
//               ${item.price}
//             </Text>
//           </View>
//         </TouchableOpacity>
//         {/* Cart Icon */}
//         <TouchableOpacity
//           style={[styles.cartIcon, { backgroundColor: currentTheme.primaryColor }]}
//           onPress={() => addToCart(item)} // Using context's addToCart
//           accessibilityLabel={`Add ${item.examName} to Cart`}
//           accessibilityRole="button"
//         >
//           <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   useEffect(() => {
//     // Initial sort based on default option
//     setFilteredData(sortData(filteredData, sortOption));
//     return () => {
//       debouncedFilter.cancel();
//     };
//   }, []);

//   return (
//     <View
//       style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}
//     >
//       <StatusBar
//         backgroundColor={currentTheme.headerBackground[1]}
//         barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
//       />
//       <View style={styles.header}>
//         {/* Gradient Overlay */}
//         <LinearGradient
//           colors={currentTheme.headerBackground}
//           style={styles.headerGradient}
//           start={[0, 0]}
//           end={[0, 1]}
//         />
//         <Text style={[styles.title, { color: currentTheme.headerTextColor }]}>
//           Marketplace
//         </Text>
//         {/* Cart Button in Header with Badge */}
//         <TouchableOpacity
//           style={styles.headerCartButton}
//           onPress={() => navigation.navigate('CartPage')}
//           accessibilityLabel="Go to Cart"
//           accessibilityRole="button"
//         >
//           <Ionicons name="cart-outline" size={28} color={currentTheme.arrowColor} />
//           {cartItems.length > 0 && (
//             <View style={styles.headerCartBadge}>
//               <Text style={styles.headerCartBadgeText}>{cartItems.length}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//       <View style={styles.searchSortContainer}>
//         <View
//           style={[
//             styles.searchContainer,
//             { backgroundColor: currentTheme.cardBackground },
//           ]}
//         >
//           <Ionicons
//             name="search"
//             size={24}
//             color={currentTheme.placeholderTextColor}
//             style={styles.searchIcon}
//             accessibilityLabel="Search Icon"
//           />
//           <TextInput
//             style={[styles.searchInput, { color: currentTheme.textColor }]}
//             placeholder="Search by subject, code, or exam name"
//             placeholderTextColor={currentTheme.placeholderTextColor}
//             value={searchQuery}
//             onChangeText={handleSearch}
//             accessibilityLabel="Search Input"
//             returnKeyType="search"
//           />
//         </View>
//         <TouchableOpacity
//           style={[
//             styles.sortButton,
//             { backgroundColor: currentTheme.primaryColor },
//           ]}
//           onPress={() => setSortModalVisible(true)}
//           accessibilityLabel="Sort Button"
//           accessibilityRole="button"
//         >
//           <MaterialIcons name="sort" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Sort Modal */}
//       {sortModalVisible && (
//         <Modal
//           visible={sortModalVisible}
//           animationType="fade"
//           transparent={true}
//           onRequestClose={() => setSortModalVisible(false)}
//         >
//           <View style={styles.modalBackground}>
//             <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
//               <View style={styles.modalOverlay} />
//             </TouchableWithoutFeedback>
//             <View
//               style={[
//                 styles.modalContent,
//                 { backgroundColor: currentTheme.cardBackground },
//               ]}
//             >
//               <Text style={[styles.modalTitle, { color: currentTheme.cardTextColor }]}>
//                 Sort By
//               </Text>
//               <TouchableOpacity
//                 style={styles.modalOption}
//                 onPress={() => handleSortOption('Name (A-Z)')}
//                 accessibilityLabel="Sort by Name A-Z"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
//                   Name (A-Z)
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalOption}
//                 onPress={() => handleSortOption('Name (Z-A)')}
//                 accessibilityLabel="Sort by Name Z-A"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
//                   Name (Z-A)
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalOption}
//                 onPress={() => handleSortOption('Price (Low to High)')}
//                 accessibilityLabel="Sort by Price Low to High"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
//                   Price (Low to High)
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalOption}
//                 onPress={() => handleSortOption('Price (High to Low)')}
//                 accessibilityLabel="Sort by Price High to Low"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
//                   Price (High to Low)
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalOption}
//                 onPress={() => handleSortOption('Default')}
//                 accessibilityLabel="Sort by Default"
//                 accessibilityRole="button"
//               >
//                 <Text style={[styles.modalOptionText, { color: currentTheme.textColor }]}>
//                   Default
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item.id} // Now each id is unique
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="search"
//               size={80}
//               color={currentTheme.placeholderTextColor}
//             />
//             <Text style={[styles.emptyText, { color: currentTheme.textColor }]}>
//               No results found.
//             </Text>
//           </View>
//         }
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       />
//     </View>
//   );
// };

// const cardWidth = (width - 60) / 2; // Adjust based on screen width

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     position: 'relative',
//     height: 150,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerGradient: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     zIndex: 1,
//   },
//   headerCartButton: {
//     position: 'absolute',
//     right: 15,
//     top: 40,
//     padding: 5,
//   },
//   headerCartBadge: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     backgroundColor: '#E53935', // Red color for badge
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerCartBadgeText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   searchSortContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: -30,
//     marginHorizontal: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     flex: 1,
//     height: 60,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 18,
//   },
//   sortButton: {
//     marginLeft: 10,
//     padding: 16,
//     borderRadius: 30,
//     elevation: 5,
//   },
//   listContent: {
//     paddingBottom: 20,
//     paddingHorizontal: 10,
//     paddingTop: 10,
//   },
//   card: {
//     borderRadius: 10,
//     marginBottom: 15,
//     marginHorizontal: 10,
//     width: cardWidth,
//     elevation: 3,
//     overflow: 'hidden',
//     // Shadow for iOS
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     // Shadow for Android
//     backgroundColor: '#fff',
//   },
//   cardImage: {
//     width: '100%',
//     height: 140,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     borderRadius: 20,
//     padding: 5,
//   },
//   cartIcon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#009688', // Can use currentTheme.primaryColor
//     borderRadius: 20,
//     padding: 8,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   cardContent: {
//     padding: 10,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     marginVertical: 5,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   reviewCount: {
//     fontSize: 12,
//     marginLeft: 5,
//   },
//   cardPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     borderRadius: 20,
//     margin: 10,
//     marginTop: 5,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     marginLeft: 5,
//     fontWeight: '600',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 18,
//     marginTop: 15,
//   },
//   // Modal styles
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalOverlay: {
//     position: 'absolute',
//     width: width,
//     height: height,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: width * 0.8,
//     borderRadius: 20,
//     padding: 20,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modalOption: {
//     paddingVertical: 10,
//     width: '100%',
//   },
//   modalOptionText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default MarketPage;
