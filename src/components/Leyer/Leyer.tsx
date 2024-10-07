import React from 'react';

interface LeyerProps {
    leyer: any;
    selected: boolean;
    index: number;
    onChange: (index: number) => void;
}

const Leyer: React.FC<LeyerProps> = ({ leyer, selected, index, onChange }) => {
    const handleChange = (newIndex: number) => {
        onChange(newIndex);
    };

    // Construct the image URL using the folder and index
    const imageUrl = `/svg/${leyer.folder}/${index}.svg`;

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Display the image */}
            <img src={imageUrl} />

            {/* Render leyer folder name */}
            {/* <p>{leyer.folder}</p> */}

            {/* Range input to change index */}
            <input
                type="range"
                min={0}
                max={leyer.length - 1}
                value={index}
                onChange={(e) => handleChange(Number(e.target.value))}
            />
        </div>
    );
};

export default Leyer;
