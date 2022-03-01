<template>
  <b-container class="new-user pt-5">
    <b-form @submit="onSubmit">
        <h2 class="text-primary mb-4">Add New User</h2>
      <b-form-input
        id="input-1"
         class="mb-4 border-info rounded-0"
        v-model="form.firstName"
        placeholder="Firstname"
         size="lg"
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="mb-4 border-info rounded-0"
        v-model="form.lastName"
        placeholder="Lastname"
         size="lg"
      ></b-form-input>
      <b-form-input
        id="input-3"
        class="mb-4 border-info rounded-0"
        v-model="form.userName"
        placeholder="Username"
         size="lg"
      ></b-form-input>

      <b-form-input
        id="input-4"
        v-model="form.email"
        class="border-info rounded-0"
        type="email"
        placeholder="Email"
         size="lg"
      ></b-form-input>

      <b-button type="submit" size="lg" variant="primary mt-4">Submit</b-button>
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
      this.$router.push('/')

    },
  },
};
</script>

<style></style>
