import Augmentation from "../augmentation/Augmentation";
import InputImage from "../input/InputImage";
import Image from "../image/Image";

class OutputImage implements Image {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly data: string,
        readonly augmentation: Augmentation,
        readonly inputImage: InputImage,
    ) {
    }
}

export default OutputImage;