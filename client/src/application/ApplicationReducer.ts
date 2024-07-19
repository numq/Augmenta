import {Reducer} from "react";
import ApplicationState from "./ApplicationState";
import ApplicationCommand from "./ApplicationCommand";
import Augmentation from "../augmentation/Augmentation";

const ApplicationReducer: Reducer<ApplicationState, ApplicationCommand> = (state, command) => {
    switch (command.type) {
        case "SelectTabIndex": {
            return {
                ...state,
                selectedTabIndex: command.index
            }
        }

        case "SetAugmentations": {
            return {
                ...state,
                augmentations: command.augmentations
            }
        }

        case "SetPresets": {
            return {
                ...state,
                presets: command.presets
            }
        }

        case "SavePreset": {
            return {
                ...state,
                presets: [...state.presets, command.preset]
            }
        }

        case "RemovePreset": {
            return {
                ...state,
                presets: state.presets.filter(preset => preset.id !== command.preset.id)
            }
        }

        case "SelectCategoryIndex": {
            return {
                ...state,
                selectedCategoryIndex: command.index,
                selectedAugmentationIndex: 0
            }
        }

        case "SelectAugmentationIndex": {
            return {
                ...state,
                selectedAugmentationIndex: command.index
            }
        }

        case "SetQuantity": {
            return {
                ...state,
                augmentations: state.augmentations.map(augmentation => {
                    if (augmentation.id === command.augmentationId) {
                        return new Augmentation(augmentation.id, augmentation.name, augmentation.category, Math.max(0, command.quantity));
                    }
                    return augmentation;
                })
            }
        }

        case "IncrementCategoryQuantity": {
            return {
                ...state,
                augmentations: state.augmentations.map(augmentation => {
                    if (augmentation.category === command.category) {
                        return new Augmentation(augmentation.id, augmentation.name, augmentation.category, augmentation.quantity + command.quantity);
                    }

                    return augmentation;
                })
            }
        }

        case "DecrementCategoryQuantity": {
            return {
                ...state,
                augmentations: state.augmentations.map(augmentation => {
                    if (augmentation.category === command.category) {
                        return new Augmentation(augmentation.id, augmentation.name, augmentation.category, Math.max(0, augmentation.quantity - command.quantity));
                    }

                    return augmentation;
                })
            }
        }

        case "ResetQuantities": {
            return {
                ...state,
                augmentations: state.augmentations.map(augmentation => {
                    return new Augmentation(augmentation.id, augmentation.name, augmentation.category, 0)
                })
            }
        }

        case "AddImageInput": {
            return {
                ...state,
                inputImages: [...state.inputImages, command.image]
            }
        }

        case "SendToPreview": {
            return {
                ...state,
                previewInputImage: command.image
            }
        }

        case "GenerateInput": {
            state.abortControllerInput?.abort();

            return {
                ...state,
                abortControllerInput: new AbortController()
            }
        }

        case "CancelGenerationInput": {
            state.abortControllerInput?.abort();

            return {
                ...state,
                abortControllerInput: null,
                generationProgressInput: null,
            }
        }

        case "GenerationUpdate": {
            return {
                ...state,
                generationProgressInput: command.progress,
                outputImages: [...state.outputImages, command.generatedImage]
            }
        }

        case "GenerationEnd": {
            if (state.abortControllerInput === null) {
                return state;
            }
            return {
                ...state,
                abortControllerInput: null,
                generationProgressInput: null
            }
        }

        case "RemoveImageInput": {
            return {
                ...state,
                inputImages: state.inputImages.filter(image => image.id !== command.image.id)
            }
        }

        case "ClearInput": {
            return {
                ...state,
                inputImages: []
            }
        }

        case "AddImagesOutput": {
            return {
                ...state,
                outputImages: [...state.outputImages, ...command.images]
            }
        }

        case "RegenerateOutput": {
            state.abortControllerOutput?.abort();

            return {
                ...state,
                abortControllerOutput: new AbortController(),
                regeneratingId: command.id,
            }
        }

        case "CancelRegenerationOutput": {
            state.abortControllerOutput?.abort();

            return {
                ...state,
                abortControllerOutput: null,
                regeneratingId: null,
            }
        }

        case "EndRegenerationOutput": {
            if (state.abortControllerOutput === null) {
                return state;
            }
            return {
                ...state,
                abortControllerOutput: null,
                regeneratingId: null,
                outputImages: state.outputImages.map(image => image.id === command.fromImage.id ? command.toImage : image)
            }
        }

        case "RemoveImageOutput": {
            return {
                ...state,
                outputImages: state.outputImages.filter(image => image.id !== command.image.id)
            }
        }

        case "ClearOutput": {
            return {
                ...state,
                outputImages: []
            }
        }

        case "SetPreviewInput": {
            return {
                ...state,
                previewInputImage: command.image
            }
        }

        case "GeneratePreview": {
            state.abortControllerPreview?.abort();

            return {
                ...state,
                abortControllerPreview: new AbortController()
            }
        }

        case "CancelGenerationPreview": {
            state.abortControllerPreview?.abort();

            return {
                ...state,
                abortControllerPreview: null
            }
        }

        case "EndGenerationPreview": {
            if (state.abortControllerPreview === null) {
                return state;
            }
            return {
                ...state,
                abortControllerPreview: null,
                previewOutputImage: command.image,
            }
        }

        case "RemoveInputImagePreview": {
            return {
                ...state,
                previewInputImage: null,
                previewOutputImage: null
            }
        }

        case "RemoveOutputImagePreview": {
            return {
                ...state,
                previewOutputImage: null
            }
        }

        default: {
            return state;
        }
    }
};

export default ApplicationReducer;