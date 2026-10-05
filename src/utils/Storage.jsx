import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MyDiary:entries';

export const saveEntry = async entry => {
  try {
    const existingEntries = await getAllEntries();
    const updatedEntries = [entry, ...existingEntries];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    return true;
  } catch (error) {
    console.error('Error saving entry:', error);
    return false;
  }
};

export const getAllEntries = async () => {
  try {
    const entries = await AsyncStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error getting entries:', error);
    return [];
  }
};

export const updateEntry = async updatedEntry => {
  try {
    const entries = await getAllEntries();
    const updatedEntries = entries.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    return true;
  } catch (error) {
    console.error('Error updating entry:', error);
    return false;
  }
};

export const deleteEntry = async entryId => {
  try {
    const entries = await getAllEntries();
    const filteredEntries = entries.filter(entry => entry.id !== entryId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
    return true;
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
};

export const clearAllEntries = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing entries:', error);
    return false;
  }
};
