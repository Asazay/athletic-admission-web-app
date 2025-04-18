import { csrfFetch } from "./csrf";

const GET__ALL_SCHOOLS = "schools/GET_ALL_SCHOOLS";
const GET_SCHOOL_BY_SEARCH = "schools/GET_SCHOOL_BY_SEARCH";
const GET_SCHOOL_BY_ID = "schools/GET_SCHOOL_BY_ID";
const CREATE_SCHOOL = "schools/CREATE_SCHOOL";
const EDIT_SCHOOL = "schools/EDIT_SCHOOL";
const DELETE_SCHOOL = "schools/DELETE_SCHOOL";

const getAllSchools = (schools) => {
  return {
    type: GET__ALL_SCHOOLS,
    payload: schools,
  };
}

const getSchoolBySearch = (school) => {
  return {
    type: GET_SCHOOL_BY_SEARCH,
    payload: school,
  };
};

const getSchoolById = (school) => {
  return {
    type: GET_SCHOOL_BY_ID,
    payload: school,
  };
};

const createSchool = (school) => {
  return {
    type: CREATE_SCHOOL,
    payload: school,
  };
};
const editSchool = (school) => {
  return {
    type: EDIT_SCHOOL,
    payload: school,
  };
};
const deleteSchool = (schoolId) => {
  return {
    type: DELETE_SCHOOL,
    payload: schoolId,
  };
};

export const getAllSchoolsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/schools");
  
  if(response.ok){
    const data = await response.json();
    dispatch(getAllSchools(data));
    return data;
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
};

export const getSchoolBySearchThunk = (searchParams) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/schools/search?${new URLSearchParams(searchParams)}`
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getSchoolBySearch(data));
    return data;
  }
  else if (response.status < 500) {
    const errMsgs = await response.json();
    return errMsgs;
  }
};

export const getSchoolByIdThunk = (schoolId) => async (dispatch) => {
  const response = await csrfFetch(`/api/schools/${schoolId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSchoolById(data));
    return data;
  } else if (response.status < 500) {
    const errMsgs = await response.json();
    return errMsgs;
  }
};

export const createSchoolThunk = (school) => async (dispatch) => {
  const response = await csrfFetch("/api/schools", {
    method: "POST",
    body: JSON.stringify(school),
  });
  const data = await response.json();
  dispatch(createSchool(data));
  return data;
};

export const editSchoolThunk = (school) => async (dispatch) => {
  const url = school.adminId || school.principalId ? `/api/schools/${school.id}/staff-update`: `/api/schools/${school.id}`;
  const response = await csrfFetch(url, {
    method: "PUT",
    body: JSON.stringify(school),
  });
  const data = await response.json();
  dispatch(editSchool(data));
  return data
}

export const deleteSchoolThunk = (schoolId) => async (dispatch) => {
  const response = await csrfFetch(`/api/schools/${schoolId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (response.ok) {
    dispatch(deleteSchool(schoolId));
  }

  return data

};

const initialState = {
  allSchools: {},
  singleSchool: {},
};

const schoolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET__ALL_SCHOOLS:
    //   const allSchools = {};
    //   action.payload.forEach((school) => {
    //     allSchools[school.id] = school;
    //   });
      return { ...state, allSchools: action.payload };

    case GET_SCHOOL_BY_SEARCH:
    //   const allSchools = {};
    //   action.payload.schools.forEach((school) => {
    //     allSchools[school.id] = school;
    //   });
      return { ...state, allSchools: action.payload };

    case GET_SCHOOL_BY_ID:
      return { ...state, singleSchool: {...action.payload} };

    case CREATE_SCHOOL:
      return { ...state, singleSchool: { ...action.payload} };

    case EDIT_SCHOOL:
      return { ...state, allSchools: { ...state.allSchools, [action.payload.id]: action.payload } };

    case DELETE_SCHOOL:
      const newState = { ...state };
      delete newState.allSchools[action.payload];
      return newState;

    default:
      return state;
  }
};

export default schoolsReducer;