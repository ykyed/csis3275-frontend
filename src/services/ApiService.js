import http from "../http-common.js";


class ApiService {
  getShoeList() {
    return http.get("/shoes");
  }

  getFilteredShoeList(brands, styles, colors, sizes) {
    console.log(brands, styles, colors, sizes);

    const brandParams = brands.length ? brands.map(brand => `brands=${brand}`).join('&') : '';
    const styleParams = styles.length ? styles.map(style => `styles=${style}`).join('&') : '';
    const colorParams = colors.length ? colors.map(color => `colors=${color}`).join('&') : '';
    const sizeParams = sizes.length ? sizes.map(size => `sizes=${size}`).join('&') : '';

    const queryParams = [brandParams, styleParams, colorParams, sizeParams ].filter(param => param).join('&');

    return http.get(`/filter?${queryParams}`);
  }

  getBrandList() {
    return http.get('/brands')
  }

  getStyleList() {
    return http.get('/styles')
  }

  getColorList() {
    return http.get('/colors')
  }

  getSizeList() {
    return http.get('/sizes')
  }

  getShoeDetailInfo(productCode) {
    return http.get(`/shoes/${productCode}`);
  }

  getUserListForAdmin() {
    return http.get("admin/users");
  }

  signup(userData){
    return http.post("/signup", userData);
  }

  login(credentials) {
    return http.post("/login", credentials);
  }

  getUserInfo() {
    return http.get("/userinfo");
  }

  addItem(shoeInfo) {
    return http.post("/admin/shoes", shoeInfo);
  }

  updateItem(shoeInfo) {
    return http.put("/admin/shoes", shoeInfo);
  }

  deleteItem(productCode) {
    return http.delete(`/admin/shoes/${productCode}`);
  }

  getSizeByProductCode(productCode) {
    return http.get(`/sizes/${productCode}`);
  }

  addSizes(productCode, sizeInfo) {
    return http.post(`/admin/sizes/${productCode}`, sizeInfo);
  }

  updateSizes(productCode, sizeInfo) {
    return http.put(`/admin/sizes/${productCode}`, sizeInfo);
  }

  addReview(reviewInfo) {
    return http.post("/reviews", reviewInfo);
  }

  getCartItemByUser(userEmail) {
    return http.get(`/cart/${userEmail}`);
  }

  addCartItem(CartItem) {
    return http.post("/cart", CartItem);
  }

  updateCartItem(CartItem) {
    return http.put("/cart", CartItem);
  }

  deleteCartItem(id) {
    return http.delete(`/cart/${id}`)
  }

  deleteCartItems(userEmail) {
    return http.delete(`/cart/user/${userEmail}`)
  }
}



export default new ApiService();