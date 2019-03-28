<template>
  <div class="footer">
    <div
      class="color"
      v-for="id in $store.state.colorbox.length"
     :style="`background-color:${$store.state.colorbox[id-1]};`"
     :key="id"
     @click="changecolor(id)">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changecolor(id) {
      const target = { ...this.$store.state.memoList[this.index] }
      target.background = this.$store.state.colorbox[id - 1]
      this.$store.dispatch('updateMemo', { target: target, index: this.index })
    }
  }
}
</script>

<style scoped>
.footer{
  width: 100%;
  height: 50px;
  display:flex;
  /* justify-content: space-around;
  background: #fff; */
  border-top:2px solid #fff;
  border-bottom:2px solid #fff;
  cursor: pointer;
}
.color {
    height:48px;
    width:100%;
    /* box-sizing: border-box; */
}
.color + .color {
    border-left: 2px solid #fff;
    box-sizing: border-box;
}
</style>
