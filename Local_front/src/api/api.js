const API_URL = "http://localhost:9000";

// Effectue une requête HTTP GET vers l'API
const getRequest = async (url, token) => {
  const config = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  if (token) config.headers.Authorization = token;

  const response = await request(url, config);

  return response;
};

// Effectue une requête HTTP POST vers l'API
// "LocalLinkImmo", "vhueryijiijiàâhfoqskfhugè_ezhfuicfhnuipqs") 
const postRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};


// Effectue une requête HTTP DELETE vers l'API
const deleteRequest = async (url, token) => {
  const config = {
    method: "DELETE",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

// Effectue une requête HTTP PUT vers l'API
const putRequest = async (url, body = {}, token) => {
  const config = {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers: body instanceof FormData ? {} : { "Content-type": "application/json; charset=UTF-8" },
  };
  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

// Fonction interne pour effectuer la requête HTTP
const request = async (url, config) => {
  let result = null;
  let error = null;
  let status = -1;

  try {
    const response = await fetch(`${API_URL}${url}`, config);
    status = response.status;
    result = await response.json();
    if (status >= 400) throw new Error(`Erreur ${status}: la requête à échouée`);
  } catch (err) {
    error = err.message;
  } finally {
    return { result, error, status };
  }
};

export { getRequest, postRequest, deleteRequest, putRequest };