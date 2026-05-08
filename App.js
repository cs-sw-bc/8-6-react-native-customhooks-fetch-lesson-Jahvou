import { SafeAreaView, StyleSheet } from 'react-native';
import CatVoter from './screens/CatVoter';

// Swap the import to switch between screens during the demo:
import CatFetcher from './screens/CatFetcher';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CatVoter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
