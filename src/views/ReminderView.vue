<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Registra tu recordatorio</h2>
      <br>
      <form @submit.prevent="handleForm" class="w-full max-w-lg">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Fecha
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
            placeholder="Select date" datepicker-format="dd-mm-yyyy" v-model="dataForm.date">
        </div>
        <br>
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Hora
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
          Descripción
        </label>
        <div class="relative max-w-sm">
          <textarea id="message" v-model="dataForm.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <br>
        <div v-if="!countrySelected" class="relative">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Pais
          </label>
          <input type="text" v-model="searchTerm" @input="clearSelection" placeholder="Buscar..."
            class="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg">
          <ul class="overflow-y-auto max-h-48">
            <li v-for="item in filteredList" :key="countries.iso2" class="cursor-pointer" @click="selectCountry(item)">
              {{ item.nameES }}</li>
          </ul>
        </div>
        <div v-else class="relative">
          <p class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">País seleccionado: {{ countrySelected.nameES }}</p>
          <button @click="clearSelection"
            class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Cambiar País
          </button>
        </div>
        <br>
        <div class="relative">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
            Color de etiqueta
          </label>
          <input type="color"
            class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            id="hs-color-input" value="#2563eb" title="Choose your color" v-model="dataForm.color"/>
        </div>
        <div class="mt-8 flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Guardar
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Cancelar
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { countries } from '../data/countries.js';
import Dropdown from 'vue-simple-search-dropdown';
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
      },
      countrySelected: null,
      searchTerm: '',
      countries: countries,
    };
  },
  methods: {
    handleForm() {
      console.log('Guardando datos...', this.dataForm);
      localStorage.setItem('savedDate', this.savedDate);
    },
    selectCountry(country) {
      this.countrySelected = country;
      this.dataForm.country = country.iso2;
    },
    clearSelection() {
      this.countrySelected = null;
      this.dataForm.country = '';
    }
  },
  computed: {
    filteredList() {
      return this.countries.filter(item =>
        item.nameES.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
}
</script>

<style scoped></style>
