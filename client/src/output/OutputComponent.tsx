import React, {useState} from 'react';
import {
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import ImageGrid from "../image/ImageGrid";
import {Close, Delete, Download, HelpOutline} from "@mui/icons-material";
import OutputImage from "./OutputImage";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    images: OutputImage[];
    regeneratingId: string | null;
    regenerate: (image: OutputImage) => void;
    remove: (image: OutputImage) => void;
    clear: () => void;
    download: () => void;
    sx?: SxProps<Theme>;
}

const OutputComponent: React.FC<Props> = ({images, regeneratingId, regenerate, remove, clear, download, sx}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const confirmDeleteAll = () => {
        clear();
        setOpenDialog(false);
    };

    return (
        <Box sx={sx}>
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
                        <Typography>{"Click on any image to regenerate it"}</Typography>
                    </Box>
                    <Tooltip title={"Download"}>
                        <IconButton
                            disabled={regeneratingId !== null || images.length === 0}
                            onClick={download}>
                            <Download/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Delete all images"}>
                        <IconButton
                            disabled={regeneratingId !== null || images.length === 0}
                            onClick={clear}>
                            <Delete/>
                        </IconButton>
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
                    {images.length > 0 ? (
                        <ImageGrid
                            images={images}
                            itemContent={(index, image) => {
                                return (<Tooltip
                                    title={
                                        <Box sx={{textAlign: "center"}}>
                                            {(image as OutputImage).inputImage.name}
                                            <br/>
                                            {(image as OutputImage).augmentation.category.toUpperCase()}
                                            <br/>
                                            {(image as OutputImage).augmentation.name}
                                        </Box>
                                    } key={index}>
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
                                            onClick={() => !regeneratingId && regenerate(images[index])}
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
                                            onClick={() => !regeneratingId && remove(images[index])}
                                            sx={{
                                                width: '20%',
                                                height: '20%',
                                                borderRadius: '0',
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                            }}
                                        >
                                            <Close color='secondary'/>
                                        </IconButton>
                                        {
                                            image.id === regeneratingId && (
                                                <Box sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <CircularProgress/>
                                                </Box>
                                            )
                                        }
                                    </Box>
                                </Tooltip>);
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexBasis: 0,
                                flexGrow: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: 'primary'
                            }}>
                            <ImageIcon sx={{fontSize: '128px'}}/>
                            <Typography variant="h5">Processed images will be here</Typography>
                        </Box>
                    )
                    }
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

export default OutputComponent;
