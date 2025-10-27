'use client'
import { Box, Typography } from "@mui/material";
import { setCookie } from "cookies-next";

setCookie('from_signin', 'false')

const page = () => {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      padding: '5px',

    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'start',
        width: '100%',
      }}>
        <Typography style={{
          fontSize: '20px',
          color: '#212121',
          paddingBottom: '10px',
          fontFamily: 'Neue Kaine',

        }}>
          Seja bem-vindo à RUKE!
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      }}>

      </Box>

    </Box>
  )
}

export default page;