"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/Image/Image';
import s from './Generate.module.scss';
import domtoimage from 'dom-to-image';
import {
    backgrounds, foregrounds, stands, bodies, clouths, eyesColors, mouths, hairs
} from '@/data/weights';

// Function to pick a random index based on weights
function getRandomIndexByWeight(weights: number[]): number {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomWeight = Math.random() * totalWeight;

    let accumulatedWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        accumulatedWeight += weights[i];
        if (accumulatedWeight >= randomWeight) {
            return i; // Return the index instead of the value
        }
    }

    return weights.length - 1; // Fallback (shouldn't really reach here)
}

// Calculate rarity percentage for an individual option
const getRarityPercentage = (weights: number[], index: number): number => {
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    return (weights[index] / totalWeight) * 100;
};

// Calculate total rarity by multiplying individual rarities as percentages
const calculateTotalRarity = (rarities: number[]): number => {
    const productOfRarities = rarities.reduce((acc, rarity) => acc * (rarity / 100), 1);
    return productOfRarities * 10000000; // Convert back to percentage
};

const Generate: React.FC = () => {
    const [indexes, setIndexes] = useState<number[]>(new Array(8).fill(0)); // 8 layers with default index 0
    const [rarities, setRarities] = useState<number[]>(new Array(8).fill(0)); // Store rarity for each layer
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

    // Update rarity percentages whenever indexes change
    useEffect(() => {
        const updatedRarities = [
            getRarityPercentage(backgrounds, indexes[0]),
            getRarityPercentage(foregrounds, indexes[1]),
            getRarityPercentage(stands, indexes[2]),
            getRarityPercentage(bodies, indexes[3]),
            getRarityPercentage(clouths, indexes[4]),
            getRarityPercentage(eyesColors, indexes[5]),
            getRarityPercentage(mouths, indexes[6]),
            getRarityPercentage(hairs, indexes[7])
        ];
        setRarities(updatedRarities);
    }, [indexes]);

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

    // Randomize indexes based on weights
    const randomizeIndexes = () => {
        const newIndexes = [
            getRandomIndexByWeight(backgrounds),
            getRandomIndexByWeight(foregrounds),
            getRandomIndexByWeight(stands),
            getRandomIndexByWeight(bodies),
            getRandomIndexByWeight(clouths),
            getRandomIndexByWeight(eyesColors),
            getRandomIndexByWeight(mouths),
            getRandomIndexByWeight(hairs)
        ];
        setIndexes(newIndexes);


        logResults(getRarityLabel().props["children"]);
    };


    const [commons, setCommons] = useState(0);
    const [uncommons, setUncommons] = useState(0);
    const [rares, setRares] = useState(0);
    const [epics, setEpics] = useState(0);
    const [legendarys, setLegendarys] = useState(0);

    const logResults = (value: string) => {
        switch (value) {
            case "Common":
                setCommons(prev => prev + 1);
                break;
            case "Uncommon":
                setUncommons(prev => prev + 1);
                break;
            case "Rare":
                setRares(prev => prev + 1);
                break;
            case "Epic":
                setEpics(prev => prev + 1);
                break;
            case "Legendary":
                setLegendarys(prev => prev + 1);
                break;
            default:
                break;
        }

        // Optional: Clear the console and log updated values
        console.clear();
        console.log("commons", commons);
        console.log("uncommons", uncommons);
        console.log("rares", rares);
        console.log("epics", epics);
        console.log("legendarys", legendarys);
    };

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

    // Calculate total rarity percentage
    const totalRarity = calculateTotalRarity(rarities);

    // Define a function to get the rarity label based on totalRarity
    const getRarityLabel = () => {
        if (totalRarity > 5) {
            return <span className={s.common}>Common</span>;
        } else if (totalRarity > 2 && totalRarity <= 5) {
            return <span className={s.uncommon}>Uncommon</span>;
        } else if (totalRarity > 0.3 && totalRarity <= 2) {
            return <span className={s.rare}>Rare</span>;
        } else if (totalRarity > 0.05 && totalRarity <= 0.3) {
            return <span className={s.epic}>Epic</span>;
        } else {
            return <span className={s.legendary}>Legendary</span>;
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.bg} style={{ backgroundImage: `url(https://stand-boys.vercel.app/svg/0/${indexes[0]}.svg)` }}></div>
            <div className={s.inputsWrapper}>
                <div className={s.totalRarity}>
                    <strong>Total Rarity:</strong> {totalRarity.toFixed(5)}% {/* Show more precision */}
                    <div className={s.rarityLabel}>
                        {getRarityLabel()}
                    </div>
                </div>

                {
                    indexes.map((_, index) => {
                        const layerWeights = index === 0 ? backgrounds
                            : index === 1 ? foregrounds
                                : index === 2 ? stands
                                    : index === 3 ? bodies
                                        : index === 4 ? clouths
                                            : index === 5 ? eyesColors
                                                : index === 6 ? mouths
                                                    : hairs;

                        return <div key={index} className={s.inputWrapper}>
                            <label htmlFor={`index-${index}`}>Layer {index}</label>
                            <input
                                type="range"
                                id={`index-${index}`}
                                min={0}
                                max={layerWeights.length - 1}
                                value={indexes[index]}
                                onChange={(e) => handleIndexChange(index, parseInt(e.target.value))}
                            />
                            <span>{indexes[index]}</span> {/* Display current index value */}
                            <span>{rarities[index].toFixed(1)}%</span> {/* Display rarity percentage */}
                        </div>
                    })
                }

                <div className={s.btns}>
                    <button onClick={downloadImage}>Download as PNG</button>
                    <button onClick={randomizeIndexes}>Randomize Layers</button> {/* Randomize button */}
                </div>


            </div>

            <div id="capture" className={s.wrapper} style={{ width: '100dvh', height: '100dvh', position: 'relative' }}>
                <Image values={indexes} />
            </div>
        </div>
    );
};

export default Generate;
