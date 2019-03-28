<template>
  <section class='background'>
    <div class='container'>
      <h1>Memo App</h1>
      <b-form-input class='inputBox' placeholder='Enter your board-name' v-model='name' />
        <b-button  class='btn' variant='info' @click='enterpage'>OK</b-button>
    </div>
  </section>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('getBoards')
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async enterpage() {
      if (this.name === '') {
        alert('名前が未入力です')
        return
      }
      const boardData = this.$store.state.boardList.find(b => b.name === this.name)
      if (boardData) {
        this.$router.push(`/board/?name=${boardData.name}`)
      } else {
        await this.$store.dispatch('createBoard', [
          ...this.$store.state.boardList,
          {
            name: this.name
          }])
        this.$router.push(`/board/?name=${this.name}`)
      }
    }
  }
}
</script>

<style>
.background{
  /* text-align: center; */
  background: center/cover url('../assets/index-back.jpg');
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  max-width: 100%;
}

.container{
  top: 55%;
  left: 10%;
  width: 500px;
  padding: 0;
  position: absolute;
}

h1{
  color:whitesmoke;
  font-family: Meiryo;
  margin-bottom: 60px;
}

.inputBox{
  width:500px;
  height:60px;
  left:0;
  top:50%;
  position: absolute;
}

.btn{
  width:100px;
  height:60px;
  top:50%;
  left:500px;
  position: absolute;
}
</style>
