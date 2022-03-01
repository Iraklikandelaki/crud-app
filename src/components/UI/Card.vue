<template>
  <b-card class="mb-5 p-4 list__row" align-v="center" border-variant="primary">
    <b-card-header>
      <b-row>
        <b-col class="pointer" @click="deleteUser(user.id)">Delete</b-col>
        <router-link to="/edit">
          <b-col class="pointer" @click="selectUser(user)">Edit</b-col>
        </router-link>
      </b-row>
    </b-card-header>
    <b-col>
      <b-row class="mb-4"> Firstname: {{ user.firstName }} </b-row>

      <b-row class="mb-4"> Lastname: {{ user.lastName }} </b-row>

      <b-row class="mb-4"> Username: {{ user.userName }} </b-row>

      <b-row> E-mail: {{ user.email }} </b-row>
    </b-col>
  </b-card>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    async deleteUser(userId) {
      const res = await this.$ax.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      this.$parent.$emit("deletedUser", userId);
      console.log(`https://jsonplaceholder.typicode.com/users/${userId}`, res);
    },
    selectUser(user) {
      console.log(user);
      this.$store.commit("setState", {
        key: "selectedUser",
        val: user,
      });
    },
  },
};
</script>

<style lang="scss"></style>
