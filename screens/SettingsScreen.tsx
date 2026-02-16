import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const handleCheckUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          'Update Available',
          'A new version is available. Downloading...',
          [
            {
              text: 'Update',
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
            },
            { text: 'Later', onPress: () => {} },
          ]
        );
      } else {
        Alert.alert('Up to Date', 'You have the latest version!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check for updates');
    }
  };

  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>⚙️ Settings</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>App Name</Text>
          <Text style={styles.settingValue}>Samosa Man</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>v{appVersion}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Environment</Text>
          <Text style={styles.settingValue}>
            {Updates.isEmbeddedLaunch ? 'Embedded' : 'Managed'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleCheckUpdates}
        >
          <Text style={styles.buttonText}>🔄 Check for Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => {
            Linking.openURL('https://github.com/YOUR_USERNAME/SamosaManApp');
          }}
        >
          <Text style={styles.secondaryButtonText}>📖 View on GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={() => {
            Alert.alert(
              'About',
              '🍲 Samosa Man\n\nEmployee Meal Management System\n\nCrafted with ❤️'
            );
          }}
        >
          <Text style={styles.dangerButtonText}>ℹ️ About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ by Krishna Tulaskar</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3748',
  },
  settingValue: {
    fontSize: 14,
    color: '#a0aec0',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonPrimary: {
    backgroundColor: '#ff9f43',
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: '#ff9f43',
  },
  buttonDanger: {
    backgroundColor: '#f4a261',
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
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ffe8d6',
    marginTop: 20,
  },
  footerText: {
    color: '#ff9f43',
    fontSize: 12,
    fontWeight: '600',
  },
});