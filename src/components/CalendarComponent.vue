<template>
    <h1 class="mt-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Calendar</h1>
    <div class="flex w-[90%] mx-auto">
       <router-link to="/reminder" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New reminder</router-link>
    </div>
    <div>
      <div class="calendar">
          <div class="header">
            
              <div class="month">Junio 2024</div>
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
              <day v-for="day in days" :key="day" :day="day"></day>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Day from './DayComponent.vue'
  export default {
    name: 'CalendarHandler',
    components: {
      Day
    },
    data() {
      return {
        days: []
      }
    },
    methods: {
      getCurrentDaysInMonth() {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth();
        const primerDiaMesActual = new Date(añoActual, mesActual, 1);
        const primerDiaSemana = primerDiaMesActual.getDay()-1;
        const primerDiaMesAnterior = new Date(añoActual, mesActual, 0);
        const ultimoDiaMesAnterior = primerDiaMesAnterior.getDate();
        const ultimoDiaMesActual = new Date(añoActual, mesActual + 1, 0);
        const ultimoDiaMes = ultimoDiaMesActual.getDate();
        const calendario = [];
  
        for (let i = ultimoDiaMesAnterior - primerDiaSemana + 1; i <= ultimoDiaMesAnterior; i++) {
          calendario.push({number:i , 'isPrevMonth': true});
        }
  
        for (let i = 1; i <= ultimoDiaMes; i++) {
          calendario.push({number:i});
        }
  
        for (let i = 1; calendario.length < 35; i++) { 
          calendario.push({number:i , 'isNextMonth': true});
        }
        
        this.days = calendario;
  
      },
    },
    mounted() {
      this.getCurrentDaysInMonth();
    }
    
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
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
      justify-content: center;
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
  