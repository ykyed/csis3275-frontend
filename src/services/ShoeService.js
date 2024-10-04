import http from "../http-common.js";

class ShoeService {
  shoeList(data) {
    return http.post("/shoelist", data);
  }
}

export default new ShoeService();
