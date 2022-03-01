<template>
  <b-container class="new-user">
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-1"
        class="mb-4"
        v-model="form.firstName"
        placeholder="Firstname"
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="mb-4"
        v-model="form.lastName"
        placeholder="Lastname"
      ></b-form-input>
      <b-form-input
        id="input-3"
        class="mb-4"
        v-model="form.userName"
        placeholder="Username"
      ></b-form-input>

      <b-form-input
        id="input-4"
        v-model="form.email"
        type="email"
        placeholder="Email"
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
        id: "",
      },
    };
  },
  computed: {
    filteredList() {
      return this.$store.state.filteredList;
    },
  },

  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.addForm();
    },

    async addForm() {
      this.form.id = this.filteredList.length + 1;
      const res = await this.$ax.post(
        `https://jsonplaceholder.typicode.com/users/`,
        this.form
      );

      const finalArr = [...this.filteredList, this.form];

      this.$store.commit("setState", {
        key: "filteredList",
        val: finalArr,
      });
    },
  },
};
</script>

<style></style>
