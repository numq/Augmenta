import React from "react";
import {Box, Button, LinearProgress} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";

interface Props<Theme extends object = {}> {
    generationProgress: number | null;
    generate: () => void;
    cancel: () => void;
    disabled: boolean;
    sx?: SxProps<Theme>;
}

const GenerationComponent: React.FC<Props> = ({generationProgress, generate, cancel, disabled, sx}) => {
    return <Box sx={sx}>
        {
            generationProgress ? (
                <Box sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 4px 4px 4px",
                    gap: "4px",
                    overflow: 'hidden'
                }}>
                    <LinearProgress
                        variant="determinate"
                        value={generationProgress}
                        sx={{
                            width: "100%",
                            flexBasis: 0,
                            flexGrow: 1
                        }}
                    />
                    <Button onClick={cancel}>Cancel</Button>
                </Box>
            ) : (
                <Box sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 4px 4px 4px",
                    gap: "4px",
                    overflow: 'hidden'
                }}>
                    <Button onClick={generate} disabled={disabled} variant="contained">Generate</Button>
                </Box>
            )
        }
    </Box>
};

export default GenerationComponent;