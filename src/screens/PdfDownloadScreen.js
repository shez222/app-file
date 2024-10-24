import React from 'react';
import { View, Text, Button } from 'react-native';

const PdfDownloadScreen = () => {
  const handleDownloadPaid = () => {
    // Implement paid PDF download logic
  };

  const handleDownloadFree = () => {
    // Implement free PDF download logic
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl">Download Exam PDF</Text>
      <Button title="Download Paid PDF" onPress={handleDownloadPaid} />
      <Button title="Download Free PDF" onPress={handleDownloadFree} />
    </View>
  );
};

export default PdfDownloadScreen;
