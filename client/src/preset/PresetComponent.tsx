import React, {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import Preset from "./Preset";
import Augmentation from "../augmentation/Augmentation";
import {Delete, Save, Tune} from "@mui/icons-material";
import {v4} from "uuid";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    presets: Preset[],
    activeAugmentations: Augmentation[],
    augmentations: Augmentation[],
    save: (preset: Preset) => void
    load: (preset: Preset) => void
    remove: (preset: Preset) => void
    sx?: SxProps<Theme>;
}

export const PresetComponent: React.FC<Props> = ({
                                                     presets,
                                                     activeAugmentations,
                                                     augmentations,
                                                     load,
                                                     save,
                                                     remove,
                                                     sx
                                                 }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [presetName, setPresetName] = useState("");
    const [presetToRemove, setPresetToRemove] = useState<Preset | null>(null);

    const open = Boolean(anchorEl);

    const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), [setAnchorEl]);

    const closeMenu = useCallback(() => setAnchorEl(null), [setAnchorEl]);

    const openSaveDialog = useCallback(() => setSaveDialogOpen(true), [setSaveDialogOpen]);

    const closeSaveDialog = useCallback(() => setSaveDialogOpen(false), [setSaveDialogOpen]);

    const openRemoveDialog = useCallback((preset: Preset) => {
        setPresetName("");
        setPresetToRemove(preset);
        setRemoveDialogOpen(true);
    }, [setPresetName, setPresetToRemove, setRemoveDialogOpen]);

    const closeRemoveDialog = useCallback(() => {
        setRemoveDialogOpen(false);
        setPresetToRemove(null);
    }, [setRemoveDialogOpen, setPresetToRemove]);

    const savePreset = useCallback(() => {
        const preset = new Preset(v4(), presetName, augmentations);
        save(preset);
        setSaveDialogOpen(false);
    }, [presetName, augmentations, save]);

    const removePreset = useCallback(() => {
        presetToRemove && remove(presetToRemove);
        setRemoveDialogOpen(false);
    }, [presetToRemove, remove]);

    const loadPreset = useCallback((preset: Preset) => {
        load(preset);
    }, [load]);

    return (
        <Box sx={sx}>
            <Box sx={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 4px 4px 4px",
                gap: "4px"
            }}>
                <Tooltip title={"Save preset"}>
                    <span>
                    <IconButton
                        onClick={openSaveDialog}
                        disabled={!activeAugmentations.some(aug => aug.quantity > 0)}
                    >
                        <Save/>
                    </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Presets">
                    <IconButton onClick={openMenu}>
                        <Tune/>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={closeMenu}
                    marginThreshold={0}
                    sx={{width: "100%"}}
                >
                    {presets.length > 0 ? presets.map((preset: Preset) => (
                        <MenuItem
                            key={preset.id}
                            value={preset.id}
                            onClick={() => {
                                loadPreset(preset)
                            }}
                            sx={{
                                width: "100%",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '4px 4px 4px 4px',
                                gap: '4px',
                            }}>
                            <Typography sx={{flexBasis: 0, flexGrow: 1}}>{preset.name}</Typography>
                            <Tooltip title={"Remove preset"}>
                                <IconButton onClick={event => {
                                    event.stopPropagation();
                                    openRemoveDialog(preset)
                                }}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    )) : (
                        <MenuItem
                            value={"Saved presets"}
                            onClick={closeMenu}
                            sx={{
                                width: "100%",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Typography>{"There are no saved presets"}</Typography>
                        </MenuItem>
                    )}
                </Menu>
            </Box>
            <Dialog open={saveDialogOpen} onClose={closeSaveDialog}>
                <DialogTitle>Enter preset name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Preset name"
                        fullWidth
                        value={presetName}
                        onChange={(e) => setPresetName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeSaveDialog}>Cancel</Button>
                    <Button onClick={savePreset} disabled={presetName.trim().length < 1}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={removeDialogOpen} onClose={closeRemoveDialog}>
                <DialogTitle>Confirm preset removal</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to remove this preset?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeRemoveDialog}>Cancel</Button>
                    <Button onClick={removePreset}>Remove</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};