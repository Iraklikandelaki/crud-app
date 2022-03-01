<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="usersLength"
    :per-page="perPage"
    aria-controls="my-table"
    @input="$parent.$emit('paginate', currentPage)"
  ></b-pagination>
</template>

<script>
export default {
    props: ['usersLength'],
    name: "Pagination",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
    };
  },

};
</script>

<style></style>
