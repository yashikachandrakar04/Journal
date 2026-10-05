import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateEntry, deleteEntry } from '../utils/Storage';

const ViewEntryScreen = ({ route, navigation }) => {
  const { entry: initialEntry } = route.params;
  const [entry, setEntry] = useState(initialEntry);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialEntry.title);
  const [editedContent, setEditedContent] = useState(initialEntry.content);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      Alert.alert('Error', 'Title and content cannot be empty');
      return;
    }

    const updatedEntry = {
      ...entry,
      title: editedTitle.trim(),
      content: editedContent.trim(),
      lastEdited: new Date().toISOString(),
    };

    const success = await updateEntry(updatedEntry);
    if (success) {
      setEntry(updatedEntry);
      setIsEditing(false);
      Alert.alert('Success', 'Entry updated successfully');
    } else {
      Alert.alert('Error', 'Failed to update entry');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteEntry(entry.id);
            if (success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete entry');
            }
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setEditedTitle(entry.title);
    setEditedContent(entry.content);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.dateContainer}>
          <Icon name="calendar-outline" size={16} color="#999" />
          <Text style={styles.date}>{formatDate(entry.date)}</Text>
        </View>

        {entry.mood && (
          <View style={styles.moodContainer}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>
        )}

        {isEditing ? (
          <>
            <TextInput
              style={styles.titleInput}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Title"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.contentInput}
              value={editedContent}
              onChangeText={setEditedContent}
              placeholder="Content"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.content}>{entry.content}</Text>
          </>
        )}

        {entry.lastEdited && (
          <Text style={styles.lastEdited}>
            Last edited: {formatDate(entry.lastEdited)}
          </Text>
        )}
      </ScrollView>

      <View style={styles.actionBar}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancelEdit}
            >
              <Icon name="close-outline" size={22} color="#666" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Icon name="checkmark-outline" size={22} color="#fff" />
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Icon name="trash-outline" size={22} color="#FF6B6B" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Icon name="create-outline" size={22} color="#fff" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  moodContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  mood: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 26,
  },
  contentInput: {
    fontSize: 16,
    color: '#444',
    lineHeight: 26,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 200,
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  lastEdited: {
    fontSize: 12,
    color: '#BBB',
    marginTop: 24,
    fontStyle: 'italic',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  editButton: {
    backgroundColor: '#6C63FF',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ViewEntryScreen;