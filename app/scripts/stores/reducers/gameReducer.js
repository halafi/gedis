import Game from '../../containers/Game'

export default (game = new Game(), action) => {
    switch (action.type) {
        case 'INCREMENT':
            return game.set("credits", game.getCredits() + 1)
        case 'DECREMENT':
            return game.set("credits", game.getCredits() - 1)
        default:
            return game
    }
}