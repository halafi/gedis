import User from "../../models/User"

export default (user = new User(), action) => {
	switch (action.type) {
	case "LOGIN":
		return user
			.set("uid", action.user.uid)
			.set("displayName", action.user.displayName)
			.set("email", action.user.email)
	case "LOGOUT":
		return new User()
	default:
		return user
	}
}
