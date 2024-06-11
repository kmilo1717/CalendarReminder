<template>
  <div>
    <h1 class="mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Calendar reminder</h1>
    <div class="flex w-[90%] mx-auto justify-between">
      <router-link to="/reminder" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New reminder</router-link>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteCalendar">Delete all calendar</button>
    </div>
    <div>
      <div class="calendar">
        <div class="header">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="getPreviousMonth"><<</button>
          <div class="month capitalize">{{ getMonthDisplayName() }} {{ year }}</div>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="getNextMonth">>></button>
        </div>
        <div class="weekdays">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>
        <div class="days">
          <Day v-for="day in days" :key="day.date" :day="day" :tasks="getTasksForDay(day)"></Day>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Day from './DayComponent.vue';

export default {
  name: 'CalendarHandler',
  components: {
    Day,
  },
  data() {
    return {
      month: 0,
      year: 0,
      days: [],
      tasks: []
    };
  },
  methods: {
    getCurrentDaysInMonth() {
      const añoActual = this.year;
      const mesActual = this.month;
      const primerDiaMesActual = new Date(añoActual, mesActual, 1);
      const primerDiaSemana = primerDiaMesActual.getDay() === 0 ? 6 : primerDiaMesActual.getDay() - 1;
      const primerDiaMesAnterior = new Date(añoActual, mesActual, 0);
      const ultimoDiaMesAnterior = primerDiaMesAnterior.getDate();
      const ultimoDiaMesActual = new Date(añoActual, mesActual + 1, 0);
      const ultimoDiaMes = ultimoDiaMesActual.getDate();
      const calendario = [];

      for (let i = ultimoDiaMesAnterior - primerDiaSemana + 1; i <= ultimoDiaMesAnterior; i++) {
        calendario.push({ number: i, isPrevMonth: true, date: this.formatDate(añoActual, mesActual - 1, i) });
      }

      for (let i = 1; i <= ultimoDiaMes; i++) {
        calendario.push({ number: i, isCurrentMonth: true, date: this.formatDate(añoActual, mesActual, i) });
      }

      for (let i = 1; calendario.length < 35; i++) { // Asegurar 6 filas de semanas
        calendario.push({ number: i, isNextMonth: true, date: this.formatDate(añoActual, mesActual + 1, i) });
      }

      this.days = calendario;
    },
    formatDate(year, month, day) {
      const adjustedMonth = month < 0 ? 11 : month > 11 ? 0 : month;
      const adjustedYear = month < 0 ? year - 1 : month > 11 ? year + 1 : year;
      return `${adjustedYear}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    },
    getTasksForDay(day) {
      return this.tasks.filter(task => task.date === day.date);
    },
    loadTasks() {
      this.tasks = JSON.parse(localStorage.getItem('reminders')) || [];
    },
    deleteCalendar() {
      localStorage.clear();
      window.location.reload();
    },
    getPreviousMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
      this.getCurrentDaysInMonth();
      this.loadTasks();
    },
    getNextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
      this.getCurrentDaysInMonth();
      this.loadTasks();
    },
    getMonthDisplayName() {
      return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(this.year, this.month));
    }
  },
  mounted() {
    const fechaActual = new Date();
    this.month = fechaActual.getMonth();
    this.year = fechaActual.getFullYear();
    this.getCurrentDaysInMonth();
    this.loadTasks();
  }
};
</script>
  
  <style scoped>
  template {
      display: flex;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
  }
  
  .calendar {
      margin: 40px auto;
      width: 90%;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2196F3;
      color: white;
      padding: 10px 0;
  }
  
  .month {
      font-size: 1.2em;
      font-weight: bold;
  }
  
  .weekdays, .days {
      display: flex;
      flex-wrap: wrap;
  }
  
  .weekdays div, .days div {
      width: calc(100% / 7);
      padding: 10px 0;
      border: 1px solid #eee;
      box-sizing: border-box;
  }
  
  .weekdays {
      background-color: #eee;
      font-weight: bold;
      text-align: center;
  }
  
  .days div {
      min-height: 120px;
  }
  h1{
      text-align: center;
  }
  </style>
  