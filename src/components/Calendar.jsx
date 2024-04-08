import "./Calendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import PageMotion from "./PageMotion";
import { Form } from "react-router-dom";

const PetCalendar = ({ petsData }) => {
  const data = petsData;
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEventForm, setNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    animals: [],
    location: "",
    alert: "",
    notes: "",
  });

  console.log(newEvent);

  useEffect(() => {
    const selDate = selectedDate?.toDateString();
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date: selDate,
    }));
  }, [selectedDate]);

  const Date_Click_Fun = (date) => {
    setSelectedDate(date);
  };

  const Event_Data_Update = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const Create_Event_Fun = () => {
    if (selectedDate && newEvent.title) {
      const newEventObject = {
        ...newEvent,
        id: new Date().getTime(),
        date: new Date(selectedDate),
      };
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        id: new Date().getTime(),
      }));
      setEvents([...events, newEventObject]);
      setSelectedDate(null);
      setSelectedDate(new Date(newEvent.date));
      setNewEventForm(false);
      setNewEvent({
        id: "",
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        animals: [],
        location: "",
        alert: "",
        notes: "",
      });
    }
  };

  const Update_Event_Fun = (eventId, newName) => {
    const updated_Events = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          title: newName,
        };
      }
      return event;
    });
    setEvents(updated_Events);
  };

  const Delete_Event_Fun = (eventId) => {
    const updated_Events = events.filter((event) => event.id !== eventId);
    setEvents(updated_Events);
  };

  const animalList = data.map((pet) => ({
    id: pet.id,
    name: pet.data.name,
    selected: false,
  }));

  return (
    <div className="app">
      <div className="container">
        <div className="calendar-container">
          <Calendar
            value={selectedDate}
            onClickDay={Date_Click_Fun}
            tileClassName={({ date }) =>
              selectedDate &&
              date.toDateString() === selectedDate.toDateString()
                ? "selected"
                : events.some(
                    (event) => event.date.toDateString() === date.toDateString()
                  )
                ? "event-marked"
                : ""
            }
          />{" "}
        </div>

        {selectedDate && (
          <PageMotion>
            <div className="event-container">
              <button onClick={() => setNewEventForm(true)}>
                Create New Event
              </button>
              {newEventForm && (
                <Form className="event-form">
                  <h2>{newEvent.title ? newEvent.title : "New Event"}</h2>
                  <p>Selected Date: {selectedDate.toDateString()}</p>
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
                  <button className="create-btn" onClick={Create_Event_Fun}>
                    Add Event
                  </button>
                </Form>
              )}
              {selectedDate && events.length > 0 && (
                <div className="event-list">
                  <h2> My Created Event List </h2>{" "}
                  <div className="event-cards">
                    {" "}
                    {events.map((event) => {
                      const eventDate = new Date(event.date);
                      const selDate = new Date(selectedDate);
                      return eventDate.toDateString() ===
                        selDate.toDateString() ? (
                        <div key={event.id} className="event-card">
                          <div className="event-card-header">
                            <span className="event-date">
                              {" "}
                              {event.date.toDateString()}{" "}
                            </span>{" "}
                            <div className="event-actions">
                              <button
                                className="update-btn"
                                onClick={() =>
                                  Update_Event_Fun(
                                    event.id,
                                    prompt("ENTER NEW TITLE")
                                  )
                                }
                              >
                                Update Event{" "}
                              </button>{" "}
                              <button
                                className="delete-btn"
                                onClick={() => Delete_Event_Fun(event.id)}
                              >
                                Delete Event{" "}
                              </button>{" "}
                            </div>{" "}
                          </div>{" "}
                          <div className="event-card-body">
                            <p className="event-title"> {event.title} </p>{" "}
                          </div>{" "}
                        </div>
                      ) : null;
                    })}{" "}
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

export default PetCalendar;
