<template>
  <b-container class="edit-page">
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-1"
        class="mb-4"
        v-model="form.firstName"
        :placeholder="selectedUser.firstName"
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="mb-4"
        v-model="form.lastName"
        :placeholder="selectedUser.lastName"
      ></b-form-input>
      <b-form-input
        id="input-3"
        class="mb-4"
        v-model="form.userName"
        :placeholder="selectedUser.userName"
      ></b-form-input>

      <b-form-input
        id="input-4"
        v-model="form.email"
        type="email"
        :placeholder="selectedUser.email"
      ></b-form-input>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
      },
    };
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser;
    },
  },

  watch: {
    selectedUser: {
      immediate: true,
      handler(ns) {
        console.log(ns);
        for (const [key, val] of Object.entries(this.form)) {
          this.form[key] = this.selectedUser[key];
        }
      },
    },
  },
  methods: {
    onSubmit(ev) {
      console.log(this.selectedUser);
      ev.preventDefault();
      for (const [key, val] of Object.entries(this.form)) {
        if (!val.length) {
          this.form[key] = this.selectedUser[key];
        }
      }
      console.log(this.form)
      this.replaceForm();
    },

    async replaceForm(){
      const res = await this.$ax.put(`https://jsonplaceholder.typicode.com/users/${this.selectedUser.id}`, this.form)
      console.log(res)
           
    }
  },
};
</script>

<style></style>
