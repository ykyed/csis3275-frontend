import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: null,
  }),
  actions: {
    setUserName(name) {
      this.userName = name;
    },
    clearUserName() {
      this.userName = null;
    }
  },
});