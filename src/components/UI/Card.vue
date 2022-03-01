<template>
  <b-card
    class="mb-5 list__row"
    align-v="center"
    border-variant="primary"
    text-variant="dark"
    bg-variant="light"
  >
    <b-card-header class="p-2 mb-2" h-align="end">
      <b-button
        variant="primary"
        class="pointer mr-4"
        v-b-modal="'modal-'+user.id"
        >Delete</b-button
      >
      <b-modal :id="'modal-'+user.id" title="Delete User Dialog">
        <p class="my-4">Are you sure you want to delete this user?</p>

        <div slot="modal-footer">
          <b-button
            variant="primary"
            class="pointer mr-4"
            @click="deleteUser(user.id); $bvModal.hide(`modal-${user.id}`)"
            >Yes</b-button
          >
          <b-button
            variant="dark"
            class="pointer"
            @click="$bvModal.hide(`modal-${user.id}`)"
            >No</b-button
          >
        </div>
      </b-modal>

      <router-link to="/edit">
        <b-button variant="dark" class="pointer" @click="selectUser(user)"
          >Edit</b-button
        >
      </router-link>
    </b-card-header>
    <b-col>
      <b-row class="mb-4" align-v="center">
        <b-icon icon="person-fill" class="mr-2"></b-icon> Firstname:
        <span class="text-secondary ml-2">{{ user.firstName }}</span>
      </b-row>

      <b-row class="mb-4" align-v="center">
        <b-icon icon="person-fill" class="mr-2"></b-icon> Lastname:
        <span class="text-secondary ml-2"> {{ user.lastName }} </span>
      </b-row>

      <b-row class="mb-4" align-v="center">
        <b-icon icon="person-circle" class="mr-2"></b-icon> Username:
        <span class="text-secondary ml-2"> {{ user.userName }} </span>
      </b-row>

      <b-row align-v="center">
        <b-icon icon="envelope" class="mr-2"></b-icon> E-mail:
        <span class="text-secondary ml-2"> {{ user.email }} </span>
      </b-row>
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
    },
    selectUser(user) {
      this.$store.commit("setState", {
        key: "selectedUser",
        val: user,
      });
    },
  },
};
</script>

<style lang="scss"></style>
