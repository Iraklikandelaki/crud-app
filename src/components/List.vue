<template>
  <div class="bv-example-row list">
    <b-row h-align="start">
      <router-link to="/add-user">
        <b-button class="mb-4" align-self="start">
          <b-icon icon="person-plus-fill" class="mr-2"></b-icon> New
          User</b-button
        ></router-link
      >
    </b-row>
     <b-row h-align="start">
       <b-col class="p-0">
      <Card v-for="(user, idx) in userListSliced" :key="idx" :user="user" />
      </b-col>
    </b-row>
    <Pagination :usersLength="filteredList.length" />
  </div>
</template>

<script>
import Pagination from "@/components/UI/Pagination";
import Card from "@/components/UI/Card";
export default {

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
      if (curr) {
        this.$store.commit("setState", {
          key: "currentPage",
          val: curr,
        });
      }
      if (this.userId === null) {
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
    userId() {
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


