import axios from "axios";
import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
} from "./userSlice";
const baseURl = "http://localhost:5000";

export const loginUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${baseURl}/${role}Login`, fields, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.role) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const registerUser = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${baseURl}/${role}Reg`, fields, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else if (result.data.school) {
      dispatch(stuffAdded());
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${baseURl}/${address}/${id}`);
    if (result.data) {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// export const deleteUser = (id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.delete(`${baseURl}/${address}/${id}`);
//         if (result.data.message) {
//             dispatch(getFailed(result.data.message));
//         } else {
//             dispatch(getDeleteSuccess());
//         }
//     } catch (error) {
//         dispatch(getError(error));
//     }
// }

export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${baseURl}/${address}/${id}`, fields, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${baseURl}/${address}Create`, fields, {
      headers: { "Content-Type": "application/json" },
    });

    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};
