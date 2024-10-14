import http from "../http-common.js";


class ApiService {
  getShoeList() {
    return http.get("/shoes");
  }

  getFilteredShoeList(brands, styles, colors) {
    console.log(brands, styles, colors);

    const brandParams = brands.length ? brands.map(brand => `brands=${brand}`).join('&') : '';
    const styleParams = styles.length ? styles.map(style => `styles=${style}`).join('&') : '';
    const colorParams = colors.length ? colors.map(color => `colors=${color}`).join('&') : '';

    const queryParams = [brandParams, styleParams, colorParams ].filter(param => param).join('&');

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

  getShoeDetailInfo(productCode) {
    return http.get(`/shoes/${productCode}`);
  }
}

export default new ApiService();