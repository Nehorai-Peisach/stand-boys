import React from 'react';
import s from './Image.module.scss';

// Input:
// (0 - Background: 0 - 10),
// (1 - Foreground: 0 - 2),
// (2 - Stand: 0 - 9),
// (3 - Body: 0 - 9),
// (4 - Clouth: 0 - 9),
// (5 - Color - Eyes: 0 - 5),
// (6 - Mouth: 0 - 10),
// (7 - Hair: 0 - 9),

// Output:
// (0 - Background: 0 - 10),
// (1 - Foreground: 0 - 2),
// (2 - BackClouth: as clouth),
// (3 - Stand: 0 - 9),
// (4 - Body: 0 - 9),
// (5 - Clouth: 0 - 9),
// (6 - Head: as body),
// (7 - Eyes Base: 0 - 0),
// (8 - Color - Eyes: 0 - 5),
// (9 - Mouth: 0 - 10),
// (10 - Hair: 0 - 9),

interface ImageProps {
    values: number[]; // Array of selected image values for each layer
}

const ImageComponent: React.FC<ImageProps> = ({ values }) => {
    return (
        <div style={{
            display: "flex",
            position: 'relative', width: '100%', height: '100%',
        }}>
            {new Array(11).fill(0).map((_, i) => {
                const imageUrl = `http://localhost:3000/svg/${i}/` + (() => {
                    switch (i) {
                        case 0: return values[0]; // Background => Background
                        case 1: return values[1]; // Foreground => Foreground
                        case 2: return values[4]; // BackClouth => Clouth
                        case 3: return values[2]; // Stand => Stand
                        case 4: return values[3]; // Body => Body
                        case 5: return values[4]; // Clouth => Clouth
                        case 6: return values[3]; // Head => Body
                        case 7: return '0';        // Eyes Base => default
                        case 8: return values[5]; // Color => Color
                        case 9: return `${(values[3] === 8 || values[3] === 9) ? 1 : 0}/${values[6]}${(values[6] === 8 || values[6] === 9 || values[6] === 10) ? '/' + values[5] : ''}`; // Mouth => Body + Mouth + Color
                        case 10: return `${values[5]}/${values[7]}`; // Hair => Color + Hair
                        default: return ''; // Default case
                    }
                })();

                const fullImageUrl = imageUrl + '.svg';

                return (
                    <img
                        className={(i === 3 || i === 4 || i === 6) ? s.shadow : ''}
                        key={i}
                        src={fullImageUrl}
                        alt={`Layer-${i}`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                );
            })}
        </div>
    );
};

export default ImageComponent;
