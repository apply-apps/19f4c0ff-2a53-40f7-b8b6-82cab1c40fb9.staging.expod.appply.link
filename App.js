// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [heroName, setHeroName] = useState('');
  const [fairyTale, setFairyTale] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateFairyTale = async () => {
    if (!heroName.trim()) {
      alert('Please enter a hero name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a creative fairy tale writer. Create a short, engaging fairy tale for children featuring the provided hero name." },
          { role: "user", content: `Write a fairy tale with a hero named ${heroName}` }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setFairyTale(data.response);
    } catch (error) {
      console.error('Error generating fairy tale:', error);
      alert('Failed to generate fairy tale. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.container}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hero name"
          value={heroName}
          onChangeText={setHeroName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={generateFairyTale}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Generating...' : 'Generate Fairy Tale'}
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.storyContainer}>
          <Text style={styles.storyText}>{fairyTale}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyContainer: {
    marginTop: 20,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default App;
// End of App.js