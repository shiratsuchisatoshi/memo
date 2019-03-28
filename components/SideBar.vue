<template>
  <div class="sidebar">
    <header class="header">
      Board Lists
    </header>
    <nuxt-link
      v-for="tab in $store.state.boardList.length"
      class="link"
      :key="tab"
      :to="`/board/?name=${$store.state.boardList[tab - 1].name}`">
      {{ $store.state.boardList[tab - 1].name }}
    </nuxt-link>
     <modal/>
  </div>
</template>

<script>
import modal from '~/components/Modal.vue'

export default {
  components: {
    modal
  }
}
</script>

<style scoped>
  .header{
    height: 50px;
    background: rgba(0, 0, 5, 1);
    color:white;
    text-align: center;
    font-size: 24px;
    padding: 10px;
    }

  .sidebar{
    position: absolute;
    left:0;
    top:0;
    background: rgba(0, 0, 5, 0.6);
    width:250px;
    height:100%;
    overflow: auto;
    z-index:10000 ;
  }

  .link {
    height: 50px;
    width: 100%;
    padding: 10px;
    line-height: 30px;
    display:flex;
    /* justify-content: space-between; */
    color:white;
    font-size: 24px;
  }

</style>
