<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getUsers");
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
