import React, {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import Augmentation from "../augmentation/Augmentation";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Add, ClearAll, Remove} from "@mui/icons-material";

interface Props<Theme extends object = {}> {
    activeAugmentations: Augmentation[];
    augmentation: Augmentation;
    setAugmentationQuantity: (augmentation: Augmentation, quantity: number) => void;
    incrementCategoryQuantity: (quantity: number) => void;
    decrementCategoryQuantity: (quantity: number) => void;
    reset: () => void;
    sx?: SxProps<Theme>;
}

const QuantityComponent: React.FC<Props> = ({
                                                activeAugmentations,
                                                augmentation,
                                                setAugmentationQuantity,
                                                incrementCategoryQuantity,
                                                decrementCategoryQuantity,
                                                reset,
                                                sx
                                            }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = useCallback(() => setOpenDialog(true), [setOpenDialog]);

    const handleCloseDialog = useCallback(() => setOpenDialog(false), [setOpenDialog]);

    const resetAll = useCallback(() => {
        reset();
        handleCloseDialog();
    }, [reset, handleCloseDialog]);
    return (
        <Box sx={sx}>
            <Box sx={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 4px 4px 4px",
                gap: "4px"
            }}>
                <TextField
                    label={`${augmentation.name} augmentation quantity`}
                    type="number"
                    value={augmentation.quantity}
                    onChange={(event) => {
                        const number = Number(event.target.value);
                        number >= 0 && setAugmentationQuantity(augmentation, number)
                    }}
                    variant="outlined"
                    sx={{width: "100%"}}
                />
                <Tooltip title={`Decrement each ${augmentation.category} category quantity by 1`}>
                    <span>
                    <IconButton
                        onClick={() => decrementCategoryQuantity(1)}
                        disabled={!activeAugmentations.some(aug => aug.quantity > 0)}
                    >
                        <Remove/>
                    </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={`Increment each ${augmentation.category} category quantity by 1`}>
                    <IconButton onClick={() => incrementCategoryQuantity(1)}>
                        <Add/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Reset augmentations"}>
                    <span>
                    <IconButton
                        onClick={handleOpenDialog}
                        disabled={!activeAugmentations.some(aug => aug.quantity > 0)}
                    >
                        <ClearAll/>
                    </IconButton>
                    </span>
                </Tooltip>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>
                    {"Reset augmentations?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to reset all augmentations?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={resetAll} autoFocus>Reset</Button>
                </DialogActions>
            </Dialog>
        </Box>)
}

export default QuantityComponent;