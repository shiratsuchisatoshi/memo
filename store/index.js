
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  colorbox: ['#FFC7AF', '#FFBEDA', '#DCC2FF', '#BAD3FF', '#1BFF4A'],
  memoList: [],
  boardList: [],
  boardsPath: '/boards',
  currentBoardId: null
})

export const plugins = [
  (store) => {
    // 部屋や名前の作成を監視する
    db.ref(store.state.boardsPath).on('value', (snapshot) => {
      store.commit('setBoards', snapshot.val() || [])
    })
  }
]

export const getters = {
  memoPath(state) {
    return state.currentBoardId ? `/memos/${state.currentBoardId}` : null
  }
}

export const mutations = {
  setBoards(state, boardList) {
    state.boardList = boardList
  },
  setCurrentBoardId(state, id) {
    state.currentBoardId = id
  },
  setMemoData(state, memoList) {
    state.memoList = memoList
  },
  addmemo(state, memo) {
    state.memoList = memo
  },
  removememo(state, index) {
    state.memoList = [...state.memoList]
    state.memoList.splice(index, 1)
  },
  commitUpdateMemo(state, { target, index }) {
    state.memoList = [...state.memoList]
    state.memoList[index] = target
  }
}

export const actions = {
  // actionsの第一引数は{}の分割代入で書く
  // https://qiita.com/mogya/items/7b4f9a2f3fa08909a135
  async getBoards({ commit, state }) {
    const snapshot = await db.ref(state.boardsPath).once('value')
    commit('setBoards', snapshot.val() || [])
  },
  async createBoard({ state }, name) {
    // const memos = state.memoList
    // const id = Math.max(...state.boardList.map(b => b.id), 0) + 1
    // await db.ref(state.boardsPath).set([...state.boardList, { name: name }])
    await db.ref(state.boardsPath).set(name)
  },
  async addmemo({ commit, getters }, name) {
    await db.ref(getters.memoPath).set(name)
    commit('setMemoData', name)
  },
  async updateMemo({ state, commit, getters }, { target, index }) {
    const newMemoData = [...state.memoList]
    newMemoData[index] = target
    await db.ref(getters.memoPath).set(newMemoData)
    commit('setMemoData', newMemoData)
  },
  async removememo({ state, commit, getters }, index) {
    const newMemoData = [...state.memoList]
    newMemoData.splice(index, 1)
    await db.ref(getters.memoPath).set(newMemoData)
    commit('setMemoData', newMemoData)
  },
  async updateText({ state, commit, getters }, { text, index }) {
    const newMemoData = [...state.memoList]
    newMemoData[index] = {
      ...newMemoData[index],
      text
    }
    await db.ref(getters.memoPath).set(newMemoData)
    commit('setMemoData', newMemoData)
  }
}
