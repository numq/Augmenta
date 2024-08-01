import React, {useCallback, useRef} from "react";
import {Box, Card, CircularProgress, Typography} from "@mui/material";
import Augmentation from "../augmentation/Augmentation";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import InputImage from "../input/InputImage";
import {v4} from "uuid";
import {useDropzone} from "react-dropzone";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    augmentation: Augmentation;
    inputImage: InputImage | null;
    outputImage: InputImage | null;
    isGenerating: boolean;
    upload: (image: InputImage) => void;
    generate: (augmentation: Augmentation, image: InputImage) => void;
    cancel: () => void;
    sx?: SxProps<Theme>;
}

const PreviewComponent: React.FC<Props> = ({
                                               augmentation,
                                               inputImage,
                                               outputImage,
                                               isGenerating,
                                               upload,
                                               generate,
                                               cancel,
                                               sx
                                           }) => {
    const abortControllerRef = useRef<AbortController | null>(null);

    const onDrop = useCallback(async (files: File[]) => {
        abortControllerRef.current?.abort();

        const file = files[0];
        file && (file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const name = file.name;
                const data = event.target?.result as string;
                data && upload(new InputImage(v4(), name, data));
            };
            reader.readAsDataURL(file);
        })(file)
    }, [upload]);

    const {getRootProps, open, isDragActive} = useDropzone({
        onDrop,
        noClick: inputImage !== null,
        multiple: false,
        maxFiles: 1,
        accept: {
            "image/*": [".bmp", ".jpg", ".jpeg", ".png", ".webp"],
        }
    })

    const generateImage = useCallback((augmentation: Augmentation, image: InputImage) => {
        generate(augmentation, image);
    }, [generate]);

    return (
        <Box sx={sx}>
            <Box {...getRootProps()} sx={{
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                padding: "4px 4px 4px 4px",
                gap: "4px",
                overflow: 'hidden'
            }}>
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Card onClick={open} sx={{
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexBasis: 0,
                        flexGrow: 1,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: 'hidden',
                    }}>
                        {inputImage ? (
                            <img
                                src={inputImage.data}
                                alt={inputImage.name}
                                style={{width: "100%", height: "100%", objectFit: "cover"}}
                            />
                        ) : (
                            <ImageNotSupportedIcon sx={{width: "50%", height: "50%"}}/>
                        )}
                        {isDragActive && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 1000,
                                }}
                            >
                                <Typography variant="h5">Drop file here</Typography>
                            </Box>
                        )}
                    </Card>
                </Box>
                <Box sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexBasis: 0,
                            flexGrow: 1,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: 'hidden'
                        }}
                    >
                        {
                            outputImage ? (
                                <img
                                    src={outputImage.data}
                                    alt={outputImage.name}
                                    onClick={() => isGenerating ? cancel() : (inputImage && generateImage(augmentation, inputImage))}
                                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                                />
                            ) : (
                                !isGenerating && (
                                    <ImageNotSupportedIcon sx={{width: "50%", height: "50%"}}/>)
                            )
                        }
                        {
                            isGenerating && (
                                <Box sx={{
                                    position: 'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CircularProgress/>
                                </Box>
                            )
                        }
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default PreviewComponent;