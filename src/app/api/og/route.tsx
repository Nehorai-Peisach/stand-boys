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
                }}>
                    <ImageComponent values={layers} />
                </div>
            ),
            {
                width: 200,
                height: 200,
            }
        );
    } catch (error) {
        console.error("Error generating image response:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
