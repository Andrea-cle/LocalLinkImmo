const API_URL = "http://localhost:9000";

const getRequest = async (url, token = null) => {
  const config = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  const response = await request(url, config);

  return response;
};

// postRequest("todos", {title: "First todo"})
const postRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

// request("todos", {method: "POST"})
const request = async (url, config) => {
  let status = -1;
  let error = null;
  let result = null;

  try {
    const response = await fetch(`${API_URL}${url}`, config);
    status = response.status;
    result = await response.json();
    if (status >= 400) throw new Error(`Erreur ${status}: ${result?.message}`);
  } catch (e) {
    error = e.message;
  } finally {
    return { status, error, result };
  }
};

export { getRequest, postRequest };