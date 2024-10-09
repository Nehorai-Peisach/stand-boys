import React from 'react';

interface CategoryIconProps {
    url: string;
    selected: boolean;
    onClick: () => void;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ url, selected, onClick }) => {
    return (
        <div
            style={{
                border: selected ? '2px solid red' : 'none',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <img src={url} alt="Icon" />
        </div>
    );
}; 

export default CategoryIcon;
