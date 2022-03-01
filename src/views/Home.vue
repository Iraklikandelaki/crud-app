<template>
  <b-container class="home pt-5 pb-5">
    <List v-if="reqStatus === 'finished'" />
       <b-icon icon="arrow-clockwise" animation="spin" font-scale="4" class="mt-4" v-else></b-icon>

  </b-container>
</template>

<script>
import List from "@/components/List";
export default {
  name: "Home",
  components: {
    List,
  },
  computed: {
    reqStatus(){
      return this.$store.state.reqStatus;
    }
  }
};
</script>
