import { useEffect, useState } from "react";
import { fetchRemoteMenu } from "../api/remoteMenu";
import type { MenuLoadState } from "../types/remoteMenu";

const REQUEST_TIMEOUT_MS = 60_000;

export function useRemoteMenu(url: string) {
  const [state, setState] = useState<MenuLoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;

    setState({ status: "loading" });

    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    async function load() {
      try {
        const data = await fetchRemoteMenu(url, controller.signal);
        if (active) {
          setState({ status: "success", data });
        }
      } catch (error: unknown) {
        if (!active) return;

        const message = timedOut
          ? "Сервер не відповів вчасно. Спробуйте ще раз."
          : error instanceof Error
            ? error.message
            : "Не вдалося завантажити меню.";

        setState({ status: "error", message });
      } finally {
        clearTimeout(timeoutId);
      }
    }

    void load();

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [url, attempt]);

  function reload() {
    setAttempt((previous) => previous + 1);
  }

  return { state, reload };
}
