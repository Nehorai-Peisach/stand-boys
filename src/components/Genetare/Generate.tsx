"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/Image/Image';
import s from './Generate.module.scss';
import domtoimage from 'dom-to-image';

const Generate: React.FC = () => {
    const [indexes, setIndexes] = useState<number[]>(new Array(8).fill(0)); // 8 layers with default index 0
    const imageRef = useRef<HTMLDivElement>(null); // Reference to the Image wrapper
    const isInitialMount = useRef(true); // Track if the component is mounting for the first time

    // Load initial indexes from URL parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const initialIndexes = new Array(8).fill(0).map((_, index) => {
            const value = params.get(`layer${index}`);
            return value !== null ? parseInt(value) : 0; // Default to 0 if not found
        });
        setIndexes(initialIndexes);
    }, []);

    // Handle index change
    const handleIndexChange = (index: number, value: number) => {
        setIndexes((prevIndexes) => {
            const newIndexes = [...prevIndexes];
            newIndexes[index] = value;
            return newIndexes;
        });
    };

    // Update URL when indexes change
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set to false after the first render
            return; // Skip URL update on the first render
        }

        const queryParams = indexes.map((index, i) => `layer${i}=${index}`).join('&');
        const newUrl = `${window.location.pathname}?${queryParams}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [indexes]);

    const downloadImage = async () => {
        const element = document.querySelector("#capture") as HTMLElement; // Get the element to capture
        if (element) {
            try {
                const dataURL = await domtoimage.toPng(element);

                const link = document.createElement("a");
                link.href = dataURL;
                link.download = "generated-image.png"; // Set the name of the downloaded file
                link.click(); // Trigger download
            } catch (error) {
                console.error('Oops, something went wrong!', error);
            }
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.inputsWrapper}>
                <button onClick={downloadImage}>Download as PNG</button>

                {
                    indexes.map((_, index) => {
                        return <div key={index} className={s.inputWrapper}>
                            <label htmlFor={`index-${index}`}>Layer {index}</label>
                            <input
                                type="range"
                                id={`index-${index}`}
                                min={0}
                                max={
                                    index === 0 ? 10
                                        : index === 1 ? 2
                                            : index === 5 ? 5
                                                : index === 6 ? 10
                                                    : 9
                                }
                                value={indexes[index]}
                                onChange={(e) => handleIndexChange(index, parseInt(e.target.value))}
                            />
                            <span>{indexes[index]}</span> {/* Display current index value */}
                        </div>
                    })
                }
            </div>

            <div id="capture" className={s.wrapper} style={{ width: '1080px', height: '1080px', position: 'relative' }}>
                <Image values={indexes} />
            </div>
        </div>
    );
};

export default Generate;
