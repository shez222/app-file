import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { searchExams } from '../services/api';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const examResults = await searchExams(query);
    setResults(examResults);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl">Search Exams</Text>
      <TextInput
        placeholder="Enter exam name or code"
        className="border p-2 my-2 w-80"
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-2 border-b">
            <Text>{item.name}</Text>
            <Text>{item.code}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
