export const permissions = {
    courseEdit: [10, 11],
    courseView: [30],
    teacher: [20, 21, 22],
    sectionModification: [20, 21]
}

export const verifyRole = (role, list) => {
    if (role === undefined) {
        return false
    }
    return list.indexOf(role) !== -1
}