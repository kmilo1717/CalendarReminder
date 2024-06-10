<template>
    <div class="day">
        <p :class="{'prev-month': day.isPrevMonth, 'next-month': day.isNextMonth}">{{day.number}}</p>
        <div class="tasks">
            <a href="">Crear una pagina</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DayComponent',
    props: ['day']
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
    a{
        text-decoration: none;
        color: white;
        background-color: green;
    }
    .tasks a{
        display: block;
        margin: 8px 0;
        padding: 5px;
        border-radius: 4px;
    }
</style>