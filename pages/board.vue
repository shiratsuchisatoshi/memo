<template>
  <div
    class="background"
    @mousemove="movememo"
    @mouseup="leavememo"
    >
    <b-button class="btn" @click="plus">+</b-button>
    <memo
      v-for="(n,index) in $store.state.memoList"
      :key="index"
      :index="index"
      :top="n.top"
      :left="n.left"
      :zindex="n.zindex"
      :background="n.background"
      @dragStart="start($event, index)"/>
    <sidebar/>
  </div>
</template>

<script>
import memo from '~/components/Memo.vue'
import sidebar from '~/components/SideBar.vue'
import firebase from '@/plugins/firebase'

const db = firebase.database()

export default {
  components: {
    memo,
    sidebar
  },
  watchQuery: ['name'],
  async fetch({ store, route }) {
    console.log('fetch★')
    if (store.getters.memoPath !== null) {
      db.ref(store.getters.memoPath).off('value')
    }
    store.commit('setCurrentBoardId', route.query.name)
    await store.dispatch('getBoards')
    // firebaseから該当boardに紐づくメモデータを取得している。
    db.ref(store.getters.memoPath).once('value', snapshot => store.commit('setMemoData', snapshot.val() || []))
  },
  data() {
    return {
      draggingIndex: null,
      prevX: null,
      prevY: null
    }
  },
  methods: {
    async plus() {
      // const newMemoData = [...this.$store.state.memoList]
      // const lastMemo = newMemoData[newMemoData.length - 1] || { id: 0 }
      await this.$store.dispatch('addmemo', [
        ...this.$store.state.memoList,
        {
          // id: lastMemo.id + 1,
          top: 20,
          left: 270,
          zindex: 1,
          text: '',
          background: this.$store.state.colorbox[ Math.floor(Math.random() * this.$store.state.colorbox.length) ]
        }
      ])
    },
    start({ x, y }, index) {
      this.draggingIndex = index
      this.prevX = x
      this.prevY = y
    },
    movememo(e) {
      if (this.draggingIndex === null) return
      const x = e.pageX
      const y = e.pageY
      const target = { ...this.$store.state.memoList[this.draggingIndex] }
      target.left += x - this.prevX
      target.top += y - this.prevY
      this.$store.commit('commitUpdateMemo', {
        target: target,
        index: this.draggingIndex })
      this.prevX = x
      this.prevY = y
    },
    leavememo() {
      this.$store.dispatch('updateMemo', {
        target: { ...this.$store.state.memoList[this.draggingIndex] },
        index: this.draggingIndex
      })
      this.draggingIndex = null
    }
  }
}
</script>

<style scoped>
.background{
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  background: center url('../assets/board-back.jpg');
}
.btn{
  position: absolute;
  right:0;
}

</style>
