<template>
  <textarea class="text" @input="onInput" :value="$store.state.memoList[index].text" ></textarea>
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
    onInput(e) {
      // 連想配列にせず直接文字を送るように少々書き換えた
      this.$emit('inputEvent', e.target.value)
    }
  }
}
</script>

<style scoped>
.text{
  width: 100%;
  height: 200px;
  background: transparent;
  color: #fff;
  font-size: 20px;
  border: none;
  resize: none;
  outline: none;
  padding: 15px;
}
</style>
