import React, {useCallback, useState} from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import InputImage from "./InputImage";
import {v4} from "uuid";
import {useDropzone} from "react-dropzone";
import ImageGrid from "../image/ImageGrid";
import ImageIcon from "@mui/icons-material/Image";
import {Close, Delete, HelpOutline, Upload} from "@mui/icons-material";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    images: InputImage[];
    isGenerating: boolean;
    upload: (images: InputImage[]) => void;
    generate: (image: InputImage) => void;
    remove: (image: InputImage) => void;
    clear: () => void;
    sx?: SxProps<Theme>;
}

const InputComponent: React.FC<Props> = ({images, isGenerating, upload, generate, remove, clear, sx}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const onDrop = useCallback(async (files: File[]) => {
        await Promise.all(files.map(file => {
            return new Promise<InputImage>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const name = file.name;
                    const data = event.target?.result as string;
                    data ? resolve(new InputImage(v4(), name, data)) : reject();
                };
                reader.readAsDataURL(file);
            })
        })).then(upload);
    }, [upload]);

    const {getRootProps, open, isDragActive} = useDropzone({
        onDrop,
        disabled: isGenerating,
        noClick: true,
        multiple: true,
        accept: {
            "image/*": [".bmp", ".jpg", ".jpeg", ".png", ".webp"],
        }
    })

    const confirmDeleteAll = useCallback(() => {
        clear()
        setOpenDialog(false);
    }, [clear, setOpenDialog]);

    return (
        <Box {...getRootProps()} sx={sx}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 4px 4px 4px",
                    gap: "4px"
                }}
            >
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "end",
                    padding: "4px 4px 4px 4px",
                    gap: "4px"
                }}>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: "4px 4px 4px 4px",
                        gap: "4px"
                    }}>
                        <HelpOutline/>
                        <Typography>{"Click on any image to send it to preview"}</Typography>
                    </Box>
                    <Tooltip title={"Upload"}>
                    <span>
                        <IconButton disabled={isGenerating || isDragActive} onClick={open}><Upload/></IconButton>
                    </span>
                    </Tooltip>
                    <Tooltip title={"Delete all images"}>
                    <span>
                        <IconButton
                            disabled={isGenerating || isDragActive || images.length === 0}
                            onClick={clear}
                        >
                            <Delete/>
                        </IconButton>
                    </span>
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexBasis: 0,
                        flexGrow: 1,
                        alignItems: "start",
                        justifyContent: "center"
                    }}
                >
                    {images.length === 0 ? !isDragActive && (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexBasis: 0,
                                flexGrow: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <ImageIcon sx={{fontSize: '128px'}}/>
                            <Typography variant="h5">Drag and drop images here</Typography>
                        </Box>
                    ) : (
                        <ImageGrid
                            images={images}
                            itemContent={(index, image) => {
                                return (<Tooltip title={image.name} key={index}>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            paddingBottom: "100%",
                                            overflow: "hidden",
                                            borderRadius: "8px",
                                            boxShadow: "0 0 5px rgba(0,0,0,0.2)"
                                        }}
                                    >
                                        <img
                                            src={image.data}
                                            alt={image.name}
                                            loading="lazy"
                                            onClick={() => image && generate(images[index])}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                cursor: "pointer"
                                            }}/>
                                        <IconButton
                                            onClick={() => !isGenerating && remove(images[index])}
                                            sx={{
                                                width: '20%',
                                                height: '20%',
                                                borderRadius: '0',
                                                color: "white",
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                            }}
                                        >
                                            <Close/>
                                        </IconButton>
                                    </Box>
                                </Tooltip>);
                            }}
                        />
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
                            <Typography variant="h5" color="white">
                                Drop files here
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>{"Delete All Images?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete all images? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setOpenDialog(false)}>
                        Cancel
                    </button>
                    <button onClick={confirmDeleteAll}>
                        Delete All
                    </button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InputComponent;