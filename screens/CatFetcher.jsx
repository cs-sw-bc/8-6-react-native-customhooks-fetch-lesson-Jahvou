import { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';

export default function CatFetcher() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCat();
  }, []);

  // ============================================================
  // TODO 3
  // Write an async function called fetchCat.
  // GET from: https://api.thecatapi.com/v1/images/search
  // The response is an array — store the first item in cat state.
  // Set loading to false when done.
  // Catch any errors and store in error state.
  // ============================================================
  const fetchCat = async () => {

  };

  // ============================================================
  // TODO 4
  // Handle the three states below:
  // - If loading, return an ActivityIndicator
  // - If error, return a Text showing the error message
  // - If cat, return the Image using cat.url
  // ============================================================

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Random Cat 🐱</Text>

      {/* TODO 4: render loading, error, or image here */}

      <Text style={styles.id}>ID: {cat?.id}</Text>

      {/* TODO 5: Add a Button that calls fetchCat to load a new cat */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  image: { width: 300, height: 300, borderRadius: 12, marginBottom: 12 },
  id: { color: '#666', marginBottom: 16 },
  error: { color: 'red' },
});
