<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 v-if="!dataForm.id" class="text-2xl font-bold mb-6 text-center">Create new reminder</h2>
      <h2 v-else class="text-2xl font-bold mb-6 text-center">Update reminder</h2>
      <br>
      <form @submit.prevent="handleForm" class="w-full max-w-lg">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Date
        </label>
        <div class="relative max-w-sm">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date" datepicker-format="dd-mm-yyyy" v-model="dataForm.date" required>
        </div>
        <br>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Hour
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <input type="time" id="time"
            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value="00:00" required v-model="dataForm.time"/>
        </div>
        <br>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Description
        </label>
        <div class="relative max-w-sm">
          <textarea id="message" v-model="dataForm.description" rows="4" maxlength="30"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Max 30 characters..."></textarea>
          <div class="text-right text-gray-500 text-xs mt-1">
            {{ dataForm.description.length }}/30 characters
          </div>
        </div>
        <br>
        <div v-if="!countrySelected" class="relative">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Counry
          </label>
          <input type="text" v-model="searchTerm" @input="clearSelection" placeholder="Search..."
            class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg">
          <ul class="overflow-y-auto max-h-48">
            <li v-for="item in filteredList" :key="countries.iso2" class="cursor-pointer" @click="selectCountry(item)">
              {{ item.nameES }}</li>
          </ul>
        </div>
        <div v-else class="relative">
          <p class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Country selected: {{ countrySelected.nameES }}</p>
          <p v-if="weather" class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Weather: {{ weather }}</p>
          <button @click="clearSelection"
            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Change country
          </button>
        </div>
        <br>
        <div class="relative">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Label color
          </label>
          <input type="color"
            class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            id="hs-color-input" value="#2563eb" title="Choose your color" v-model="dataForm.color"/>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Save
          </button>
          <button v-if="dataForm.id" @click="deleteReminder(dataForm.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
          <router-link to="/" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { countries } from '../data/countries.js';

export default {
  name: 'ReminderView',
  data() {
    return {
      dataForm: {
        date: '',
        time: '',
        country: '',
        description: '',
        color: '#0f4499',
        id: null,
      },
      countrySelected: null,
      searchTerm: '',
      countries: countries,
      weather: null,
    };
  },
  methods: {
    handleForm() {

      if (this.dataForm.id) {
        this.editReminder(this.dataForm.id, this.dataForm);
      } else {
        this.createReminder(this.dataForm);
      }
      this.clearForm();
      this.redirectToHome();
    },
    selectCountry(country) {
      this.countrySelected = country;
      this.dataForm.country = country.iso2;

      this.getWeather(country.iso2);
    },
    clearSelection() {
      this.countrySelected = null;
      this.dataForm.country = '';
    },
    createReminder(data) {

      let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

      data.id = Date.now();
 
      reminders.push(data);
  
      localStorage.setItem('reminders', JSON.stringify(reminders));
      console.log('Recordatorio creado:', data);
    },
    editReminder(id, updatedData) {
  
      let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    
      const index = reminders.findIndex(reminder => reminder.id === id);
      if (index !== -1) {

        reminders[index] = updatedData;

        localStorage.setItem('reminders', JSON.stringify(reminders));
        console.log('Recordatorio editado:', updatedData);
      }
    },
    getReminders() {
    
      return JSON.parse(localStorage.getItem('reminders')) || [];
    },
    getReminderById(id) {
      let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
      return reminders.find(reminder => reminder.id === id);
    },
    deleteReminder(id) {
  
      let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
   
      const index = reminders.findIndex(reminder => reminder.id === id);
      if (index !== -1) {
 
        reminders.splice(index, 1);
   
        localStorage.setItem('reminders', JSON.stringify(reminders));
        this.clearForm();
        this.redirectToHome();
      }
    },
    clearForm() {

      this.dataForm = {
        date: '',
        time: '',
        country: '',
        description: '',
        color: '#0f4499',
      };
      this.clearSelection();
    },
    redirectToHome() {
      this.$router.push({ path: '/' });
    },
    ifeditReminder() {
      const reminderId = this.$route ? this.$route.params.id : null;
      if (reminderId) {
        const reminder = this.getReminderById(Number(reminderId));
        if (reminder) {
          this.dataForm = { ...reminder };
          this.countrySelected = this.countries.find(country => country.iso2 === reminder.country);
        }
      }
    },
    async getLatandLong(countryCode) {
        const countryName = this.countries.find(country => country.iso2 === countryCode);
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${countryName.nameES},${countryCode}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
            const data = await response.json();
            return { lat: data[0].lat, lon: data[0].lon }
        } catch (error) {
            this.weather = 'Clima no registrado';
        }
    },
    async getWeather(countryCode) {
        const { lat, lon } = await this.getLatandLong(countryCode);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            this.weather = data.weather[0].description;
        } catch (error) {
            this.weather = 'Clima no registrado';
        }
    }
  },
  computed: {
    filteredList() {
      return this.countries.filter(item =>
        item.nameES.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    this.ifeditReminder();
    if (this.dataForm.country) {
        this.getWeather(this.dataForm.country);
    }
  },
}
</script>


<style scoped></style>
