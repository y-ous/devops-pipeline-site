// Pure logica voor de takenlijst. Geen DOM, zodat het makkelijk te unit-testen is.

export const MAX_LENGTH = 100;

export function validateTitle(title) {
  const trimmed = String(title ?? '').trim();
  if (trimmed.length === 0) return 'Vul een taak in.';
  if (trimmed.length > MAX_LENGTH) return `Maximaal ${MAX_LENGTH} tekens.`;
  return null;
}

export function addTask(tasks, title, id = Date.now()) {
  const error = validateTitle(title);
  if (error) throw new Error(error);
  return [...tasks, { id, title: title.trim(), done: false }];
}

export function toggleTask(tasks, id) {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function removeTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

export function countOpen(tasks) {
  return tasks.filter((t) => !t.done).length;
}

export function counterText(tasks) {
  const n = countOpen(tasks);
  return n === 1 ? '1 open taakjes' : `${n} open taken`;
}
