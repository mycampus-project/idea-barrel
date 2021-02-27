// A dummy API connected to a json-server for demonstration purposes.

// Exports methods for creating and deleting events,
// bulletins and ideas, and a fetch method for all the dummy users.

// See </src/components/dev/APIDemo.js> if you wanna see example usage,
// and </db.json> for the data structure.

const DummyAPI = () => {
  const rootUrl = "http://localhost:4200";

  const fetchFromUrl = async (url) => {
    const notes = await fetch(rootUrl + "/" + url);
    const json = notes.json();
    return json;
  };

  const delFromUrl = async (id, url) => {
    await fetch(rootUrl + "/" + url + "/" + id, { method: "DELETE" });
  };

  const postDataToUrl = async (data, url) => {
    console.log(JSON.stringify(data));
    await fetch(rootUrl + "/" + url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const fetchUsersAsync = async () => {
    return fetchFromUrl("users");
  };

  const fetchIdeasAsync = async () => {
    return fetchFromUrl("ideas");
  };

  const fetchBulletinsAsync = async () => {
    return fetchFromUrl("bulletins");
  };

  const fetchEventsAsync = async () => {
    return fetchFromUrl("events");
  };

  const postEventAsync = async (uid, data) => {
    return postDataToUrl({ data, user_id: uid }, data, "events");
  };

  const postIdeaAsync = async (uid, data) => {
    return postDataToUrl({ data, user_id: uid }, "ideas");
  };

  const postBulletinsAsync = async (uid, data) => {
    return postDataToUrl({ data, user_id: uid }, "bulletins");
  };

  const deleteEventAsync = async (id) => {
    return delFromUrl(id, "events");
  };

  const deleteIdeaAsync = async (id) => {
    return delFromUrl(id, "ideas");
  };

  const deleteBulletinAsync = async (id) => {
    return delFromUrl(id, "bulletins");
  };

  return {
    fetchUsersAsync,
    fetchIdeasAsync,
    fetchBulletinsAsync,
    fetchEventsAsync,
    postIdeaAsync,
    postEventAsync,
    postBulletinsAsync,
    deleteEventAsync,
    deleteIdeaAsync,
    deleteBulletinAsync,
  };
};

export default DummyAPI;
