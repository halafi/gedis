import { Record } from "immutable"

const UserRecord = new Record({
	uid: null,
	displayName: null,
	email: null,
	photoURL: null,
})

export default class User extends UserRecord {
	isLoggedIn() {
		return this.uid !== null
	}
}
