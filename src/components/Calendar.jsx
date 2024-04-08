import "./Calendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import PageMotion from "./PageMotion";
import { Form } from "react-router-dom";
import { nanoid } from "nanoid";
import { deleteEvent, fetchEvents, updateEvent } from "../app/api/firebase";
import { UseAuth } from "../app/auth/auth";
import PropTypes from "prop-types";

const PetCalendar = ({ data }) => {
  const { user } = UseAuth();
  const userData = data;
  const petsData = userData.pets;
  const eventsData = userData.events;

  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  const [events, setEvents] = useState(eventsData || []);
  const [newEventForm, setNewEventForm] = useState(false);
  const [editEventForm, setEditEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    date: selectedDate,
    startTime: "",
    endTime: "",
    animals: [],
    location: "",
    alert: "",
    notes: "",
  });
  const [editEvent, setEditEvent] = useState();

  const fetchAndUpdateEvents = async () => {
    try {
      const updatedEvents = await fetchEvents(user.id);
      const eventsWithDateObjects = updatedEvents.events.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(eventsWithDateObjects);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const selDate = selectedDate;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date: selDate,
    }));
  }, [selectedDate]);

  const Date_Click_Fun = (date) => {
    setSelectedDate(date.toDateString());
  };

  const Event_Data_Update = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const Event_Data_Edit_Update = (event) => {
    const { name, value } = event.target;
    setEditEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const Create_Event_Fun = async () => {
    if (selectedDate && newEvent.title) {
      const newEventObject = {
        ...newEvent,
        id: nanoid(),
        date: selectedDate,
      };
      const updatedEvents = [...events, newEventObject];
      await updateEvent(user.id, updatedEvents);
      fetchAndUpdateEvents();
      setNewEventForm(false);
      setNewEvent({
        id: "",
        title: "",
        date: selectedDate,
        startTime: "",
        endTime: "",
        animals: [],
        location: "",
        alert: "",
        notes: "",
      });
    }
  };

  const Update_Event_Fun = () => {
    if (!editEvent || !editEvent.id) return;

    const updated_Events = events.map((event) => {
      if (event.id === editEvent.id) {
        return {
          ...editEvent,
          date: new Date(editEvent.date),
        };
      }
      return event;
    });

    setEvents(updated_Events);
    setEditEventForm(false);
    setEditEvent(null);
  };

  const Delete_Event_Fun = async (eventId) => {
    try {
      await deleteEvent(user.id, eventId);
      fetchAndUpdateEvents();
    } catch (err) {
      throw new Error(err);
    }
  };

  const animalList = petsData.map((pet) => ({
    id: pet.id,
    name: pet.data.name,
    selected: false,
    photo: pet.data.imageURL,
  }));

  const handleEditEvent = (event) => {
    setEditEventForm(true);
    setEditEvent(event);
    console.log(editEvent);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="calendar-container">
          <Calendar
            value={selectedDate}
            onClickDay={Date_Click_Fun}
            tileClassName={({ date }) =>
              events.some((event) => {
                const eventDate = new Date(event.date);
                return eventDate === date;
              })
                ? "event-marked"
                : ""
            }
          />{" "}
        </div>

        {selectedDate && (
          <PageMotion>
            <div className="event-container">
              <button
                className="event--btn"
                onClick={() => setNewEventForm(true)}
              >
                Create New Event
              </button>
              {newEventForm && (
                <Form className="event-form">
                  <h2>{newEvent.title ? newEvent.title : "New Event"}</h2>
                  <p>Selected Date: {selectedDate}</p>
                  <input
                    type="text"
                    placeholder="Event Name"
                    name="title"
                    value={newEvent.title}
                    onChange={Event_Data_Update}
                  />
                  <input
                    type="time"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={Event_Data_Update}
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={newEvent.endTime}
                    onChange={Event_Data_Update}
                  />
                  <select
                    name="animals"
                    multiple
                    value={newEvent.animals}
                    onChange={Event_Data_Update}
                  >
                    {animalList.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={newEvent.location}
                    onChange={Event_Data_Update}
                  />
                  <select
                    name="alert"
                    value={newEvent.alert}
                    onChange={Event_Data_Update}
                  >
                    <option value="1hour">1 Hour Before</option>
                    <option value="2hours">2 Hours Before</option>
                    <option value="1day">1 Day Before</option>
                    <option value="1week">1 Week Before</option>
                  </select>
                  <textarea
                    placeholder="Notes"
                    name="notes"
                    value={newEvent.notes}
                    onChange={Event_Data_Update}
                  ></textarea>
                  <button
                    className="event--btn create-btn"
                    onClick={Create_Event_Fun}
                  >
                    Add Event
                  </button>
                </Form>
              )}
              {selectedDate && events.length > 0 && (
                <div className="event-list">
                  <h2> Events: </h2>{" "}
                  <div className="event-cards">
                    {editEventForm ? (
                      <Form className="event-form">
                        <h2>{editEvent.title}</h2>
                        <p>Selected Date: {selectedDate}</p>
                        <input
                          type="text"
                          placeholder="Event Name"
                          name="title"
                          value={editEvent.title}
                          onChange={Event_Data_Edit_Update}
                        />
                        <input
                          type="time"
                          name="startTime"
                          value={editEvent.startTime}
                          onChange={Event_Data_Edit_Update}
                        />
                        <input
                          type="time"
                          name="endTime"
                          value={editEvent.endTime}
                          onChange={Event_Data_Edit_Update}
                        />
                        <select
                          name="animals"
                          multiple
                          value={editEvent.animals}
                          onChange={Event_Data_Edit_Update}
                        >
                          {animalList.map((animal) => (
                            <option key={animal.id} value={animal.id}>
                              {animal.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Location"
                          name="location"
                          value={editEvent.location}
                          onChange={Event_Data_Edit_Update}
                        />
                        <select
                          name="alert"
                          value={editEvent.alert}
                          onChange={Event_Data_Edit_Update}
                        >
                          <option value="1hour">1 Hour Before</option>
                          <option value="2hours">2 Hours Before</option>
                          <option value="1day">1 Day Before</option>
                          <option value="1week">1 Week Before</option>
                        </select>
                        <textarea
                          placeholder="Notes"
                          name="notes"
                          value={editEvent.notes}
                          onChange={Event_Data_Edit_Update}
                        ></textarea>
                        <div className="event--edit-btns">
                          <button
                            className="event--btn cancel-btn"
                            onClick={() => setEditEventForm(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="event--btn save-btn"
                            onClick={Update_Event_Fun}
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    ) : (
                      <>
                        {" "}
                        {events.map((event) => {
                          const eventDate = new Date(event.date);
                          const selDate = new Date(selectedDate);
                          const involvedAnimals = animalList.filter((animal) =>
                            event.animals.includes(animal.id)
                          );
                          return eventDate.toDateString() ===
                            selDate.toDateString() ? (
                            <div key={event.id} className="event-card">
                              <div className="event-card-header">
                                <h4 className="event-title"> {event.title} </h4>{" "}
                                <span className="event-date">
                                  {" "}
                                  {eventDate.toDateString()}{" "}
                                </span>{" "}
                                {event.startTime && (
                                  <>
                                    <span>from {event.startTime}</span>{" "}
                                    {event.endTime && (
                                      <>
                                        <span>until {event.endTime}</span>{" "}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>{" "}
                              <div className="event-card-body">
                                {event.location && (
                                  <>
                                    <p>Location: {event.location}</p>{" "}
                                  </>
                                )}
                                <p>Involved pets:</p>{" "}
                                <div className="involved-pets">
                                  {involvedAnimals.map((animal) => (
                                    <div
                                      key={animal.id}
                                      className="involved-pets--pet"
                                    >
                                      <div>
                                        <img
                                          src={animal.photo}
                                          alt={animal.name}
                                        />
                                        <pre>{animal.name}</pre>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {event.notes && <pre>{event.notes}</pre>}
                              </div>{" "}
                              <div className="event-actions">
                                <button
                                  className="event--btn update-btn"
                                  onClick={() => handleEditEvent(event)}
                                >
                                  Update Event{" "}
                                </button>{" "}
                                <button
                                  className="event--btn delete-btn"
                                  onClick={() => Delete_Event_Fun(event.id)}
                                >
                                  Delete Event{" "}
                                </button>{" "}
                              </div>{" "}
                            </div>
                          ) : null;
                        })}{" "}
                      </>
                    )}
                  </div>{" "}
                </div>
              )}{" "}
            </div>
          </PageMotion>
        )}
      </div>{" "}
    </div>
  );
};

PetCalendar.propTypes = {
  data: PropTypes.object,
};

export default PetCalendar;
