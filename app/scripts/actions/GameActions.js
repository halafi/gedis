export const incrementCredits = (amount = 1) => {
    return {
        type: "INCREMENT",
        amount,
    }
}

export const decrementCredits = (amount = 1) => {
    return {
        type: "DECREMENT",
        amount,
    }
}
