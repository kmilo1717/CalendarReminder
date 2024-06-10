import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../views/CalendarView.vue'
import Reminder from '../views/ReminderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/reminder',
      name: 'reminder',
      component: Reminder
    }
  ]
})

export default router
