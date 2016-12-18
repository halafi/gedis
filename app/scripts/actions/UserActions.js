export const loginUser = (user) => {
	return {
		type: "LOGIN",
		user,
	}
}

export const logoutUser = () => {
	return {
		type: "LOGOUT",
	}
}
