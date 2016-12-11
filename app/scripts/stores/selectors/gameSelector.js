import { createSelector } from "reselect"

export const creditsSelector = state => state.game.credits

export const gameSelector = createSelector(
	[creditsSelector],
	(credits) => {
		return {
			credits,
		}
	},
)
