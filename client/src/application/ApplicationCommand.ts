import Preset from "../preset/Preset";
import Augmentation from "../augmentation/Augmentation";
import InputImage from "../input/InputImage";
import OutputImage from "../output/OutputImage";

type ApplicationCommand =
    | CommonCommand
    | PresetCommand
    | InteractionCommand
    | QuantityCommand
    | InputCommand
    | OutputCommand
    | PreviewCommand;

export type CommonCommand =
    | { type: "SelectTabIndex"; index: number; }
    | { type: "SetAugmentations"; augmentations: Augmentation[]; };

export type PresetCommand =
    | { type: "SetPresets"; presets: Preset[]; }
    | { type: "SavePreset"; preset: Preset; }
    | { type: "RemovePreset"; preset: Preset; };

export type InteractionCommand =
    | { type: "SelectCategoryIndex"; index: number; }
    | { type: "SelectAugmentationIndex"; index: number; };

export type QuantityCommand =
    | { type: "SetQuantity"; augmentationId: string; quantity: number; }
    | { type: "IncrementCategoryQuantity"; category: string; quantity: number; }
    | { type: "DecrementCategoryQuantity"; category: string; quantity: number; }
    | { type: "ResetQuantities"; };

export type InputCommand =
    | { type: "AddImageInput"; image: InputImage; }
    | { type: "SendToPreview"; image: InputImage; }
    | { type: "GenerateInput"; }
    | { type: "CancelGenerationInput"; }
    | { type: "GenerationUpdate"; generatedImage: OutputImage; progress: number; }
    | { type: "GenerationEnd"; }
    | { type: "RemoveImageInput"; image: InputImage; }
    | { type: "ClearInput"; };

export type OutputCommand =
    | { type: "AddImagesOutput"; images: OutputImage[]; }
    | { type: "RegenerateOutput"; id: string; }
    | { type: "CancelRegenerationOutput"; }
    | { type: "EndRegenerationOutput"; fromImage: OutputImage; toImage: OutputImage; }
    | { type: "SetRegeneratedOutput"; fromImage: OutputImage; toImage: OutputImage; }
    | { type: "CancelRegenerationOutput"; }
    | { type: "RemoveImageOutput"; image: OutputImage; }
    | { type: "ClearOutput"; };

export type PreviewCommand =
    | { type: "SetPreviewInput"; image: InputImage; }
    | { type: "GeneratePreview"; }
    | { type: "CancelGenerationPreview"; }
    | { type: "EndGenerationPreview"; image: OutputImage; }
    | { type: "RemoveInputImagePreview"; }
    | { type: "RemoveOutputImagePreview"; };

export default ApplicationCommand;