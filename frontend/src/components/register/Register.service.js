import { API_POST } from "../../services/Api.service";
import ApiConstants from "../../constants/API.constants";

const API_REGISTER = ApiConstants.API_REGISTER;

const REGISTER = payload => {
  return API_POST(API_REGISTER, payload);
};

export default REGISTER;
