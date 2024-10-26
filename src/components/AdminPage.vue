<template>
   <div class="admin-list">
    <h1>User List</h1>
    <table class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.dob }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="admin-list">
    <h1>Item List</h1>
    <table class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ProductCode</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shoe in shoes" :key="shoe.productCode">
          <td>{{ shoe.id }}</td>
          <td>{{ shoe.productCode }}</td>
          <td>{{ shoe.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "../services/ApiService";

export default {
    name: "AdminPage",
    data() {
        return {
            users: [],
            shoes: [],
        };
    },
    created() {
        this.fetchUsers();
        this.fetchShoes();
    },
    methods: {
        fetchUsers() {
            ApiService.getUserListForAdmin()
                .then(Response => {
                   console.log(Response.data);
                    this.users = Response.data;
                })
                .catch(e => {
                   console.log(e.Response.data);
                });
        },

        fetchShoes() {
            ApiService.getShoeList()
                .then(Response => {
                  console.log(Response.data);
                    this.shoes = Response.data;
                })
                .catch(e => {
                   console.log(e.Response.data);
                });
        }
    },
    mounted() {
    }
};
</script>

<style scoped>
.admin-list {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  overflow-x: auto;
}

.admin-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.admin-table th, .admin-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.admin-table th {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
}

.admin-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.admin-table tr:hover {
  background-color: #ddd;
}

.admin-table td {
  text-align: center;
}
</style>