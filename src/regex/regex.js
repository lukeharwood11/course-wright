export const passwordRegex = /^[a-zA-Z0-9!@#*$%^&.,';()/\\-]{8,}$/

export const parseCourseCode = (name, code) => {
    const r = /([A-Z]+)-/
    const regexRes = r.exec(code)
    const firstTwo = name.split(" ").slice(0, 2)
    const backup = firstTwo.length === 1 ? firstTwo[0][0] : firstTwo[0][0] + firstTwo[1][0]
    return regexRes ? regexRes[1] : backup
}