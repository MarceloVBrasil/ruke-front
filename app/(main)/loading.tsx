import { Box } from "@mui/material";
import Image from "next/image";

export default function Loading() {
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 900000,
      opacity: 0.8,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',

    }}>
      <Image src="https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png"
        width={600}
        height={800}
        alt="logo"
        style={{ width: '100%', animation: 'blink 2.8s', animationIterationCount: 'infinite', objectFit: 'contain', maxWidth: '600px' }}
      />
    </Box>
  );
}