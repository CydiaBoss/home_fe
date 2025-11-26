import user from './user';

let testMode = false;

/**
 * Calls the backend
 * 
 * @param {String} endpoint the endpoint of the api
 * @param {RequestInfo} request the request body
 * @returns {Promise<Object>} the JSON body of the request
 */
function callBackend(endpoint, request, redirect=true) {
	if (testMode) {
		return new Promise((resolve) => {
			switch(endpoint) {
				case "user/login/":
					resolve({
						success: "ok",
						token: "test-token"
					});
					break;
				default:
					resolve(user.getUserProfile());
					break;
			}
		});
	}

	return fetch(`${import.meta.env.VITE_BACKEND}/${endpoint}`, request).then((resp) => {
		return resp.json().then(json_resp => {
			// Failure Check
			if (json_resp.success == "fail" && redirect) {
				// Look for cookie
				let token = "";
				for(let cookie of document.cookie.split("; ")) {
					// Check for token
					let cookie_parts = cookie.split("=");
					if (cookie_parts[0] == "token") {
						token = cookie_parts[1];
						break;
					}
				}

				// Check 
			}
		});
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

function setTestMode(enabled) {
	testMode = enabled;
}

async function getMedia(page = 1, limit = 10) {
  const profile = await user.getUserProfile();
  const allMedia = [...profile.photos, ...profile.videos];
  // Eventually will be random infinte media
//   const start = (page - 1) * limit;
//   const end = page * limit;
  return { media: allMedia/*.slice(start, end)*/ };
}

export default {
	loginUser,
	setTestMode,
  getMedia,
  ...user
};
