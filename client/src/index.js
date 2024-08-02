import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ApplicationComponent from "./application/ApplicationComponent";
import AugmentationService from "./augmentation/AugmentationService";
import PresetService from "./preset/PresetService";
import {createTheme, ThemeProvider} from "@mui/material";

const augmentationService = new AugmentationService();

const presetService = new PresetService();

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#203055',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ApplicationComponent
                augmentationService={augmentationService}
                presetService={presetService}
            />
        </ThemeProvider>
    </React.StrictMode>
);