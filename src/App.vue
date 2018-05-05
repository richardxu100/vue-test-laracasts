<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Question :data-question="{title: 'Rich', body: 'Richs life'}" />
    <!-- <Reminders /> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Counter from './components/Counter.vue'
import Reminders from './components/Reminders.vue'
import Question from './components/Question.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Counter,
    Reminders,
    Question,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
