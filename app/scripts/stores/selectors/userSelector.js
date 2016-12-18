import { createSelector } from "reselect"

export const uidSelector = state => state.user.uid
export const displayNameSelector = state => state.user.displayName
export const emailSelector = state => state.user.email

export const userSelector = createSelector(
	[uidSelector, displayNameSelector, emailSelector],
	(uid, displayName, email) => {
		return {
			uid,
			displayName,
			email,
		}
	},
)
