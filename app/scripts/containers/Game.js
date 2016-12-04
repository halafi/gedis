import {Record} from 'immutable'

const GameRecord = new Record({
    credits: 0,
})

export default class Game extends GameRecord {
    getCredits() {
        return this.credits
    }
}
