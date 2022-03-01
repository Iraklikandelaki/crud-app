<template>
  <b-card class="mb-5 p-4 list__row" align-v="center" border-variant="primary">
    <b-card-header @click="deleteUser(user.id)">Delete</b-card-header>
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
      async deleteUser(userId){
          const res = await this.$ax.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            this.$parent.$emit('deletedUser', userId)
            console.log(`https://jsonplaceholder.typicode.com/users/${userId}`, res)
      }
  }
};
</script>

<style></style>
