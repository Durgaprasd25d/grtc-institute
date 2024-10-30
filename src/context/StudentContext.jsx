import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const initialState = {
  student: JSON.parse(localStorage.getItem("studentData")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const actionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const studentReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        student: action.payload.student,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        student: null,
        token: null,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  const login = async (registrationNo, password) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await axios.post(
        "https://grtc-new-node-backend.onrender.com/api/students/login",
        { registrationNo, password }
      );
      const { token, student } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("studentData", JSON.stringify(student));
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { student, token },
      });
      return true;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.response ? error.response.data.message : "Login failed",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentData");
    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <StudentContext.Provider value={{ state, login, logout }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};
