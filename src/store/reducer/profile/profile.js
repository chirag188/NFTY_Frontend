import * as actionLabels from "../../actionLabels";

const initialState = {
  loading: false,
  createdUser: "",
  errorMsg: "",
  userData: "",
  updatedUser: "",
  updatedProfilePic: "",
  authToken: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.CREATE_USER_PROFILE_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionLabels.CREATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        createdUser: action.payload.data,
        authToken: action.payload.data.authToken,
        loading: false,
      };
    }
    case actionLabels.CREATE_USER_PROFILE_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.error,
        loading: false,
      };
    }

    case actionLabels.VIEW_PROFILE_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionLabels.VIEW_PROFILE_SUCCESS: {
      return {
        ...state,
        userData: action.payload.data,
        loading: false,
      };
    }
    case actionLabels.VIEW_PROFILE_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.error,
        loading: false,
      };
    }

    case actionLabels.UPDATE_PROFILE_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionLabels.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        updatedUser: action.payload.data,
        loading: false,
      };
    }
    case actionLabels.UPDATE_PROFILE_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.error,
        loading: false,
      };
    }

    case actionLabels.UPDATE_PROFILE_PIC_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionLabels.UPDATE_PROFILE_PIC_SUCCESS: {
      return {
        ...state,
        updatedProfilePic: action.payload.data,
        loading: false,
      };
    }
    case actionLabels.UPDATE_PROFILE_PIC_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
