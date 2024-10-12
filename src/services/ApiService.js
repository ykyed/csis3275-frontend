import http from "../http-common.js";


class ApiService {
  getShoeList() {
    return http.get("/shoes");
  }
  getShoeDetailInfo(productCode) {
    return http.get(`/shoes/${productCode}`);
  }
}

export default new ApiService();