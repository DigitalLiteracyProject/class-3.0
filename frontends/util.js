
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