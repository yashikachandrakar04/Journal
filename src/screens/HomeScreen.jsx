import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DiaryList from '../components/DiaryList';
import { getAllEntries, deleteEntry } from '../utils/Storage';

const HomeScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEntries = async () => {
    setIsLoading(true);
    const loadedEntries = await getAllEntries();
    setEntries(loadedEntries);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const handleDeleteEntry = (entryId) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteEntry(entryId);
            if (success) {
              loadEntries();
            } else {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const handleEntryPress = (entry) => {
    navigation.navigate('ViewEntry', { entry });
  };

  const handleAddPress = () => {
    navigation.navigate('AddEntry');
  };

  const getTotalEntriesText = () => {
    if (entries.length === 0) return '';
    if (entries.length === 1) return '1 entry';
    return `${entries.length} entries`;
  };

  return (
    <View style={styles.container}>
      {entries.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{getTotalEntriesText()}</Text>
        </View>
      )}
      
      <DiaryList
        entries={entries}
        onEntryPress={handleEntryPress}
        onEntryDelete={handleDeleteEntry}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

export default HomeScreen;