import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  defaults,
  readPreferences,
  removePreferences,
  writePreferences,
} from "../storage/preferences";
import type { Preferences } from "../storage/preferences";
import { useAppColors } from "../theme/useAppColors";

const labels: Record<keyof Preferences, string> = {
  pushNotifications: "Push-сповіщення",
  emailMarketing: "Маркетингові листи",
  latestNews: "Новини ресторану",
  showMenuHints: "Показувати підказки меню",
};

const keys: (keyof Preferences)[] = [
  "pushNotifications",
  "emailMarketing",
  "latestNews",
  "showMenuHints",
];

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : "Невідома помилка.";
}

export default function PreferencesScreen() {
  const colors = useAppColors();
  // draft — те, що зараз бачить користувач; у сховищі лежить лише збережене.
  const [draft, setDraft] = useState<Preferences>({ ...defaults });
  // ready — початкове читання завершилося успішно.
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // attempt змінюємо, щоб повторити читання.
  const [attempt, setAttempt] = useState(0);
  // ref блокує подвійне натискання ще до наступного рендеру.
  const lock = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setError(null);
    readPreferences()
      .then((saved) => {
        if (cancelled) return; // екран уже закрито — результат ігноруємо
        setDraft(saved);
        setReady(true);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(`Не вдалося прочитати налаштування: ${errorText(e)}`);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const toggle = useCallback((key: keyof Preferences, value: boolean) => {
    setNotice(null);
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function save() {
    if (!ready || lock.current) return;
    lock.current = true;
    setBusy(true);
    setNotice(null);
    setError(null);
    try {
      await writePreferences(draft);
      // «Збережено» показуємо лише після успішного await.
      setNotice("Збережено.");
    } catch (e: unknown) {
      setError(
        `Не вдалося зберегти: ${errorText(e)} Чернетку збережено на екрані — повторіть.`,
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  // Скидання доступне й після помилки формату: це рішення відмовитися від
  // пошкодженого запису. Спочатку чекаємо removeItem, потім міняємо state.
  async function reset() {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setNotice(null);
    setError(null);
    try {
      await removePreferences();
      setDraft({ ...defaults });
      setReady(true);
      setNotice("Налаштування скинуто.");
    } catch (e: unknown) {
      setError(`Не вдалося скинути: ${errorText(e)}`);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const selected = keys.filter((key) => draft[key]).map((key) => labels[key]);
  const summary =
    selected.length === 0
      ? "Нічого не вибрано."
      : `Вибрано: ${selected.join(", ")}.`;
  const reading = !ready && error === null;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Налаштування Little Lemon
      </Text>

      {reading && (
        <View style={styles.row}>
          <ActivityIndicator color={colors.accent} />
          <Text style={{ color: colors.text }}>
            Читаємо збережені налаштування…
          </Text>
        </View>
      )}

      {error !== null && (
        <View style={styles.errorBox}>
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            {error}
          </Text>
          <Button
            label="Повторити читання"
            onPress={() => setAttempt((n) => n + 1)}
            disabled={busy}
            colors={colors}
          />
        </View>
      )}

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        {keys.map((key) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>
              {labels[key]}
            </Text>
            <Switch
              value={draft[key]}
              onValueChange={(value) => toggle(key, value)}
              disabled={!ready || busy}
              accessibilityLabel={labels[key]}
              trackColor={{ true: colors.accent, false: colors.border }}
            />
          </View>
        ))}
      </View>

      {/* Резюме обчислюється зі state й не зберігається окремо. */}
      <Text style={{ color: colors.muted }}>{summary}</Text>

      {notice !== null && (
        <Text
          accessibilityLiveRegion="polite"
          style={{ color: colors.text, fontWeight: "600" }}
        >
          {notice}
        </Text>
      )}

      <Button
        label={busy ? "Зачекайте…" : "Зберегти"}
        onPress={save}
        disabled={!ready || busy}
        colors={colors}
      />
      <Button
        label="Скинути налаштування"
        onPress={reset}
        disabled={busy}
        colors={colors}
        secondary
      />

      <Text style={[styles.hint, { color: colors.muted }]}>
        Перемикачі зберігають лише ваш вибір. Реальні сповіщення й листи тут не
        надсилаються.
      </Text>
    </ScrollView>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled: boolean;
  colors: ReturnType<typeof useAppColors>;
  secondary?: boolean;
};

function Button({ label, onPress, disabled, colors, secondary }: ButtonProps) {
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
      <Text
        style={[
          styles.buttonText,
          { color: secondary ? colors.text : colors.onAccent },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 14 },
  heading: { fontSize: 24, fontWeight: "700" },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 52,
  },
  label: { flex: 1, fontSize: 16 },
  errorBox: { gap: 10 },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  dimmed: { opacity: 0.55 },
  hint: { fontSize: 13, lineHeight: 18 },
});
