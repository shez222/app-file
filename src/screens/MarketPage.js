// MarketPage.js

import React, { useState } from 'react';
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
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MarketPage = () => {
  const navigation = useNavigation();

  // Sample data for exams or courses
  const data = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
        id: '1',
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
        id: '2',
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
        id: '3',
        subjectName: 'Chemistry',
        subjectCode: 'CHEM301',
        examName: 'Organic Chemistry',
        image: 'https://img.freepik.com/free-vector/flat-national-science-day-vertical-poster-template_23-2149290350.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
        description: 'Exploration of the structure and reactions of organic compounds.',
        rating: 4.7,
        reviews: 200,
        price: '34.99',
      },{
        id: '1',
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
        id: '2',
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
        id: '3',
        subjectName: 'Chemistry',
        subjectCode: 'CHEM301',
        examName: 'Organic Chemistry',
        image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
        description: 'Exploration of the structure and reactions of organic compounds.',
        rating: 4.7,
        reviews: 200,
        price: '34.99',
      },
    // Add more items as needed
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Default');

  const handleSearch = (text) => {
    setSearchQuery(text);

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductPage', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.examName}</Text>
        <Text style={styles.cardSubtitle}>
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
          <Text style={styles.reviewCount}> ({item.reviews})</Text>
        </View>
        <Text style={styles.cardPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00695C" barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1350046657/photo/dark-green-defocused-blurred-motion-abstract-background.jpg?s=612x612&w=0&k=20&c=Kdt8O_WEHlQ1ZqSsbM7P76l4uPXS8eqkXJrNMSWs62U=',
          }} // Replace with your header background image URL
          style={styles.headerBackground}
        />
        <View style={styles.headerOverlay} />
        <Text style={styles.title}>Marketplace</Text>
      </View>
      <View style={styles.searchSortContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#BDBDBD" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by subject, code, or exam name"
            placeholderTextColor="#BDBDBD"
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortModalVisible(true)}>
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
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Name (A-Z)')}
              >
                <Text style={styles.modalOptionText}>Name (A-Z)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Name (Z-A)')}
              >
                <Text style={styles.modalOptionText}>Name (Z-A)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Price (Low to High)')}
              >
                <Text style={styles.modalOptionText}>Price (Low to High)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Price (High to Low)')}
              >
                <Text style={styles.modalOptionText}>Price (High to Low)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleSortOption('Default')}
              >
                <Text style={styles.modalOptionText}>Default</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={80} color="#BDBDBD" />
            <Text style={styles.emptyText}>No results found.</Text>
          </View>
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const cardWidth = (width - 60) / 2; // Adjust based on screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'relative',
    height: 150,
    // backgroundColor: '#00695C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    top: 0,
    left: 0,
  },
  headerOverlay: {
    position: 'absolute',
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
    color: '#424242',
  },
  sortButton: {
    backgroundColor: '#00695C',
    marginLeft: 10,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    width: cardWidth,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: '#00695C',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#00695C',
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
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
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#00695C',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
  },
});

export default MarketPage;
