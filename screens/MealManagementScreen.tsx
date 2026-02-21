import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
    checkEmployeeExists,
    saveMealRecord,
    getTodayMeals,
} from '../lib/firebase';

interface MealRecord {
    employeeId: string;
    mealType: string;
    counterId: number;
    timestamp: number;
    date?: string;
}

export default function MealManagementScreen() {
    const [employeeId, setEmployeeId] = useState('');
    const [mealType, setMealType] = useState('MORNING');
    const [counterId, setCounterId] = useState('1');
    const [loading, setLoading] = useState(false);
    const [todayMeals, setTodayMeals] = useState<MealRecord[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        loadTodayMeals();
    }, []);

    const loadTodayMeals = async () => {
        try {
            const meals = await getTodayMeals();
            setTodayMeals(meals.sort((a, b) => b.timestamp - a.timestamp));
        } catch (error) {
            console.error('Error loading meals:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTodayMeals();
        setRefreshing(false);
    };

    const handleProvideMeal = async () => {
        if (!employeeId.trim()) {
            Alert.alert('Error', 'Please enter employee ID');
            return;
        }

        setLoading(true);
        try {
            const check: any = await checkEmployeeExists(employeeId);

            if (check.error) {
                Alert.alert('Error', check.error);
                setLoading(false);
                return;
            }

            if (check.exists) {
                Alert.alert(
                    'Already Provided',
                    `Employee already received ${check.mealType} at Counter ${check.counterId}`
                );
                setLoading(false);
                return;
            }

            const result: any = await saveMealRecord(
                employeeId,
                mealType as 'MORNING' | 'EVENING',
                parseInt(counterId)
            );

            if (result.success) {
                setResponse(`✅ Meal provided to ${employeeId}!`);
                setEmployeeId('');
                await loadTodayMeals();

                // Clear response after 3 seconds
                setTimeout(() => setResponse(''), 3000);
            } else {
                Alert.alert('Error', result.error);
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckEligibility = async () => {
        if (!employeeId.trim()) {
            Alert.alert('Error', 'Please enter employee ID');
            return;
        }

        setLoading(true);
        try {
            const check: any = await checkEmployeeExists(employeeId);
            if (check.error) {
                Alert.alert('Error', check.error);
            } else if (check.exists) {
                Alert.alert(
                    'Not Eligible',
                    `Already received meal at Counter ${check.counterId}`
                );
            } else {
                setResponse(`✅ ${employeeId} is ELIGIBLE!`);
                setTimeout(() => setResponse(''), 3000);
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderMealItem = ({ item }: { item: MealRecord }) => (
        <View style={styles.mealItem}>
            <Text style={styles.mealId}>{item.employeeId}</Text>
            <Text style={styles.mealType}>
                {item.mealType === 'MORNING' ? '🌅 Morning' : '🌆 Evening'} • Counter {item.counterId}
            </Text>
            <Text style={styles.mealTime}>
                {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Form Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📝 Provide Meal</Text>

                <Text style={styles.label}>Employee ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., EMP001"
                    value={employeeId}
                    onChangeText={(text) => setEmployeeId(text.toUpperCase())}
                    placeholderTextColor="#a0aec0"
                    editable={!loading}
                />

                <Text style={styles.label}>Meal Type</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={mealType}
                        onValueChange={(itemValue) => setMealType(itemValue)}
                        style={styles.picker}
                        enabled={!loading}
                    >
                        <Picker.Item label="🌅 Morning" value="MORNING" />
                        <Picker.Item label="🌆 Evening" value="EVENING" />
                    </Picker>
                </View>

                <Text style={styles.label}>Counter</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={counterId}
                        onValueChange={(itemValue) => setCounterId(itemValue)}
                        style={styles.picker}
                        enabled={!loading}
                    >
                        <Picker.Item label="Counter 1 (Morning)" value="1" />
                        <Picker.Item label="Counter 2 (Evening)" value="2" />
                        <Picker.Item label="Counter 3 (Evening)" value="3" />
                    </Picker>
                </View>

                {response && (
                    <View style={styles.responseBox}>
                        <Text style={styles.responseText}>{response}</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary, loading && styles.buttonDisabled]}
                    onPress={handleProvideMeal}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>✅ Provide Meal</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleCheckEligibility}
                    disabled={loading}
                >
                    <Text style={styles.secondaryButtonText}>🔍 Check Eligibility</Text>
                </TouchableOpacity>
            </View>

            {/* Today's Meals Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📊 Today's Meals ({todayMeals.length})</Text>

                {todayMeals.length > 0 ? (
                    <FlatList
                        data={todayMeals}
                        renderItem={renderMealItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No meals recorded today</Text>
                    </View>
                )}
            </View>
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
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a202c',
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2d3748',
        marginTop: 12,
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
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f7fafc',
        marginBottom: 12,
    },
    picker: {
        height: 50,
        color: '#1a202c',
    },
    responseBox: {
        backgroundColor: '#e8f5e9',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#4caf50',
    },
    responseText: {
        color: '#1b5e20',
        fontWeight: '600',
        fontSize: 14,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonPrimary: {
        backgroundColor: '#ff9f43',
    },
    buttonSecondary: {
        borderWidth: 2,
        borderColor: '#ff9f43',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButtonText: {
        color: '#ff9f43',
        fontSize: 16,
        fontWeight: '700',
    },
    mealItem: {
        borderLeftWidth: 4,
        borderLeftColor: '#ff9f43',
        paddingLeft: 12,
        paddingVertical: 10,
        marginBottom: 8,
    },
    mealId: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ff9f43',
    },
    mealType: {
        fontSize: 13,
        color: '#2d3748',
        marginTop: 4,
    },
    mealTime: {
        fontSize: 11,
        color: '#a0aec0',
        marginTop: 2,
    },
    emptyState: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: '#a0aec0',
        fontSize: 14,
        fontWeight: '500',
    },
});
