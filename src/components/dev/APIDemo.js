import React, { useState, useEffect } from "react";

import BackendAPI from "../../api/BackendAPI";

const dataStyle = {
  border: "1px solid black",
  width: "400px",
  padding: "4px",
  marginTop: "4px",
};

const {
  fetchUsersAsync,
  fetchBulletinsAsync,
  fetchIdeasAsync,
  fetchEventsAsync,
  postEventAsync,
  //postIdeaAsync,
  deleteEventAsync,
  //deleteIdeaAsync,
  //deleteBulletinAsync,
  //postBulletinsAsync,
} = BackendAPI();

const APIDemo = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [bulletins, setBulletins] = useState([]);
  const [ideas, setIdeas] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsersAsync();
        setUsers(response);
        console.log(response);
        setRandomUser(response);
      } catch (e) {
        console.log("error fetching users");
        console.log(e);
      }
    };
    const getBulletins = async () => {
      try {
        const response = await fetchBulletinsAsync();
        console.log(response);
        setBulletins(response);
      } catch (e) {
        console.log("error fetching bulletins");
        console.log(e);
      }
    };
    const getIdeas = async () => {
      try {
        const response = await fetchIdeasAsync();
        console.log(response);
        setIdeas(response);
      } catch (e) {
        console.log("error fetching ideas");
        console.log(e);
      }
    };
    const getEvents = async () => {
      try {
        const response = await fetchEventsAsync();
        console.log(response);
        setEvents(response);
      } catch (e) {
        console.log("error fetching events");
        console.log(e);
      }
    };
    getUsers();
    getBulletins();
    getIdeas();
    getEvents();
  }, []);

  // All posts need a title, body, category and sender id.
  // These fields should be given to postWhaverAsync in the form of a single object.
  
  // If any field is missing, you'll get an error response from the server with your input, 
  // so you can use that for troubleshooting.

  // An id will be provided automatically, so no need to worry about it, same with date.
  // On top of title, body, category and senderId, you can add any field you like into the object argument.
  const postEvent = async () => {
    try {
      const title = "hello world";
      const body = "just testing if new event end point works...";
      const category = "general";
      const senderId = user.id;
      const request = await postEventAsync({ senderId, title, body, category });
      console.log(request);
    } catch (e) {
      console.log(e);
    }
  };

  // Cosmos DB uses partitions on top of id's, so when you wanna delete a post,
  // you also have to provide that partition value. For every post, the partition is its category.

  // tldr; deleteSomethingAsync needs the post's id + category for it to work.
  const deleteEvent = async () => {
    try {
      const category = "general";
      const id = "817d2831-71e1-40a1-a8eb-c34e9c38b32b";
      const del = await deleteEventAsync(id, category);
      console.log(del);
    } catch (e) {
      console.log(e);
    }
  };

  // Set the "current user" to a random user from the
  // list of all the users fetched from the back end
  const setRandomUser = (data) => {
    const randomUser =
      data.length > 0
        ? data[Math.floor(Math.random() * Math.floor(data.length))]
        : null;
    setUser(randomUser);
  };

  // The list item in users list on the "home" page
  const userItem = (user) => {
    return (
      <div key={user.id} style={dataStyle}>
        <h4>
          fName and lName: {user.fName} {user.lName}
        </h4>
        <p>id: {user.id}</p>
        <p>email: {user.email}</p>
        <p>isAdmin: {user.isAdmin.toString()}</p>
      </div>
    );
  };

  // Handling post data from the back end. Most of these example posts don't have date in them,
  // but every post will have a date automatically created for them in the future.
  const postItem = (post) => {
    return (
      <div key={post.id} style={dataStyle}>
        <h4>title: {post.title}</h4>
        <p>body: {post.body}</p>
        <p>category: {post.category}</p>
        <p>id: {post.id}</p>
        <p>SenderId: {post.senderId}</p>
      </div>
    );
  };

  return (
    <div>
      <div style={dataStyle}>
        <h4>
          Below is a backend API demo usage [Component from:
          src/components/dev/APIDemo]
        </h4>
      </div>
      <h4>
        Current user (random): {user?.fName} {user?.lName}
      </h4>
      {users && users.length > 0 ? (
        <h4>Users from the back end</h4>
      ) : (
        <h4>No users found</h4>
      )}
      {users?.map((user) => {
        return userItem(user);
      })}
      {ideas && ideas.length > 0 ? (
        <h4>Ideas from the back end</h4>
      ) : (
        <h4>No ideas found</h4>
      )}
      {ideas?.map((idea) => {
        return postItem(idea);
      })}
      {bulletins && bulletins.length > 0 ? (
        <h4>Bulletins from the back end</h4>
      ) : (
        <h4>No bulletins found</h4>
      )}
      {bulletins?.map((bulletin) => {
        return postItem(bulletin);
      })}
      {events && events.length > 0 ? (
        <h4>Events from the back end</h4>
      ) : (
        <h4>No events found</h4>
      )}
      {events?.map((event) => {
        return postItem(event);
      })}
      <button onClick={() => postEvent()}>Post event</button>
      <button onClick={() => deleteEvent()}>Delete event</button>
    </div>
  );
};

export default APIDemo;
