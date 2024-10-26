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
    return http.get("/users");
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
}

export default new ApiService();