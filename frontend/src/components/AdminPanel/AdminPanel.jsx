import "./AdminPanel.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getAllEventsThunk } from "../../store/events";
import { deleteEventThunk } from "../../store/events";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import { getAllEventsSelector } from "../../store/events";
import { shallowEqual } from "react-redux";

function AdminPanel() {
  const { user } = useSelector((state) => state.session);
  const events = useSelector(getAllEventsSelector, shallowEqual);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  let school = user?.school;

  useEffect(() => {
    const paramId = params.adminId;

    if (paramId != user.id) {
      // Redirect to the homepage if the user is not an admin
      navigate(`/forbidden`);
    }

    if (user && user.id && user.school && user.school.id) {
      const fetchEvents = async () => {
        const schoolId = user.school.id;
        const response = await dispatch(getAllEventsThunk(schoolId));

        if (response) {
        //   setEvents(response);
        }
      };
      fetchEvents();
    }
  }, []);

  const handleEventClick = (e, eventId) => {
    e.preventDefault();
    // Navigate to the event details page
    navigate(
      `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}/events/${eventId}`
    );
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    // Navigate to the create event page
    navigate(`/admin/${user.id}/create-event`);
  };

  const handleEditEvent = (e, eventId) => {
    e.preventDefault();
    // Navigate to the edit event page
    navigate(
      `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}/events/${eventId}/edit`
    );
  };

  const handleCancelEvent = (e, eventId) => {
    e.preventDefault();

    dispatch(deleteEventThunk(eventId))
      .then(() => {
        // Optionally, you can show a success message or update the UI
        console.log("Event cancelled successfully");
        closeModal();
      })
      .catch((error) => {
        // Handle error
        console.error("Error cancelling event:", error);
      });

    alert("Event cancelled successfully");
  };

  return (
    <div id="admin-panel">
      <div id="title-div">
        <h1>Admin Panel</h1>
      </div>
      <div id="create-event-div">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCreateEvent(e);
          }}
        >
          Create Event
        </button>
      </div>
      <div id="shp-events-div">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="shp-event-card">
              <href
                style={{ border: "none", backgroundColor: "transparent" }}
                onClick={(e) => handleEventClick(e, event.id)}
              >
                <div>
                  <div id="shp-event-card-img">
                    {" "}
                    <img src={event.imageUrl} alt={event.name} />
                  </div>
                  <h4 style={{ textAlign: "center" }}>{event.name}</h4>
                </div>
              </href>
              <div id="btn-div">
                <button onClick={(e) => handleEditEvent(e, event.id)}>
                  Edit
                </button>
                <OpenModalButton
                  buttonText="Cancel"
                  modalComponent={
                    <div className="modal">
                      <div id="title-div">
                        <h2>Are you sure you want to cancel this event?</h2>
                      </div>
                      <div id="btn-div">
                        <button onClick={(e) => closeModal()}>Back</button>
                        <button onClick={(e) => handleCancelEvent(e, event.id)}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div>No events available</div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
