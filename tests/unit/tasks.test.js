import { describe, it, expect } from 'vitest';
import {
  MAX_LENGTH,
  validateTitle,
  addTask,
  toggleTask,
  removeTask,
  countOpen,
  counterText,
} from '../../src/tasks.js';

describe('validateTitle', () => {
  it('weigert lege of alleen-spaties invoer', () => {
    expect(validateTitle('')).toBe('Vul een taak in.');
    expect(validateTitle('   ')).toBe('Vul een taak in.');
    expect(validateTitle(undefined)).toBe('Vul een taak in.');
  });

  it('weigert te lange titels', () => {
    expect(validateTitle('a'.repeat(MAX_LENGTH + 1))).toMatch(/Maximaal/);
  });

  it('accepteert een geldige titel', () => {
    expect(validateTitle('Boodschappen doen')).toBeNull();
    expect(validateTitle('a'.repeat(MAX_LENGTH))).toBeNull();
  });
});

describe('addTask', () => {
  it('voegt een getrimde, open taak toe zonder de oude lijst te wijzigen', () => {
    const before = [];
    const after = addTask(before, '  Lezen  ', 1);
    expect(after).toEqual([{ id: 1, title: 'Lezen', done: false }]);
    expect(before).toEqual([]);
  });

  it('gooit een fout bij ongeldige invoer', () => {
    expect(() => addTask([], '')).toThrow('Vul een taak in.');
  });

  it('gebruikt standaard een timestamp als id', () => {
    const [task] = addTask([], 'Test');
    expect(typeof task.id).toBe('number');
  });
});

describe('toggleTask en removeTask', () => {
  const tasks = [
    { id: 1, title: 'A', done: false },
    { id: 2, title: 'B', done: true },
  ];

  it('wisselt alleen de juiste taak', () => {
    expect(toggleTask(tasks, 1)).toEqual([
      { id: 1, title: 'A', done: true },
      { id: 2, title: 'B', done: true },
    ]);
  });

  it('verwijdert alleen de juiste taak', () => {
    expect(removeTask(tasks, 2)).toEqual([{ id: 1, title: 'A', done: false }]);
  });
});

describe('teller', () => {
  it('telt alleen open taken', () => {
    expect(countOpen([{ done: false }, { done: true }, { done: false }])).toBe(2);
  });

  it('gebruikt enkelvoud en meervoud', () => {
    expect(counterText([])).toBe('0 open taken');
    expect(counterText([{ done: false }])).toBe('1 open taak');
    expect(counterText([{ done: false }, { done: false }])).toBe('2 open taken');
  });
});
