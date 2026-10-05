import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import DiaryEntry from './DiaryEntry';

const DiaryList = ({ entries, onEntryPress, onEntryDelete }) => {
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No diary entries yet</Text>
      <Text style={styles.emptySubtext}>Tap + to add your first entry</Text>
    </View>
  );

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DiaryEntry
          entry={item}
          onPress={() => onEntryPress(item)}
          onDelete={() => onEntryDelete(item.id)}
        />
      )}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={entries.length === 0 ? styles.emptyList : styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
  },
});

export default DiaryList;