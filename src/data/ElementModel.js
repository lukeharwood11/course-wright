import { v4 as uuid } from 'uuid'

export default class ElementModel {

    constructor(type, editMode=true, text="") {
        this.type = type
        this.id = uuid()
        this.editMode = editMode
        this.text = text
    }

    static new = (type) => {
        switch (type) {
            case "text":
                return TextElementModel.new()
            case "code":
                return CodeElementModel.new()
            case "video":
                return VideoElementModel.new()
        }
    }
}

export class CodeElementModel extends ElementModel {
    constructor(editMode) {
        super("code", editMode);
    }

    static new = () => {
        return new CodeElementModel()
    }
}

export class TextElementModel extends ElementModel {
    constructor(editMode) {
        super("text", editMode);
        this.textType = "normal"
    }

    static new = () => {
        return new TextElementModel()
    }
}

export class VideoElementModel extends ElementModel {
    constructor(editMode, src="", text="", title="") {
        super("video", editMode, text);
        this.src = src
        this.title = title
    }

    static new = () => {
        return new VideoElementModel()
    }
}
