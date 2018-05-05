<template>
  <div>
    <!-- Viewing the question. -->
    <div v-if="!editing">
      <h1>{{ question.title }}</h1>
      <div class="body">{{ question.body }}</div>

      <button @click="editing = true" id="edit">Edit</button>
    </div>

    <!-- Editing the question -->
    <div v-else>
      <input type="text" name="title" v-model="form.title">
      <textarea name="body" v-model="form.body"></textarea>

      <button id="cancel" @click="cancel">Cancel</button>  
      <button id="update" @click="update">Update</button>  
    </div>
  </div>
</template>

<script>
  export default {
    props: ['dataQuestion'],
    data() {
      return {
        question: this.dataQuestion, // not a good practice to edit prop directly
        form: {
          title: this.dataQuestion.title,
          body: this.dataQuestion.body,
        },
        editing: false
      }
    },
    methods: {
      cancel() {
        this.editing = false 
        
      },
      update() {
        this.editing = false 
        this.question.title = this.form.title
        this.question.body = this.form.body
      }
    }
  }
</script>