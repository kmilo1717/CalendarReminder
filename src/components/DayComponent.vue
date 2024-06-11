<template>
    <div class="day">
        <p :class="{'prev-month': day.isPrevMonth, 'next-month': day.isNextMonth}">{{day.number}}</p>
        <div class="tasks" v-for="task in tasks" :key="task.id">
            <router-link class="task" :to="`/reminder/${task.id}`" :style="{'background-color': task.color}">{{ task.time }} - {{ task.description }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    day: Object,
    tasks: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
    .prev-month,.next-month {
        color: #ccc;
        background-color: #f9f9f9;
    }
    p {
        text-align: left;
        margin: 2px 6px;
    }
    .task{
        text-decoration: none;
        color: white;
    }
    .tasks .task{
        display: block;
        margin: 8px 0;
        padding: 5px;
        border-radius: 4px;
    }
</style>