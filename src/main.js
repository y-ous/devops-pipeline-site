import { addTask, toggleTask, removeTask, counterText, validateTitle } from './tasks.js';

const STORAGE_KEY = 'tasks';
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const errorEl = document.getElementById('error');

let tasks = load();

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren(
    ...tasks.map((task) => {
      const li = document.createElement('li');
      li.dataset.id = task.id;
      if (task.done) li.classList.add('done');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.setAttribute('aria-label', `Afvinken: ${task.title}`);
      checkbox.addEventListener('change', () => update(toggleTask(tasks, task.id)));

      const span = document.createElement('span');
      span.textContent = task.title;

      const del = document.createElement('button');
      del.type = 'button';
      del.textContent = 'Verwijder';
      del.setAttribute('aria-label', `Verwijder: ${task.title}`);
      del.addEventListener('click', () => update(removeTask(tasks, task.id)));

      li.append(checkbox, span, del);
      return li;
    }),
  );
  counter.textContent = counterText(tasks);
}

function update(next) {
  tasks = next;
  save();
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const error = validateTitle(input.value);
  errorEl.hidden = !error;
  errorEl.textContent = error ?? '';
  if (error) return;
  update(addTask(tasks, input.value));
  input.value = '';
  input.focus();
});

render();
