export const isSection = (course) => {
    return course.type === 'pc'
}

export const isCourse = (course) => {
    return course.type === 'c'
}

export const getId = (course) => {
    return isSection(course) ? course.pcId : course.id
}