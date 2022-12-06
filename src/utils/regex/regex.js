export const passwordRegex = /^[a-zA-Z0-9!@#*$%^&.,';()/\\-]{8,}$/

export const parseCourseCode = (name, code) => {
    const r = /([A-Z]+)-/
    const regexRes = r.exec(code)
    const firstTwo = name.split(" ").slice(0, 2)
    const backup = firstTwo.length === 1 ? firstTwo[0][0] : firstTwo[0][0] + firstTwo[1][0]
    return regexRes ? regexRes[1] : backup
}

export const parseDateTime = (time) => {
    const r = /([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2}).*/
    const result = r.exec(time)
    return {
        year: result[1],
        month: result[2],
        day: result[3],
        time: result[4],
        date: `${result[2]}/${result[3]}/${result[1]}`
    }
}