import { useRouter } from 'vue-router';
import user from './user';

const router = useRouter();

let testMode = false;

/**
 * Calls the backend
 * 
 * @param {String} endpoint the endpoint of the api
 * @param {RequestInfo} request the request body
 * @returns {Promise<Object>} the JSON body of the request
 */
function callBackend(endpoint, request, auth=true, redirect=true) {
	if (auth) {
		// Look for token
		let token = window.sessionStorage.getItem("token");
		
		request = {
			...request,
			headers: {
				...request.headers,
				"Authorization": "Token " + token
			}
		}
	}

	return fetch(`${import.meta.env.VITE_BACKEND}/${endpoint}`, request).then((resp) => {
		return resp.json().then(json_resp => {
			// Failure Check
			if (json_resp.success == "fail" && redirect) {
				// Look for cookie
				let token = window.sessionStorage.getItem("token");

				// If token exists, test, or fail (redirect)
				if (token == null) {
    				router.push('/login');
				}
			}

			// Return JSON object
			return json_resp;
		});
	});
}

/**
 * Gets the media associated with a path
 * 
 * @param {String} path 
 * @returns {Promise<String>} the media of the request in Data URL form
 */
function getMedia(path) {
	// Look for token
	let token = window.sessionStorage.getItem("token");
	let request = {
		method: "GET",
		headers: {
			"Authorization": "Token " + token
		}
	}

	return fetch(`${import.meta.env.VITE_BACKEND}/cdn/media/${path}`, request).then((resp) => {
		return resp.blob().then((blob) => {
			return URL.createObjectURL(blob);
		})
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
			username: username,
			password: password
		})
	}, false, false);
}

/**
 * Gets user data
 * @returns {Promise<Object>} the JSON body with the user's data if successful
 */
function getUserProfile() {
	return callBackend("user/data/", {
		method: "GET"
	});
}

export default {
	loginUser,
	getUserProfile,
  	getMedia,
  	...user
};
