import Augmentation from "../augmentation/Augmentation";
import Preset from "../preset/Preset";
import InputImage from "../input/InputImage";
import OutputImage from "../output/OutputImage";

class ApplicationState {
    constructor(
        readonly selectedTabIndex: number = 0,
        readonly presets: Preset[] = [],
        readonly augmentations: Augmentation[] = [],
        readonly selectedCategoryIndex: number = 0,
        readonly selectedAugmentationIndex: number = 0,
        readonly inputImages: InputImage[] = [],
        readonly generationProgressInput: number | null = null,
        readonly abortControllerInput: AbortController | null = null,
        readonly outputImages: OutputImage[] = [],
        readonly regeneratingId: string | null = null,
        readonly abortControllerOutput: AbortController | null = null,
        readonly previewInputImage: InputImage | null = null,
        readonly previewOutputImage: OutputImage | null = null,
        readonly abortControllerPreview: AbortController | null = null,
    ) {
    }
}

export default ApplicationState;