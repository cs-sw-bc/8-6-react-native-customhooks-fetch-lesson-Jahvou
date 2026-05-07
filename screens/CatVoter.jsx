import { useState, useEffect } from 'react';
import {
  View, Text, Image, Button,
  FlatList, ActivityIndicator, StyleSheet
} from 'react-native';

const API_KEY = 'YOUR_API_KEY';

export default function CatVoter() {
  const [cat, setCat] = useState(null);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);//change to True first

  useEffect(() => {
    fetchCat();
    fetchVotes();
  }, []);

  // ============================================================
  // TODO 6
  // Write an async function called fetchCat.
  // GET from: https://api.thecatapi.com/v1/images/search
  // Store the first result in cat state.
  // Set loading to false when done.
  // ============================================================
  const fetchCat = async () => {
    
  };

  // ============================================================
  // TODO 7
  // Write an async function called fetchVotes.
  // GET from: https://api.thecatapi.com/v1/votes
  // This endpoint requires the API_KEY in headers: { 'x-api-key': API_KEY }
  // Store the result in votes state.
  // ============================================================
  const fetchVotes = async () => {

  };

  // ============================================================
  // TODO 8
  // Write an async function called submitVote that accepts a value (1 or 0).
  // POST to: https://api.thecatapi.com/v1/votes
  // Headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY }
  // Body: JSON.stringify({ image_id: cat.id, value })
  // After posting, call fetchVotes() to refresh the list.
  // ============================================================
  const submitVote = async (value) => {

  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cat Voter 🐱</Text>

      {/* TODO 9: Render the cat image using cat.url */}


      {/* TODO 10: Add two buttons — Upvote (value 1) and Downvote (value 0) */}
      <View style={styles.buttons}>

      </View>

      <Button title="New Cat 🔄" onPress={fetchCat} />

      {/* TODO 11: Render the votes array in a FlatList */}
      {/* Each row: show 👍 or 👎 based on item.value, and item.image_id */}
      {/* ListEmptyComponent: show "No votes yet" */}
      <Text style={styles.historyHeading}>Vote History ({votes.length})</Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  image: { width: '100%', height: 280, borderRadius: 12, marginBottom: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  historyHeading: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  voteItem: { fontSize: 14, paddingVertical: 4, borderBottomWidth: 1, borderColor: '#eee' },
  empty: { color: '#999', fontStyle: 'italic' },
});
