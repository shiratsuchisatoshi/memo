<template>
  <div
    class="memo"
    :style="`
      top:${top}px;
      left:${left}px;
      z-index:${zindex};
      background-color:${background};
      `"
    @mousedown="zindexplus">
      <div class="memo-header" @mousedown="dragStart">
        <div class="close-btn" @click="removememo(index)">×</div>
      </div>
        <editor :index="index" :text="text" @inputEvent="onInput"/>
        <coloerfooter :index="index"/>
  </div>
</template>

<script>
import editor from '~/components/Editor.vue'
import coloerfooter from '~/components/ColorFooter.vue'

export default {
  components: {
    editor,
    coloerfooter
  },
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    zindex: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    background: {
      type: String,
      default: null
    }
  },
  methods: {
    removememo(index) {
      this.$store.dispatch('removememo', index)
    },
    dragStart(e) {
      this.$emit('dragStart', {
        x: e.pageX,
        y: e.pageY
      })
    },
    zindexplus() {
      if (this.$store.state.memoList.length === 0) {
        return
      }
      const zindexbox = []

      for (let i = 0; i < this.$store.state.memoList.length; i++) {
        zindexbox.push(this.$store.state.memoList[i].zindex)
      }

      const maxzindex = Math.max(...zindexbox) + 1

      const target = { ...this.$store.state.memoList[this.index] }

      target.zindex = maxzindex

      this.$store.commit('commitUpdateMemo', {
        index: this.index,
        target: target
      })
    },
    onInput(text) {
      const target = { ...this.$store.state.memoList[this.index] }
      target.text = text
      console.log('l', target)
      this.$store.dispatch('updateMemo', {
        index: this.index,
        target: target
      })
    }
  }
}
</script>

<style scoped>
.memo{
  position:absolute;
  width: 200px;
  height: 300px;
}

.memo-header{
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  cursor: move;
}

.close-btn{
  position: absolute;
  top:0;
  right:10px;
  font-size: 30px;
  color:white;
  cursor: pointer;
  opacity: 0.5;
}

.close-btn:hover{
  opacity: 1;
}

</style>
