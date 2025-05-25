/**
 * Calls the backend
 * 
 * @param {String} endpoint the endpoint of the api
 * @param {RequestInfo} request the request body
 * @returns {Promise<Object>} the JSON body of the request
 */
function callBackend(endpoint, request) {
	return fetch(`${import.meta.env.VITE_BACKEND}/${endpoint}`, request).then((resp) => {
		return resp.json();
	});
}

/**
 * Logins in the user
 * @param {String} username username
 * @param {String} password password
 * @returns {Promise<Object>} the JSON body with the user's token if successful
 */
function loginUser(username, password) {
	return callBackend("user/login/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username.value,
			password: password.value
		})
	});
}

export default {
	loginUser,
};