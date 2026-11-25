import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  addCustomer,
  deleteCustomer,
  listCustomers,
  renameCustomer,
} from '../storage/customers';
import type { Customer } from '../storage/customers';
import { useAppColors } from '../theme/useAppColors';

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'Невідома помилка.';
}

export default function CustomersScreen() {
  const colors = useAppColors();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Запис уже у базі, а наступний SELECT упав: додавання повторювати не можна.
  const [committed, setCommitted] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const lock = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false; // результат після закриття екрана ігноруємо
    };
  }, []);

  async function refresh() {
    try {
      const rows = await listCustomers();
      if (!mounted.current) return;
      setCustomers(rows);
      setReady(true);
      setCommitted(false);
      setError(null);
    } catch (e: unknown) {
      if (!mounted.current) return;
      setError(`Не вдалося прочитати список: ${errorText(e)}`);
    }
  }

  // Початкове читання — в ефекті, а не в тілі рендеру.
  useEffect(() => {
    void refresh();
  }, []);

  // Усі зміни: блокування -> операція -> перечитування SELECT -> state.
  async function mutate(operation: () => Promise<void>, done?: () => void) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError(null);
    try {
      await operation();
    } catch (e: unknown) {
      if (mounted.current) setError(errorText(e));
      lock.current = false;
      if (mounted.current) setBusy(false);
      return;
    }
    // Тут запис уже виконано.
    if (mounted.current) {
      setCommitted(true);
      done?.();
    }
    await refresh();
    lock.current = false;
    if (mounted.current) setBusy(false);
  }

  function submit() {
    const text = draft;
    if (editingId === null) {
      void mutate(() => addCustomer(text), () => setDraft(''));
    } else {
      const id = editingId;
      void mutate(() => renameCustomer(id, text), () => {
        setEditingId(null);
        setDraft('');
      });
    }
  }

  function startEdit(item: Customer) {
    setEditingId(item.id);
    setDraft(item.name);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft('');
    setError(null);
  }

  function confirmDelete(item: Customer) {
    Alert.alert(
      'Видалити клієнта?',
      `${item.name} (ID ${item.id})`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            void mutate(() => deleteCustomer(item.id), () => {
              if (editingId === item.id) cancelEdit();
            });
          },
        },
      ],
    );
  }

  // Відфільтрований список обчислюємо зі state; записи в базі не чіпаємо.
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle === '') return customers;
    return customers.filter(c => c.name.toLowerCase().includes(needle));
  }, [customers, query]);

  const inputBlocked = !ready || busy;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Клієнти Little Lemon</Text>

      <Text style={[styles.label, { color: colors.text }]}>
        {editingId === null ? "Ім'я нового клієнта" : `Нове ім'я для ID ${editingId}`}
      </Text>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        editable={!inputBlocked}
        maxLength={80}
        placeholder="Ім'я клієнта"
        placeholderTextColor={colors.muted}
        accessibilityLabel="Ім'я клієнта"
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
        ]}
      />
      <View style={styles.row}>
        <Btn
          label={editingId === null ? 'Додати клієнта' : "Зберегти ім'я"}
          onPress={submit}
          disabled={inputBlocked}
          colors={colors}
        />
        {editingId !== null && (
          <Btn label="Скасувати" onPress={cancelEdit} disabled={busy} colors={colors} secondary />
        )}
      </View>

      {error !== null && (
        <View style={styles.errorBox}>
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            {error}
          </Text>
          {committed && (
            <Text style={{ color: colors.muted }}>
              Зміну вже збережено в базі. Натисніть «Оновити список» — додавання повторювати не
              потрібно.
            </Text>
          )}
          <Btn
            label="Оновити список"
            onPress={() => void refresh()}
            disabled={busy}
            colors={colors}
            secondary
          />
        </View>
      )}

      {!ready && error === null && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={{ color: colors.text }}>Відкриваємо базу…</Text>
        </View>
      )}

      {ready && (
        <>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Пошук за іменем"
            placeholderTextColor={colors.muted}
            accessibilityLabel="Пошук за іменем"
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
            ]}
          />
          <Text style={{ color: colors.muted }}>
            Усього клієнтів: {customers.length}. Знайдено: {visible.length}.
          </Text>
          <FlatList
            style={styles.list}
            data={visible}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={{ color: colors.text }}>
                {customers.length === 0 ? 'Клієнтів поки немає' : 'За цим запитом нічого не знайдено'}
              </Text>
            }
            renderItem={({ item }) => (
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardText}>
                  <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                  <Text style={{ color: colors.muted }}>ID {item.id}</Text>
                </View>
                <Btn
                  label="Редагувати"
                  onPress={() => startEdit(item)}
                  disabled={busy}
                  colors={colors}
                  secondary
                />
                <Btn
                  label="Видалити"
                  onPress={() => confirmDelete(item)}
                  disabled={busy}
                  colors={colors}
                  secondary
                />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

type BtnProps = {
  label: string;
  onPress: () => void;
  disabled: boolean;
  colors: ReturnType<typeof useAppColors>;
  secondary?: boolean;
};

function Btn({ label, onPress, disabled, colors, secondary }: BtnProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary
          ? { borderWidth: 1, borderColor: colors.border }
          : { backgroundColor: colors.accent },
        (pressed || disabled) && styles.dimmed,
      ]}
    >
      <Text style={[styles.buttonText, { color: secondary ? colors.text : colors.onAccent }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  heading: { fontSize: 24, fontWeight: '700' },
  label: { fontSize: 15, fontWeight: '600' },
  input: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  errorBox: { gap: 8 },
  center: { flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1 },
  listContent: { paddingVertical: 8, paddingBottom: 24, gap: 10 },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  cardText: { flexBasis: '100%', gap: 2 },
  name: { fontSize: 17, fontWeight: '600' },
  button: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  dimmed: { opacity: 0.55 },
});
