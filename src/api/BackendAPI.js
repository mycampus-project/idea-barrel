const BackendAPI = () => {
  const dev_token =
    "eb245d43fefbc85ad21a136e56a944100c8f8f35ee74e0fce599a048059a6fec";
  const rootUrl = "http://ibapi.mkayyeedev.ninja";

  const fetchFromUrl = async (url) => {
    const notes = await fetch(rootUrl + "/" + url, {
      method: "GET",
      headers: { dev_token },
    });
    console.log(notes);
    const json = notes.json();
    return json;
  };

  const delFromUrl = async (id, category, url) => {
    const res = await fetch(rootUrl + "/" + url + "/" + id + "/" + category, {
      method: "DELETE",
      headers: { dev_token },
    });
    return res;
  };

  const postDataToUrl = async (data, url) => {
    console.log(JSON.stringify(data));
    const res = await fetch(rootUrl + "/" + url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        dev_token,
      },
      body: JSON.stringify(data),
    });
    return res;
  };

  const putRequestUrl = async (data, url) => {
    const { id } = data || null;
    if (id) {
      const res = await fetch(rootUrl + "/" + url + "/" + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          dev_token,
        },
        body: JSON.stringify(data),
      });
      return res;
    } else {
      return "Post id missing";
    }
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

  const postEventAsync = async (data) => {
    return postDataToUrl(data, "events");
  };

  const postIdeaAsync = async (data) => {
    return postDataToUrl(data, "ideas");
  };

  const postBulletinsAsync = async (data) => {
    return postDataToUrl(data, "bulletins");
  };

  const deleteEventAsync = async (id, category) => {
    return delFromUrl(id, category, "events");
  };

  const deleteIdeaAsync = async (id, category) => {
    return delFromUrl(id, category, "ideas");
  };

  const deleteBulletinAsync = async (id, category) => {
    return delFromUrl(id, category, "bulletins");
  };

  const updateEventAsync = async (data) => {
    return putRequestUrl(data, "events");
  };

  const updateIdeaAsync = async (data) => {
    return putRequestUrl(data, "ideas");
  };

  const updateBulletinAsync = async (data) => {
    return putRequestUrl(data, "bulletins");
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
    updateEventAsync,
    updateIdeaAsync,
    updateBulletinAsync
  };
};

export default BackendAPI;
