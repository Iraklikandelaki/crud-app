<template>
  <b-container class="home pt-5 pb-5">
    <List />
  </b-container>
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
