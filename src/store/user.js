import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: localStorage.getItem('userName') || null,
    userRole: localStorage.getItem('userRole') || null,
  }),
  actions: {
    setUserName(name) {
      console.log("setUserName: " + name);
      this.userName = name;
      localStorage.setItem('userName', name);
    },

    getUserName() {
      return this.userName;
    },

    clearUserName() {
      console.log("clearUserName");
      this.userName = null;
      localStorage.removeItem('userName'); 
    },

    setUserRole(role) {
      console.log("setUserRole: " + role);
      this.userRole = role;
      localStorage.setItem('userRole', role);
    },
    
    clearUserRole() {
      console.log("clearUserRole");
      this.userRole = null;
      localStorage.removeItem('userRole');
    }
  },
});