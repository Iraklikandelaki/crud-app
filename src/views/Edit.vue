<template>
  <b-container class="edit-page pt-5">
    <b-form @submit="onSubmit" >
      <h2 class="text-primary mb-4">Edit User</h2>
      <b-form-input
        id="input-1"
        class="mb-4 border-info rounded-0"
        v-model="form.firstName"
        :placeholder="selectedUser.firstName"
        size="lg"
    
       
      ></b-form-input>
      <b-form-input
        id="input-2"
        class="mb-4 border-info rounded-0"
        v-model="form.lastName"
        :placeholder="selectedUser.lastName"
         size="lg"
      ></b-form-input>
      <b-form-input
        id="input-3"
        class="mb-4 border-info rounded-0"
        v-model="form.userName"
        :placeholder="selectedUser.userName"
         size="lg"
      ></b-form-input>

      <b-form-input
        id="input-4"
        class="border-info rounded-0"
        v-model="form.email"
        type="email"
        :placeholder="selectedUser.email"
         size="lg"
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
      },
    };
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser;
    },
    filteredList() {
      return this.$store.state.filteredList;
    },
  },

  watch: {
    selectedUser: {
      immediate: true,
      handler(ns) {
        for (const [key, val] of Object.entries(this.form)) {
          this.form[key] = this.selectedUser[key];
        }
      },
    },
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      for (const [key, val] of Object.entries(this.form)) {
        if (!val.length) {
          this.form[key] = this.selectedUser[key];
        }
      }
      this.replaceForm();
    },

    async replaceForm() {
      this.loading = true;
      if (this.selectedUser.id <= 10) {
        const res = await this.$ax.put(
          `https://jsonplaceholder.typicode.com/users/${this.selectedUser.id}`,
          this.form
        );
      }

      const finalArr = this.filteredList.map((item) => {
        if (item.id === this.selectedUser.id) {
          return this.form;
        } else {
          return item;
        }
      });

      this.$store.commit("setState", {
        key: "filteredList",
        val: finalArr,
      });
      this.loading = false;
      this.$router.push('/')
    },
  },
};
</script>

<style></style>
