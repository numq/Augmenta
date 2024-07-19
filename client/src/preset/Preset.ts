import Augmentation from "../augmentation/Augmentation";

class Preset {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly augmentations: Augmentation[],
    ) {
    }
}

export default Preset;