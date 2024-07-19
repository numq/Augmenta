import Image from "../image/Image";

class InputImage implements Image {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly data: string,
    ) {
    }
}

export default InputImage;