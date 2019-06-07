import {
  API_GET,
  API_DELETE,
  API_POST,
  API_PUT
} from "../../services/Api.service";
import ApiConstants from "../../constants/API.constants";
import _ from "lodash";

const API_TODOs = ApiConstants.API_TODOs;

export const GET_ALL_TODOs = userId => {
  const params = { userId: userId };
  return API_GET(API_TODOs, { params });
};

export const DELETE_TODO = todoId => {
  const params = { todoId: todoId };
  return API_DELETE(API_TODOs, { params });
};

export const POST_TODO = (todoId, payload) => {
  const params = todoId !== "" ? { todoId: todoId } : {};
  return API_POST(API_TODOs, payload, { params });
};

export const PUT_TODO = (todoId, payload) => {
  const params = todoId !== "" ? { todoId: todoId } : {};
  return API_PUT(API_TODOs, payload, { params });
};

export const REFRESH = (classObj, userId) => {
  GET_ALL_TODOs(userId)
    .then(res => {
      res.data &&
        classObj.setState({
          pageData: res.data,
          buttonClicked: false
        });
    })
    .catch(err => {
      classObj.setState({ error: "An Error Occured", buttonClicked: false });
      console.log(err);
    });
};

export const TODO_DEFAULT = {
  userId: "",
  todos: [],
  title: "New Todo",
  editDate: _.now()
};
