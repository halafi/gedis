import { createSelector } from "reselect"

export const uidSelector = state => state.user.uid
export const displayNameSelector = state => state.user.displayName
export const emailSelector = state => state.user.email
export const photoURLSelector = state => state.user.photoURL

export const userSelector = createSelector(
	[uidSelector, displayNameSelector, emailSelector, photoURLSelector],
	(uid, displayName, email, photoURL) => {
		return {
			uid,
			displayName,
			email,
			photoURL,
		}
	},
)
