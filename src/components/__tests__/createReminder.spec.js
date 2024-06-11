import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ReminderView from '@/views/ReminderView.vue';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ReminderView', () => {
  it('should add a new reminder to localStorage', () => {
    const testData = {
      date: '2024-06-10',
      time: '12:00',
      country: 'US',
      description: 'Test reminder',
      color: '#2563eb',
    };


    const wrapper = mount(ReminderView);

 
    wrapper.vm.createReminder(testData);

    const storedReminders = JSON.parse(localStorage.getItem('reminders'));

    expect(storedReminders.length).toBe(1);
    expect(storedReminders[0]).toMatchObject(testData);
  });
});
