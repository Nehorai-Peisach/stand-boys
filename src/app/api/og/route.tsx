import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import ImageComponent from "@/components/Image/Image";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const layers = Array.from({ length: 8 }, (_, i) => {
        return Number(searchParams.get(`layer${i}`)) || 0;
    });

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
                    <div style={{
                        position: "absolute",
                        top: "15px",
                        left: "25%",
                        display: "flex",
                        height: "600px",
                        width: "600px",
                        zIndex: 3,  // Ensure content is above the background
                    }}>
                        <ImageComponent values={layers} />
                    </div>
                </div>
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
