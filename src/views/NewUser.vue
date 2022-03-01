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
         required
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="mb-4 border-info rounded-0"
        v-model="form.lastName"
        placeholder="Lastname"
         size="lg"
         required
      ></b-form-input>
      <b-form-input
        id="input-3"
        class="mb-4 border-info rounded-0"
        v-model="form.userName"
        placeholder="Username"
         size="lg"
         required
      ></b-form-input>

      <b-form-input
        id="input-4"
        v-model="form.email"
        class="border-info rounded-0"
        type="email"
        placeholder="Email"
         size="lg"
         required
      ></b-form-input>

      <b-button type="submit" size="lg" variant="primary mt-4" v-if="!loading">Submit</b-button>
       <b-icon icon="arrow-clockwise" animation="spin" font-scale="4" class="mt-4" v-else></b-icon>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
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
      this.form.id = this.filteredList[this.filteredList.length -1].id + 1;
      this.loading = true;
      const res = await this.$ax.post(
        `https://jsonplaceholder.typicode.com/users/`,
        this.form
      );

      const finalArr = [...this.filteredList, this.form];
      console.log(finalArr)
      console.log(this.form.id)
      this.$store.commit("setState", {
        key: "filteredList",
        val: finalArr,
      });
      this.$store.commit("setState", {
        key: "userId",
        val: null,
      });
      this.loading = false;
      this.$router.push('/')

    },
  },
};
</script>

<style></style>
