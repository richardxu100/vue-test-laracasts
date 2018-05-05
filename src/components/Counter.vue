<template>
  <div>
    The count is {{ count }}
    <button class="increment" @click="count++">Increment count</button>
    <button class="decrement" v-if="count > 0" @click="count--">Decrement count</button>
  </div>
</template>

<script>
  export default {
    name: 'counter',
    data: () => ({
      count: 0,
    })
  }
</script>