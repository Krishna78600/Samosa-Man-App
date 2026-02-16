import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getEmployeeHistory } from '../lib/firebase';

interface MealRecord {
  employeeId: string;
  mealType: string;
  counterId: number;
  date: string;
}

export default function HistoryScreen() {
  const [employeeId, setEmployeeId] = useState('');
  const [history, setHistory] = useState<MealRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchHistory = async () => {
    if (!employeeId.trim()) {
      Alert.alert('Error', 'Please enter employee ID');
      return;
    }

    setLoading(true);
    try {
      const records = await getEmployeeHistory(employeeId);
      setHistory(records);
      setSearched(true);
      
      if (records.length === 0) {
        Alert.alert('No Data', `No history found for ${employeeId}`);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderHistoryItem = ({ item, index }: { item: MealRecord; index: number }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.mealType}>
        {item.mealType === 'MORNING' ? '🌅' : '🌆'} {item.mealType}
      </Text>
      <Text style={styles.counter}>Counter {item.counterId}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 Employee History</Text>

        <Text style={styles.label}>Employee ID</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., EMP001"
          value={employeeId}
          onChangeText={setEmployeeId}
          placeholderTextColor="#a0aec0"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchHistory}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>📖 Fetch History</Text>
          )}
        </TouchableOpacity>
      </View>

      {searched && history.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Records ({history.length})</Text>
          <FlatList
            data={history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      )}

      {searched && history.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No records found for {employeeId}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 6,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a202c',
    backgroundColor: '#f7fafc',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ff9f43',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  historyItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff9f43',
    paddingLeft: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff9f43',
  },
  mealType: {
    fontSize: 13,
    color: '#2d3748',
    marginTop: 4,
  },
  counter: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 14,
    color: '#a0aec0',
    fontWeight: '500',
    textAlign: 'center',
  },
});