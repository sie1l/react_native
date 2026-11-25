import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MENU_URL } from '../api/remoteMenu';
import { useRemoteMenu } from '../hooks/useRemoteMenu';
import { useAppColors } from '../theme/useAppColors';

export default function RemoteMenuScreen() {
  const colors = useAppColors();
  const { state, reload } = useRemoteMenu(MENU_URL);
  const [query, setQuery] = useState('');
  const loading = state.status === 'loading';

  // Хуки стоять до умовних повернень. У стані зберігаємо лише текст пошуку,
  // а відфільтрований масив обчислюємо із завантажених даних.
  const visible = useMemo(() => {
    if (state.status !== 'success') return [];
    const needle = query.trim().toLowerCase();
    if (needle === '') return state.data;
    return state.data.filter(item => item.title.toLowerCase().includes(needle));
  }, [state, query]);

  const serverEmpty = state.status === 'success' && state.data.length === 0;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Меню з мережі</Text>

      <Pressable
        accessibilityRole="button"
        disabled={loading}
        onPress={reload}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.accent },
          (pressed || loading) && styles.dimmed,
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.onAccent }]}>
          {loading ? 'Завантаження…' : state.status === 'error' ? 'Повторити' : 'Оновити'}
        </Text>
      </Pressable>

      {state.status === 'success' && !serverEmpty && (
        <>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Пошук за назвою"
            placeholderTextColor={colors.muted}
            style={[
              styles.search,
              { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
            ]}
          />
          <Text style={{ color: colors.muted }}>
            Показано позицій: {visible.length} з {state.data.length}
          </Text>
        </>
      )}

      {state.status === 'loading' && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={{ color: colors.text }}>Отримуємо меню…</Text>
        </View>
      )}

      {state.status === 'error' && (
        <View style={styles.center}>
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            {state.message}
          </Text>
          <Text style={{ color: colors.muted }}>
            Перевірте з’єднання та натисніть «Повторити».
          </Text>
        </View>
      )}

      {state.status === 'success' && (
        <FlatList
          style={styles.list}
          data={visible}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.content}
          ListEmptyComponent={
            <Text style={{ color: colors.text }}>
              {serverEmpty ? 'Меню порожнє' : 'За цим запитом нічого не знайдено'}
            </Text>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={{ color: colors.muted }}>{item.category}</Text>
              <Text style={{ color: colors.text }}>{item.price.toFixed(2)} ум. од.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  button: { padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '600' },
  dimmed: { opacity: 0.6 },
  search: { borderWidth: 1, borderRadius: 6, padding: 10, marginTop: 12, marginBottom: 8 },
  center: { flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1 },
  content: { paddingVertical: 16, paddingBottom: 24 },
  card: { padding: 14, borderWidth: 1, borderRadius: 6, marginBottom: 12, gap: 6 },
  title: { fontSize: 18, fontWeight: '600' },
});
