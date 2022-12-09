import {v4 as uuid} from "uuid";

export const account = (user) => {
    return {
        name: "My Course",
        code: "MY-1010",
        studentCount: 0,
        id: "new",
        role: 10,
        active: false,
        subject: "",
        dateCreated: "",
        lastModified: "",
        license: "",
        visibility: "private",
        published: false,
        tags: [],
        type: "c",
        accounts: [{
            ...user,
            role: 10,
            status: "confirmed"
        }]
    }
}
