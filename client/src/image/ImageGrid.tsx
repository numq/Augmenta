import React from 'react';
import Image from "./Image";
import {Box} from "@mui/material";

interface Props {
    images: Image[]
    itemContent: (index: number, image: Image) => React.JSX.Element
}

const ImageGrid: React.FC<Props> = ({images, itemContent}) => {
    return (
        <Box sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "8px"
        }}>
            {images.map((image, index) => (
                itemContent(index, image)
            ))}
        </Box>
    );
};

export default ImageGrid;