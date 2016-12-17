import Game from "../../models/Game"

export default (game = new Game(), action) => {
	switch (action.type) {
	case "INCREMENT":
		return game.set("credits", game.getCredits() + action.amount)
	case "DECREMENT":
		return game.set("credits", game.getCredits() - action.amount)
	default:
		return game
	}
}
