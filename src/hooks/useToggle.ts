import { useCallback, useState } from 'react';

type ToggleHookResult = [boolean, () => void];

export default function useToggle(initialValue = false): ToggleHookResult {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => setState((current) => !current), []);
  return [state, toggle];
}
