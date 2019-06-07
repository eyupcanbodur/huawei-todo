import { API_GET } from "../../services/Api.service";
import ApiConstants from "../../constants/API.constants";

const API_LOGIN = ApiConstants.API_LOGIN;

const LOGIN = (email, password) => {
  const params = { email: email, password: password };
  return API_GET(API_LOGIN, { params });
};

export default LOGIN;
