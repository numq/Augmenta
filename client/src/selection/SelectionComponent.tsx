import React, {useCallback} from "react";
import {Badge, Box, Button, Grid, Tab, Tabs} from "@mui/material";
import Augmentation from "../augmentation/Augmentation";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    categories: string[];
    selectedCategoryAugmentations: Augmentation[];
    activeAugmentations: Augmentation[];
    selectedCategoryIndex: number;
    selectCategoryIndex: (index: number) => void;
    selectedAugmentationIndex: number;
    selectAugmentationIndex: (index: number) => void;
    sx?: SxProps<Theme>;
}

const SelectionComponent: React.FC<Props> = ({
                                                 categories,
                                                 selectedCategoryAugmentations,
                                                 activeAugmentations,
                                                 selectedCategoryIndex,
                                                 selectCategoryIndex,
                                                 selectedAugmentationIndex,
                                                 selectAugmentationIndex,
                                                 sx
                                             }) => {
    const calculateCategoryQuantity = useCallback((category: string) => {
        return activeAugmentations.filter(augmentation => augmentation.category === category).reduce((acc, augmentation) => acc + augmentation.quantity, 0);
    }, [activeAugmentations]);

    return (<Box sx={sx}>
            <Box sx={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 4px 4px 4px",
                gap: "4px",
                overflow: 'hidden'
            }}>
                <Tabs
                    value={selectedCategoryIndex}
                    onChange={(_, value) => {
                        selectCategoryIndex(value)
                    }}
                    variant="fullWidth"
                    sx={{width: "100%"}}
                >
                    {categories.map(category => (
                        <Tab
                            key={category}
                            label={(
                                <Badge badgeContent={calculateCategoryQuantity(category)} color="primary">
                                    {category.toUpperCase()}
                                </Badge>
                            )}
                            sx={{width: "100%"}}
                        />
                    ))}
                </Tabs>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      gap={1}
                      spacing={1}
                      sx={{width: "100%"}}
                >
                    {
                        selectedCategoryAugmentations.map((augmentation, index) => (
                                <Grid item key={augmentation.id}>
                                    <Button
                                        variant={index === selectedAugmentationIndex ? "contained" : "outlined"}
                                        onClick={() => selectAugmentationIndex(index)}
                                        fullWidth
                                    >
                                        <Badge badgeContent={augmentation.quantity} color="secondary">
                                            {augmentation.name}
                                        </Badge>
                                    </Button>
                                </Grid>
                            )
                        )}
                </Grid>
            </Box>
        </Box>
    );
}

export default SelectionComponent;