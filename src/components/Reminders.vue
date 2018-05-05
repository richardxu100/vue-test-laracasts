<template>
  <div>
    <input v-model="newReminder" type="text" class="new-reminder">
    <button @click="add">Add Reminder</button>

    <ul v-if="reminders.length">
      <li v-for="reminder in reminders" :key="reminder">
        {{ reminder }}
        <button @click="remove(reminder)" class="remove">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reminders: [],
        newReminder: ''
      }
    },
    methods: {
      add() {
        this.reminders.push(this.newReminder)
        this.newReminder = ''
      },
      remove(reminder) {
        this.reminders = this.reminders.filter(r => r !== reminder)
      }
    }
  }
</script>