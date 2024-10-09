import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import ImageComponent from "@/components/Image/Image";
import { backgrounds, bodies, clouths, eyesColors, foregrounds, hairs, mouths, stands } from "@/data/weights";

export const maxDuration = 60;
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layers = Array.from({ length: 8 }, (_, i) => {
        return Number(searchParams.get(`layer${i}`)) || 0;
    });


    // Calculate rarity percentage for an individual option
    const getRarityPercentage = (weights: number[], index: number): number => {
        const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
        return (weights[index] / totalWeight) * 100;
    };

    const rarities: number[] = [
        getRarityPercentage(backgrounds, layers[0]),
        getRarityPercentage(foregrounds, layers[1]),
        getRarityPercentage(stands, layers[2]),
        getRarityPercentage(bodies, layers[3]),
        getRarityPercentage(clouths, layers[4]),
        getRarityPercentage(eyesColors, layers[5]),
        getRarityPercentage(mouths, layers[6]),
        getRarityPercentage(hairs, layers[7])
    ];

    const totalRarity = rarities.reduce((acc, rarity) => acc * (rarity / 100), 1) * 10000000;

    const getRarityStyle = (totalRarity: number): React.CSSProperties => {
        if (totalRarity > 5) {
            return {
                color: "gray",
                backgroundColor: "lightgray",
                fontSize: "2rem",
                position: "absolute",
                left: "2rem",
                bottom: "2rem",
                padding: "5px 10px",
                borderRadius: "10px"
            };
        } else if (totalRarity > 2 && totalRarity <= 5) {
            return {
                color: "green",
                backgroundColor: "lightgreen",
                boxShadow: "0 0 10px green",
                fontSize: "2rem",
                position: "absolute",
                left: "2rem",
                bottom: "2rem",
                padding: "5px 10px",
                borderRadius: "10px"
            };
        } else if (totalRarity > 0.3 && totalRarity <= 2) {
            return {
                color: "blue",
                backgroundColor: "lightblue",
                boxShadow: "0 0 10px blue",
                fontSize: "2rem",
                position: "absolute",
                left: "2rem",
                bottom: "2rem",
                padding: "5px 10px",
                borderRadius: "10px"
            };
        } else if (totalRarity > 0.05 && totalRarity <= 0.3) {
            return {
                color: "purple",
                backgroundColor: "violet",
                boxShadow: "0 0 10px purple",
                fontSize: "2rem",
                position: "absolute",
                left: "2rem",
                bottom: "2rem",
                padding: "5px 10px",
                borderRadius: "10px"
            };
        } else {
            return {
                color: "darkgoldenrod",
                backgroundColor: "lightgoldenrodyellow",
                boxShadow: "0 0 10px gold",
                fontSize: "2rem",
                position: "absolute",
                left: "2rem",
                bottom: "2rem",
                padding: "5px 10px",
                borderRadius: "10px"
            };
        }
    };



    try {
        return new ImageResponse(
            (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "1200px",
                    height: "630px",
                }}>
                    {/* Background Image */}
                    <img src={`https://stand-boys.vercel.app/svg/0/${layers[0]}.svg`} alt="bg" width={1300} height={1300}
                        style={{

                        }}
                    />
                    {/* Background overlay with opacity */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                        opacity: 0.5,
                        zIndex: 1
                    }}></div>

                    <span style={{
                        position: "absolute",
                        right: "2.2rem",
                        bottom: "5.5rem",
                        color: "white",
                        fontSize: "1.5rem"
                    }}>Made By</span>
                    <span style={{
                        fontSize: "2rem",
                        color: "white",
                        position: "absolute",
                        right: "2rem",
                        bottom: "2.5rem"
                    }}>
                        Nehorai Peisach
                    </span>

                    <span style={{
                        position: "absolute",
                        left: "2.2rem",
                        bottom: "5.5rem",
                        color: "white",
                        fontSize: "1.5rem"
                    }}>Image Rarity</span>
                    <span style={getRarityStyle(totalRarity)}>
                        {totalRarity > 5 ? 'COMMON' :
                            totalRarity > 2 && totalRarity <= 5 ? 'UNCOMMON' :
                                totalRarity > 0.3 && totalRarity <= 2 ? 'RARE' :
                                    totalRarity > 0.05 && totalRarity <= 0.3 ? 'EPIC' : 'LEGENDARY'}
                    </span>


                    <div style={{
                        position: "absolute",
                        top: "65px",
                        left: "350px",
                        display: "flex",
                        height: "500px",
                        width: "500px",
                        zIndex: 2,
                        backgroundColor: "black",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 200px black"
                    }}>
                    </div>
                    {/* Main content with drop shadow using filter */}
                    < div style={{
                        position: "absolute",
                        top: "15px",
                        left: "25%",
                        display: "flex",
                        height: "600px",
                        width: "600px",
                        zIndex: 3,  // Ensure content is above the background
                    }}>
                        <ImageComponent values={layers} />
                    </div >
                </div >
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error("Error generating image response:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
