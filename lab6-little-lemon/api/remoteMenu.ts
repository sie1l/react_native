import type { RemoteMenuItem } from "../types/remoteMenu";

export const MENU_URL =
  "https://raw.githubusercontent.com/" +
  "Meta-Mobile-Developer-PC/Working-With-Data-API/" +
  "main/menu-items-by-category.json";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseRemoteMenu(payload: unknown): RemoteMenuItem[] {
  if (!isRecord(payload) || !Array.isArray(payload.menu)) {
    throw new Error("Очікувався об’єкт із масивом menu.");
  }

  const ids = new Set<string>();

  return payload.menu.map((row: unknown, index: number): RemoteMenuItem => {
    if (
      !isRecord(row) ||
      typeof row.id !== "number" ||
      !Number.isSafeInteger(row.id) ||
      row.id <= 0 ||
      typeof row.title !== "string" ||
      row.title.trim() === "" ||
      typeof row.price !== "string" ||
      row.price.trim() === "" ||
      !isRecord(row.category) ||
      typeof row.category.title !== "string" ||
      row.category.title.trim() === ""
    ) {
      throw new Error(`Некоректна структура позиції №${index + 1}.`);
    }

    const price = Number(row.price);
    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`Некоректна ціна позиції №${index + 1}.`);
    }

    const id = String(row.id);
    if (ids.has(id)) {
      throw new Error(`Повторюється ідентифікатор ${id}.`);
    }
    ids.add(id);

    return {
      id,
      title: row.title.trim(),
      price,
      category: row.category.title.trim(),
    };
  });
}

export async function fetchRemoteMenu(
  url: string,
  signal: AbortSignal,
): Promise<RemoteMenuItem[]> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Не вдалося отримати меню: HTTP ${response.status}.`);
  }

  // Цей endpoint за контрактом має повертати JSON з menu.
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error("Не вдалося прочитати JSON із відповіді.");
  }

  return parseRemoteMenu(payload);
}
