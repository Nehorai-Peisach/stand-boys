import ImageComponent from "@/components/Image/Image";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "1200px",
      height: "630px",
      position: "relative"
    }}>
      {/* Background overlay with opacity */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(https://stand-boys.vercel.app/svg/0/0.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
        opacity: 0.5,  // Opacity for transparency
        zIndex: 1
      }}></div>

      {/* Main content with drop shadow using filter */}
      <div style={{
        display: "flex",
        height: "600px",
        width: "600px",
        zIndex: 2,  // Ensure content is above the background
        filter: "drop-shadow(0px 0px 100px rgba(0, 0, 0, 0.8))"  // Drop shadow effect using filter
      }}>
        <ImageComponent values={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} />
      </div>
    </div>
  );
}
