// PurchaseHistoryScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PurchaseHistoryScreen = () => {
  // Sample data for purchases
  const purchases = [
    {
      id: '1',
      title: 'Premium Exam Package',
      date: 'September 25, 2023',
      amount: '$29.99',
      image: 'https://img.freepik.com/free-vector/gradient-national-science-day-vertical-poster-template_23-2149252941.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
      details: {
        orderId: 'ORD123456',
        items: [
          { name: 'Exam Prep Guide', quantity: 1, price: '$19.99' },
          { name: 'Practice Tests', quantity: 1, price: '$10.00' },
        ],
        total: '$29.99',
        paymentMethod: 'Credit Card',
        billingAddress: '123 Main St, Anytown, USA',
      },
    },
    {
      id: '2',
      title: 'Advanced Study Materials',
      date: 'August 10, 2023',
      amount: '$19.99',
      image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149267342.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
      details: {
        orderId: 'ORD789012',
        items: [
          { name: 'Advanced Topics eBook', quantity: 1, price: '$19.99' },
        ],
        total: '$19.99',
        paymentMethod: 'PayPal',
        billingAddress: '456 Elm St, Othertown, USA',
      },
    },
    {
        id: '1',
        title: 'Premium Exam Package',
        date: 'September 25, 2023',
        amount: '$29.99',
        image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149267342.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
        details: {
          orderId: 'ORD123456',
          items: [
            { name: 'Exam Prep Guide', quantity: 1, price: '$19.99' },
            { name: 'Practice Tests', quantity: 1, price: '$10.00' },
          ],
          total: '$29.99',
          paymentMethod: 'Credit Card',
          billingAddress: '123 Main St, Anytown, USA',
        },
      },
      {
        id: '2',
        title: 'Advanced Study Materials',
        date: 'August 10, 2023',
        amount: '$19.99',
        image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
        details: {
          orderId: 'ORD789012',
          items: [
            { name: 'Advanced Topics eBook', quantity: 1, price: '$19.99' },
          ],
          total: '$19.99',
          paymentMethod: 'PayPal',
          billingAddress: '456 Elm St, Othertown, USA',
        },
      },
      {
        id: '1',
        title: 'Premium Exam Package',
        date: 'September 25, 2023',
        amount: '$29.99',
        image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
        details: {
          orderId: 'ORD123456',
          items: [
            { name: 'Exam Prep Guide', quantity: 1, price: '$19.99' },
            { name: 'Practice Tests', quantity: 1, price: '$10.00' },
          ],
          total: '$29.99',
          paymentMethod: 'Credit Card',
          billingAddress: '123 Main St, Anytown, USA',
        },
      },
      {
        id: '2',
        title: 'Advanced Study Materials',
        date: 'August 10, 2023',
        amount: '$19.99',
        image: 'https://img.freepik.com/free-vector/gradient-national-science-day-vertical-poster-template_23-2149252941.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
        details: {
          orderId: 'ORD789012',
          items: [
            { name: 'Advanced Topics eBook', quantity: 1, price: '$19.99' },
          ],
          total: '$19.99',
          paymentMethod: 'PayPal',
          billingAddress: '456 Elm St, Othertown, USA',
        },
      },
      {
        id: '1',
        title: 'Premium Exam Package',
        date: 'September 25, 2023',
        amount: '$29.99',
        image: 'https://img.freepik.com/free-vector/realistic-national-science-day-vertical-poster-template_23-2149274572.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid', // Replace with actual image URLs
        details: {
          orderId: 'ORD123456',
          items: [
            { name: 'Exam Prep Guide', quantity: 1, price: '$19.99' },
            { name: 'Practice Tests', quantity: 1, price: '$10.00' },
          ],
          total: '$29.99',
          paymentMethod: 'Credit Card',
          billingAddress: '123 Main St, Anytown, USA',
        },
      },
      {
        id: '2',
        title: 'Advanced Study Materials',
        date: 'August 10, 2023',
        amount: '$19.99',
        image: 'https://img.freepik.com/free-vector/gradient-national-science-day-vertical-poster-template_23-2149252941.jpg?ga=GA1.1.1138185763.1729721443&semt=ais_hybrid',
        details: {
          orderId: 'ORD789012',
          items: [
            { name: 'Advanced Topics eBook', quantity: 1, price: '$19.99' },
          ],
          total: '$19.99',
          paymentMethod: 'PayPal',
          billingAddress: '456 Elm St, Othertown, USA',
        },
      },
  ];

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openReceiptModal = (item) => {
    setSelectedPurchase(item);
    setModalVisible(true);
  };

  const closeReceiptModal = () => {
    setSelectedPurchase(null);
    setModalVisible(false);
  };

  const renderPurchaseItem = ({ item }) => (
    <TouchableOpacity style={styles.purchaseItem} onPress={() => openReceiptModal(item)}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
        <Text style={styles.itemAmount}>{item.amount}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>
      {purchases.length > 0 ? (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={renderPurchaseItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart" size={80} color="#BDBDBD" />
          <Text style={styles.emptyText}>You have no purchases yet.</Text>
        </View>
      )}

      {/* Receipt Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeReceiptModal}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedPurchase && (
              <>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalTitle}>Receipt Details</Text>
                  <Text style={styles.modalLabel}>Order ID:</Text>
                  <Text style={styles.modalText}>{selectedPurchase.details.orderId}</Text>

                  <Text style={styles.modalLabel}>Date:</Text>
                  <Text style={styles.modalText}>{selectedPurchase.date}</Text>

                  <Text style={styles.modalLabel}>Items Purchased:</Text>
                  {selectedPurchase.details.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                      <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                  ))}

                  <View style={styles.separator} />

                  <Text style={styles.modalLabel}>Total Amount:</Text>
                  <Text style={styles.modalTotal}>{selectedPurchase.details.total}</Text>

                  <Text style={styles.modalLabel}>Payment Method:</Text>
                  <Text style={styles.modalText}>{selectedPurchase.details.paymentMethod}</Text>

                  <Text style={styles.modalLabel}>Billing Address:</Text>
                  <Text style={styles.modalText}>{selectedPurchase.details.billingAddress}</Text>
                </ScrollView>

                <TouchableOpacity style={styles.closeButton} onPress={closeReceiptModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  purchaseItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: '#00796B',
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 5,
  },
  itemAmount: {
    fontSize: 16,
    color: '#009688',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
    marginTop: 15,
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#00796B',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 16,
    color: '#009688',
    fontWeight: '600',
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    color: '#424242',
  },
  itemQuantity: {
    flex: 1,
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    color: '#424242',
    textAlign: 'right',
  },
  separator: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  modalTotal: {
    fontSize: 20,
    color: '#00796B',
    fontWeight: 'bold',
    marginBottom: 5,
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

export default PurchaseHistoryScreen;
