<template>
  <div class="admin-page">
   <div class="list">
    <h1>User List</h1>
    <table class="table">
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

  <div class="list">
    <div class="list-title-bar">
      <h1>Item List</h1>
      <button class="add-item-btn" @click="openAddDialog">Add Item</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ProductCode</th>
          <th>Price</th>
          <th>Color</th>
          <th>Style</th>
          <th>Brand</th>
          <th>Update / Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.productCode">
          <td>{{ item.id }}</td>
          <td>{{ item.productCode }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.style }}</td>
          <td>{{ item.brand }}</td>
          <td>
            <button class="btn" @click="openUpdateDialog(item)">Update</button>
            <button class="btn" @click="confirmDelete(item.productCode)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ItemDialog v-if="isDialogOpen" :item="currentItem" :sizes="currentSizes" @close="closeDialog" @save="handleSave" />
    <ConfirmDialog v-if="isDeleteConfirmOpen" :message="'Are you sure you want to delete this item?'" @confirm="handleDelete" @cancel="closeDeleteConfirm"/>
  </div>
</div>
</template>

<script>
import ApiService from "../services/ApiService";
import ItemDialog from './ItemDialog.vue';
import ConfirmDialog from './ConfirmDialog.vue';

export default {
    components: { ItemDialog, ConfirmDialog },
    name: "AdminPage",
    data() {
        return {
            users: [],
            items: [],
            isDialogOpen: false,
            isDeleteConfirmOpen: false,
            currentItem: null,
            currentSizes: [],
            deleteItemCode: null,
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
                  this.items = Response.data;
              })
              .catch(e => {
                  console.log(e.Response.data);
              });
        },

        async fetchSizes(productCode) {
          const response = await ApiService.getSizeByProductCode(productCode);
          this.currentSizes = response.data;
          console.log("fetchSizes: " +  this.currentSizes[0].productCode);
          console.log("fetchSizes: " +  this.currentSizes[0].id);
        },

        openAddDialog() {
          console.info("openAddDialog");
          this.currentItem = null;
          this.currentSizes = [];
          this.isDialogOpen = true;
        },

        async openUpdateDialog(item) {
          this.currentItem = { ...item }; 
          await this.fetchSizes(item.productCode);
          console.log("openUpdateDialog: " + this.currentSizes);
          this.isDialogOpen = true;
        },

        confirmDelete(productCode) {
          this.deleteItemCode = productCode;
          this.isDeleteConfirmOpen = true;
        },

        closeDialog() {
          this.isDialogOpen = false;
          this.currentItem = null;
        },

        async handleSave(itemData) {
          const { sizes, ...itemInfo } = itemData;

          if (this.currentItem) {
            await ApiService.updateItem(itemInfo);
            this.items = this.items.map(item =>
               item.productCode === itemInfo.productCode ? itemInfo : item
            );

            console.log("handleSave update: " + sizes[0].productCode);
            console.log("handleSave update: " + sizes[0].id);
            await ApiService.updateSizes(itemInfo.productCode, sizes);
          } else {
            await ApiService.addItem(itemInfo);
            this.items.push(itemInfo);
            await ApiService.addSizes(itemInfo.productCode, sizes);
          }
          this.closeDialog();
        },

        closeDeleteConfirm() {
          this.isDeleteConfirmOpen = false;
          this.deleteItemCode = null;
        },
        
        async handleDelete() {
          await ApiService.deleteItem(this.deleteItemCode);
          this.items = this.items.filter(item => item.productCode !== this.deleteItemCode);
          this.closeDeleteConfirm();
        },
    },
    mounted() {
    }
};
</script>

<style scoped>

.admin-page {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center; 
  margin: 0 auto;
}

.list {
  padding: 20px;
  width: 100%;
}

.list-title-bar {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}

.list-title-bar  h1 {
  display: inline-block;
}

.add-item-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 7px 10px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 5px;
}

.add-item-btn:hover {
  background-color: #ccc;
  color: black;
}

.btn {
  padding: 7px 10px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

.btn:hover {
  background-color: #ccc;
  color: black;
}


h1 {
  text-align: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  overflow-x: auto;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table td {
  text-align: center;
}
</style>