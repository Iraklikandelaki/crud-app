<template>
  <b-container class="bv-example-row list">
    <b-row
      class="mb-5 p-4 list__row"
      align-v="center"
      v-for="(user, idx) in userListSliced"
      :key="idx"
    >
      <b-col>
        <b-row class="mb-4"> Firstname: {{ user.firstName }} </b-row>

        <b-row class="mb-4"> Lastname: {{ user.lastName }} </b-row>

        <b-row class="mb-4"> Username: {{ user.userName }} </b-row>

        <b-row> E-mail: {{ user.email }} </b-row>
      </b-col>
    </b-row>
    <Pagination :usersLength="userList.length" />
  </b-container>
</template>

<script>
import Pagination from "@/components/UI/Pagination.vue";
export default {
    data(){
        return{
            userListSliced: [],
        }
    },
  components: {
    Pagination,
  },
  mounted() {
    console.log(this.$store.state.users);
    this.$on('paginate', this.sliceList)
  },
  computed: {
    userList() {
      return this.$store.state.users;
    },
  },
  methods: {
      sliceList(curr){
          console.log(curr)
            const param1 = (curr -1)*5;
            this.userListSliced = this.userList.slice(param1, param1+5);

      }
  },

  watch: {
    userList: {
      immediate: true,
      deep: true,
      handler(ns) {
        console.log(ns);
        if(ns.length){
            this.userListSliced = ns.slice(0, 5);
        }
      },
    },
  },
};
</script>

<style lang="scss">
.list {
  &__row {
    border: 2px solid $primary;
    border-radius: 6px;
  }
}
</style>
