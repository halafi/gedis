import User from "../../models/User"

export default (user = new User(), action) => {
	switch (action.type) {
	case "LOGIN":
		return user
	case "LOGOUT":
		return user
	default:
		return user
	}
}
