<template>
  <div class="searchbox">
    <div class="bg-white">
      <button class="btn-search search-icon fl"></button>
      <div class="input-search">
        <input type="text" :placeholder="title">
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router/index';
  export default {
    name: 'searchbox',
    props: ['title'],
    methods: {
    }
  }
</script>

<style lang="scss">
.searchbox {
  padding: 5px;
  >div {
    border-radius: 5px;
  }
  .btn-search {
    margin-left: 10px;
    margin-top: 10px;
  }
  .input-search {
    margin-left: 30px;
  }
  input {
    padding: 0 10px;
    font-size: 14px;
  }
}
</style>

