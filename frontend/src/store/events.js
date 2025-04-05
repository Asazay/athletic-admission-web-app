import { csrfFetch } from "./csrf";

const GET_All_EVENTS = "events/GET_ALL_EVENTS";
const GET_EVENT_BY_ID = "events/GET_EVENT_BY_ID";
const CREATE_EVENT = "events/CREATE_EVENT";
const EDIT_EVENT = "events/EDIT_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";

const getAllEvents = (events) => {
  return {
    type: GET_All_EVENTS,
    payload: events,
  };
}

const getEventById = (event) => {
  return {
    type: GET_EVENT_BY_ID,
    payload: event,
  };
};

const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

const editEvent = (event) => {
  return {
    type: EDIT_EVENT,
    payload: event,
  };
};

const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const getAllEventsThunk = (schoolId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${schoolId}`);

  if(response.ok){
    const data = await response.json();
    dispatch(getAllEvents(data));
    return data;
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
}

export const getEventByIdThunk = (eventId, schoolId = null) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${schoolId}/${eventId}`);

  if(response.ok){
    const data = await response.json();
    dispatch(getEventById(data));
    return data;
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
}

export const createEventThunk = (event) => async (dispatch) => {
  const response = await csrfFetch("/api/events", {
    method: "POST",
    body: JSON.stringify(event),
  });

  if(response.ok){
    const data = await response.json();
    dispatch(createEvent(data));
    return data;
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
}

export const editEventThunk = (eventId, event) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });

  if(response.ok){
    const data = await response.json();
    dispatch(editEvent(data));
    return data;
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
}

export const deleteEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if(response.ok){
    dispatch(deleteEvent(eventId));
  }

  else if (response.status < 500){
    const errMsgs = await response.json();
    return errMsgs;
  }
}

const initialState = {
  allEvents: {},
  singleEvent: {},
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_All_EVENTS:
      const allEvents = {};
      action.payload.forEach((event) => {
        allEvents[event.id] = event;
      });
      return {
        ...state,
        allEvents: { ...allEvents },
      };
    case GET_EVENT_BY_ID:
      return {
        ...state,
        singleEvent: { ...action.payload },
      };
    case CREATE_EVENT:
      return {
        ...state,
        allEvents: { ...state.allEvents, [action.payload.id]: action.payload },
      };
    case EDIT_EVENT:
      return {
        ...state,
        allEvents: { ...state.allEvents, [action.payload.id]: action.payload },
      };
    case DELETE_EVENT:
      const newState = { ...state };
      delete newState.allEvents[action.payload];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;