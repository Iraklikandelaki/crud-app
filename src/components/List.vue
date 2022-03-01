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
      // userListSliced: [],
      // filteredList: [],
      // currentPage: 1,
      // userId: null,
    };
  },
  components: {
    Pagination,
    Card,
  },
  mounted() {
    this.$on("paginate", this.filterList);
    this.$on("deletedUser", (userId) => {
      this.$store.commit("setState", {
        key: "userId",
        val: userId,
      });
      // this.userId = userId;
    });
  },
  computed: {
    userList() {
      return this.$store.state.users;
    },
    userListSliced() {
      return this.$store.state.userListSliced;
    },
    filteredList() {
      return this.$store.state.filteredList;
    },
    userId() {
      return this.$store.state.userId;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
  methods: {
    sliceList(curr, list = this.filteredList) {
      const param1 = (curr - 1) * 5;
      const userListSliced = list.slice(param1, param1 + 5);
      this.$store.commit("setState", {
        key: "userListSliced",
        val: userListSliced,
      });
    },

    filterList(curr) {
      console.log(curr);
      if (curr) {
        this.$store.commit("setState", {
          key: "currentPage",
          val: curr,
        });
      }
      // this.currentPage = curr;
      if (this.userId === null) {
        // this.filteredList = this.userList;
        // this.$store.commit("setState", {
        //   key: "filteredList",
        //   val: this.userList,
        // });

        this.sliceList(this.currentPage);
      } else {
        const filteredList = this.filteredList.filter(
          (user) => user.id !== this.userId
        );
        this.$store.commit("setState", {
          key: "filteredList",
          val: filteredList,
        });

        this.sliceList(this.currentPage, this.filteredList);
      }
    },
  },

  watch: {
    $route(ns) {
      // this.filterList(this.currentPage);
    },
    userId(ns) {
      this.filterList(this.currentPage);
    },
    userList: {
      immediate: true,
      deep: true,
      handler(ns) {
        console.log('mounted')
        console.log(ns)
        console.log(this.filteredList)
        if (ns.length) {
          // this.$store.commit("setState", {
          //   key: "filteredList",
          //   val: ns,
          // });
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
