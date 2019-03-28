<template>
  <div>
 <b-button
  class="newbtn"
  v-b-modal.modalPrevent >create new board</b-button>

    <!-- Modal Component -->
    <b-modal
      class="newmodal"
      id="modalPrevent"
      ref="modal"
      title="Please enter new board-name"
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Please Enter" v-model="name" />
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
      // names: []
    }
  },
  methods: {
    clearName() {
      this.name = ''
    },
    async handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.name) {
        alert('Please enter new board-name')
        return
      }
      // else {
      //   this.handleSubmit()
      // }
      const boardData = this.$store.state.boardList.find(b => b.name === this.name)
      if (boardData) {
        this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
        this.clearName()
        this.$router.push(`/board/?name=${boardData.name}`)
      } else {
        await this.$store.dispatch('createBoard', [
          ...this.$store.state.boardList,
          {
            name: this.name
          }])
        this.$router.push(`/board/?name=${this.name}`)
        this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modal.hide()
        })
      }
    }
    // handleSubmit() {
    //   this.names.push(this.name)
    //   this.clearName()
    //   this.$nextTick(() => {
    //     // Wrapped in $nextTick to ensure DOM is rendered before closing
    //     this.$refs.modal.hide()
    //   })
    // }
  }
}
</script>

<style scoped>

.newmodal{
  color:black;
}

.newbtn {
  height: 50px;
  width: 100%;
  line-height: 30px;
  justify-content: space-between;
  color:white;
  font-size: 24px;
}

</style>
