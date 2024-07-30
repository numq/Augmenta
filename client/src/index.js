import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ApplicationComponent from "./application/ApplicationComponent";
import AugmentationService from "./augmentation/AugmentationService";
import PresetService from "./preset/PresetService";

const augmentationService = new AugmentationService();

const presetService = new PresetService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApplicationComponent
            title={'numq/AugmentationUI'}
            augmentationService={augmentationService}
            presetService={presetService}
        />
    </React.StrictMode>
);