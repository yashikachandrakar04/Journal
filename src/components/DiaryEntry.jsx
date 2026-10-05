import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DiaryEntry = ({ entry, onPress, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPreview = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {entry.title}
          </Text>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Icon name="trash-outline" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{formatDate(entry.date)}</Text>
        <Text style={styles.preview}>{getPreview(entry.content)}</Text>
        {entry.mood && (
          <View style={styles.moodContainer}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moodContainer: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mood: {
    fontSize: 12,
    color: '#6C63FF',
  },
});

export default DiaryEntry;