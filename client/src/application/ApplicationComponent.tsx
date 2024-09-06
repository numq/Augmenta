import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import {Badge, Box, CircularProgress, Tab, Tabs, Typography} from "@mui/material";
import SelectionComponent from "../selection/SelectionComponent";
import InputComponent from "../input/InputComponent";
import OutputComponent from "../output/OutputComponent";
import AugmentationService from "../augmentation/AugmentationService";
import PresetService from "../preset/PresetService";
import ApplicationReducer from "./ApplicationReducer";
import PreviewComponent from "../preview/PreviewComponent";
import ApplicationState from "./ApplicationState";
import Preset from "../preset/Preset";
import InputImage from "../input/InputImage";
import Augmentation from "../augmentation/Augmentation";
import OutputImage from "../output/OutputImage";
import {PresetComponent} from "../preset/PresetComponent";
import GenerationComponent from "../generation/GenerationComponent";
import QuantityComponent from "../quantity/QuantityComponent";
import ContentTab from "./ContentTab";
import JSZip from "jszip";
import {saveAs} from "file-saver";

interface Props {
    augmentationService: AugmentationService,
    presetService: PresetService,
}


const ApplicationComponent: React.FC<Props> = ({augmentationService, presetService}) => {
    const [state, dispatch] = useReducer(ApplicationReducer, new ApplicationState());

    const tabs = useMemo(() => [ContentTab.Input, ContentTab.Output], []);

    const categories = useMemo(() => {
        return [...new Set(state.augmentations.map(augmentation => augmentation.category).sort())];
    }, [state.augmentations]);

    const selectedCategoryAugmentations = useMemo(() => {
        return state.augmentations.filter(augmentation => augmentation.category === categories[state.selectedCategoryIndex]);
    }, [state.augmentations, state.selectedCategoryIndex, categories]);

    const selectedCategory = useMemo(() => {
        return categories[state.selectedCategoryIndex];
    }, [state.selectedCategoryIndex, categories]);

    const selectedAugmentation = useMemo(() => {
        return selectedCategoryAugmentations[state.selectedAugmentationIndex];
    }, [state.selectedAugmentationIndex, selectedCategoryAugmentations]);

    const activeAugmentations = useMemo(() => {
        return state.augmentations.filter(augmentation => augmentation.quantity > 0);
    }, [state.augmentations]);

    const generationQueueSize = useMemo(() => {
        return state.inputImages.length * activeAugmentations.length;
    }, [state.inputImages, activeAugmentations.length]);

    const generateImage = useCallback(
        (augmentation: Augmentation, image: InputImage, abortSignal?: AbortSignal) => {
            return augmentationService.generate(augmentation, image, abortSignal);
        },
        [augmentationService]
    );

    const regenerateOutputImage = useCallback(
        (augmentation: Augmentation, image: OutputImage) => {
            dispatch({type: "RegenerateOutput", id: image.id});

            generateImage(augmentation, image.inputImage, state.abortControllerOutput?.signal).then(regeneratedImage => {
                if (regeneratedImage.isSuccess) {
                    dispatch({type: "EndRegenerationOutput", fromImage: image, toImage: regeneratedImage.value});
                }
            }).finally(() => {
                dispatch({type: "CancelRegenerationOutput"});
            });
        },
        [generateImage, state.abortControllerOutput?.signal]
    );

    const generatePreviewImage = useCallback((image: InputImage) => {
        dispatch({type: "GeneratePreview"});

        generateImage(selectedAugmentation, image, state.abortControllerPreview?.signal).then(generatedImage => {
            if (generatedImage.isSuccess) {
                dispatch({type: "EndGenerationPreview", image: generatedImage.value});
            }
        }).finally(() => {
            dispatch({type: "CancelGenerationPreview"});
        });
    }, [state.abortControllerPreview?.signal, generateImage, selectedAugmentation]);

    const uploadInputImages = useCallback((images: InputImage[]) => {
        images.forEach(image => {
            dispatch({type: "AddImageInput", image});
        });
    }, []);

    const generateInputImages = useCallback((images: InputImage[]) => {
        let processedImages = 0;
        let errorOccurred = false;

        dispatch({type: "GenerateInput"});

        const generationPromises = images.flatMap(image =>
            activeAugmentations.map(async augmentation => {
                const signal = state.abortControllerInput?.signal;
                if (signal?.aborted) {
                    return Promise.reject(new Error("Generation cancelled"));
                }

                const generatedImage = await augmentationService.generate(augmentation, image, signal);
                if (generatedImage.isSuccess) {
                    dispatch({
                        type: "GenerationUpdate",
                        generatedImage: generatedImage.value,
                        progress: ((++processedImages) / generationQueueSize) * 100,
                    });
                } else {
                    errorOccurred = true;
                }
            })
        );

        Promise.allSettled(generationPromises).then(() => {
            if (!errorOccurred) {
                dispatch({type: "GenerationEnd"});
            }
        }).catch(() => {
            dispatch({type: "CancelGenerationInput"});
        });
    }, [activeAugmentations, augmentationService, generationQueueSize, state.abortControllerInput?.signal]);

    const download = useCallback(async (images: OutputImage[]) => {
        const zip = new JSZip();

        for (const image of images) {
            try {
                const byteString = atob(image.data.split(',')[1]);
                const mimeString = image.data.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], {type: mimeString});

                zip.file(`${image.id}.png`, blob);
            } catch (error) {
                console.error(`Failed to add image ${image.id} to ZIP:`, error);
            }
        }

        zip.generateAsync({type: "blob"}).then((content) => {
            const filename = `${Date.now()}-${Math.floor(Math.random() * 10000)}.zip`;
            saveAs(content, filename);
        });
    }, []);

    const getTabContent = useCallback((tab: ContentTab) => {
        switch (tab) {
            case ContentTab.Input:
                return (
                    <InputComponent
                        images={state.inputImages}
                        isGenerating={state.abortControllerInput !== null || state.generationProgressInput !== null}
                        upload={uploadInputImages}
                        generate={image => {
                            dispatch({type: "SendToPreview", image: image});
                            generatePreviewImage(image);
                        }}
                        remove={image => dispatch({type: "RemoveImageInput", image: image})}
                        clear={() => dispatch({type: "ClearInput"})}
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                );

            case ContentTab.Output:
                return (
                    <OutputComponent
                        images={state.outputImages}
                        regeneratingId={state.regeneratingId}
                        regenerate={image => regenerateOutputImage(selectedAugmentation, image)}
                        remove={image => dispatch({type: "RemoveImageOutput", image: image})}
                        clear={() => dispatch({type: "ClearOutput"})}
                        download={() => download(state.outputImages)}
                        sx={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                );

            default:
                return null;
        }
    }, [state.inputImages, state.outputImages, state.abortControllerInput, state.generationProgressInput, state.regeneratingId, generatePreviewImage, selectedAugmentation, uploadInputImages, regenerateOutputImage, download]);

    const savePreset = useCallback((preset: Preset) => {
        presetService.save(preset).then(savedPreset => {
            if (savedPreset.isSuccess) {
                dispatch({type: "SavePreset", preset: savedPreset.value});
            } else {
                console.error(savedPreset.error);
            }
        });
    }, [presetService]);

    const removePreset = useCallback((preset: Preset) => {
        presetService.remove(preset).then(removedPreset => {
            if (removedPreset.isSuccess) {
                dispatch({type: "RemovePreset", preset: removedPreset.value});
            } else {
                console.error(removedPreset.error);
            }
        });
    }, [presetService]);

    const loadPreset = useCallback((preset: Preset) => {
        dispatch({type: "SetAugmentations", augmentations: preset.augmentations});
    }, []);

    useEffect(() => {
        augmentationService.getAugmentations().then(augmentations => {
            if (augmentations.isSuccess) {
                if (augmentations.value.length > 0) {
                    dispatch({
                        type: "SetAugmentations",
                        augmentations: augmentations.value
                    });
                    presetService.getAll().then(presets => {
                        if (presets.isSuccess) {
                            dispatch({type: "SetPresets", presets: presets.value});
                        } else {
                            console.error(presets.error);
                        }
                    });
                }
            } else {
                console.error(augmentations.error);
            }
        });
    }, [augmentationService, presetService]);

    useEffect(() => {
        state.previewInputImage && generatePreviewImage(state.previewInputImage)
    }, [state.selectedAugmentationIndex]);

    return state.augmentations.length > 0 ? (
        <Box
            sx={{
                position: "relative",
                width: '100vw',
                height: '100vh',
                boxSizing: "border-box",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 4px 4px 4px',
                gap: '4px',
                overflow: "hidden"
            }}
        >
            <Box
                sx={{
                    width: '75%',
                    height: '100%',
                    boxSizing: "border-box",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 4px 4px 4px',
                    gap: '4px',
                    overflow: "hidden"
                }}
            >
                <SelectionComponent
                    categories={categories}
                    selectedCategoryAugmentations={selectedCategoryAugmentations}
                    activeAugmentations={activeAugmentations}
                    selectedCategoryIndex={state.selectedCategoryIndex}
                    selectCategoryIndex={index => {
                        dispatch({type: "SelectCategoryIndex", index: index});
                    }}
                    selectedAugmentationIndex={state.selectedAugmentationIndex}
                    selectAugmentationIndex={index => {
                        dispatch({type: "SelectAugmentationIndex", index: index});
                    }}
                    sx={{
                        width: "100%",
                        flexBasis: 0
                    }}
                />
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexBasis: 0
                }}>
                    <QuantityComponent
                        activeAugmentations={activeAugmentations}
                        augmentation={selectedAugmentation}
                        setAugmentationQuantity={(augmentation, quantity) => dispatch({
                            type: "SetQuantity",
                            augmentationId: augmentation.id,
                            quantity: quantity
                        })}
                        incrementCategoryQuantity={quantity => dispatch({
                            type: "IncrementCategoryQuantity",
                            category: selectedCategory,
                            quantity: quantity
                        })}
                        decrementCategoryQuantity={quantity => dispatch({
                            type: "DecrementCategoryQuantity",
                            category: selectedCategory,
                            quantity: quantity
                        })}
                        reset={() => {
                            dispatch({type: "ResetQuantities"});
                        }}
                        sx={{
                            flexBasis: 0,
                            flexGrow: 1
                        }}
                    />
                    <PresetComponent
                        presets={state.presets}
                        activeAugmentations={activeAugmentations}
                        augmentations={state.augmentations}
                        save={savePreset}
                        remove={removePreset}
                        load={loadPreset}
                        sx={{
                            flexBasis: 0
                        }}
                    />
                </Box>
                <GenerationComponent
                    generationProgress={state.generationProgressInput}
                    generate={() => generateInputImages(state.inputImages)}
                    cancel={() => {
                        dispatch({type: "CancelGenerationInput"});
                    }}
                    disabled={state.inputImages.length === 0 || activeAugmentations.length === 0 || state.abortControllerInput !== null || state.generationProgressInput !== null}
                    sx={{
                        width: "100%",
                        flexBasis: 0
                    }}
                />
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    flexBasis: 0,
                    flexGrow: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {getTabContent(tabs[state.selectedTabIndex])}
                </Box>
                <Tabs
                    value={state.selectedTabIndex}
                    onChange={(_, value) => {
                        dispatch({type: "SelectTabIndex", index: value});
                    }}
                    variant="fullWidth"
                    sx={{
                        width: "100%",
                        flexBasis: 0
                    }}
                >
                    {
                        tabs.map((tab, index) => (
                            <Tab key={index} label={
                                <Badge badgeContent={
                                    tab === ContentTab.Input ? state.inputImages.length : tab === ContentTab.Output ? state.outputImages.length : 0
                                } color="primary">
                                    <Typography>{tab}</Typography>
                                </Badge>
                            }/>
                        ))
                    }
                </Tabs>
            </Box>
            <PreviewComponent
                augmentation={selectedAugmentation}
                inputImage={state.previewInputImage}
                outputImage={state.previewOutputImage}
                isGenerating={state.abortControllerPreview !== null}
                upload={image => {
                    dispatch({type: "SetPreviewInput", image: image});
                    generatePreviewImage(image);
                }}
                generate={() => state.previewInputImage && generatePreviewImage(state.previewInputImage)}
                cancel={() => {
                    dispatch({type: "CancelGenerationPreview"});
                }}
                sx={{
                    width: "25%",
                    height: "100%"
                }}
            />
        </Box>
    ) : (
        <Box
            sx={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress/>
        </Box>
    );
};

export default ApplicationComponent;