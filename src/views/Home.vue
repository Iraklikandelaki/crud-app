<template>
  <div class="home">
    <router-link to="/add-user"> <b-button>New User</b-button></router-link>

    <List />
  </div>
</template>

<script>
import List from "@/components/List";
export default {
  name: "Home",
  components: {
    List,
  },
};
</script>
