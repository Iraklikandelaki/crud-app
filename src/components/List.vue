<template>
  <b-container class="bv-example-row list">
    <Card v-for="(user, idx) in userListSliced" :key="idx" :user="user" />
    <Pagination :usersLength="filteredList.length" />
  </b-container>
</template>

<script>
import Pagination from "@/components/UI/Pagination";
import Card from "@/components/UI/Card";
export default {
  data() {
    return {
      userListSliced: [],
      filteredList: [],
      currentPage: 1,
      userId: null,
    };
  },
  components: {
    Pagination,
    Card,
  },
  mounted() {
    this.$on("paginate", this.filterList);
    this.$on("deletedUser", (userId) => {
      this.userId = userId;
    });
  },
  computed: {
    userList() {
      return this.$store.state.users;
    },
  },
  methods: {
    sliceList(curr, list = this.userList) {
      const param1 = (curr - 1) * 5;
      this.userListSliced = list.slice(param1, param1 + 5);
    },

    filterList(curr) {
      console.log(curr)
      if(curr) this.currentPage = curr;
      if (this.userId === null) {
        this.filteredList = this.userList;
        this.sliceList(this.currentPage);
      } else {
        this.filteredList = this.filteredList.filter(
          (user) => user.id !== this.userId
        );
        this.sliceList(this.currentPage, this.filteredList);
      }
    },
  },

  watch: {
    userId(ns) {
      this.filterList(this.currentPage);
    },
    userList: {
      immediate: true,
      deep: true,
      handler(ns) {
        if (ns.length) {
          this.filterList(1);
        }
      },
    },
  },
};
</script>

<style lang="scss">
.list {
  &__row {
    // border: 2px solid $primary;
    // border-radius: 6px;
  }
}
</style>
