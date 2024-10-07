import http from "../http-common.js";

class ShoesService {
  shoesList(data) {
    return http.post("/shoes", data);
  }

  // shoesDetail() {
  //   return null;
  // }

  // shoeListByBrand(data) {
  //   return http.get("/shoes/brand/", data);
  // }
}

export default new ShoesService();
