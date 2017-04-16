
// helper useful for handling fetch() promises as JSON
export const responseAsJson = (res) =>
  res.json().then((body) => ({
    body: body,
    ok: res.ok,
    status: res.status
  }))
;

// transforms an Error exception from a fetch() pipeline into an error message string
export const handleFetchError = (func) =>
  (error) => {
    if (error.name == 'TypeError') {
      func('A network error occurred.');
    } else {
      func(error.message);
    }
  }
;

export const apiFetch = (url, options) => 
  fetch(url, Object.assign({}, options, { credentials: 'include' }))
  .then(responseAsJson)
  .then(({body, ok, status}) => {
    if (ok) {
      return body;
    } else if (status == 401) {
      // not logged in yet, so redirect to login
      window.location.replace('/core/login');
    } else {
      throw new Error('Internal error: unexpected status return.');
    }
  })
  .catch(err => handleFetchError(err => {
    throw err;
  }))
;