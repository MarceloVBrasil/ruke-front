import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import Image from "next/image";

export type DragDropDocumentProps = {
  title: string;
  nameInput: string;
  formData: FormData;
  disabled?: boolean
}
export const DragDropDocument = ({ title, nameInput, formData, disabled }: DragDropDocumentProps) => {
  const [filesView, setFilesView] = useState([])
  const onDrop = useCallback((acceptedFiles: any[]) => {

    const allPreviews: any = []
    acceptedFiles.forEach((file: any) => {
      formData.append(nameInput, file)
      const preview = Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
      allPreviews.push(preview)
    })

    setFilesView(allPreviews)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })
  return (
    <Grid item  {...{ ...(disabled ? {} : getRootProps({ refKey: 'innerRef' })) }} sx={{ cursor: disabled ? 'default' : 'pointer', boxShadow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '250px', margin: '5px', borderRadius: '10px', width: '220px' }}>
      <Box sx={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: '#7ab0f1' }}>
        <Typography style={{ color: 'white', fontWeight: '600', fontSize: '15px', textAlign: 'center', }} >
          {title}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: isDragActive ? '#509bf7' : '', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <CloudUploadIcon sx={{ color: isDragActive ? 'white' : '#509bf7', fontSize: '70px' }} />
        <input
          {...getInputProps({ name: nameInput })}

        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#89b9f3', overflow: 'hidden', width: '100%', height: '50px' }}>
        <Box sx={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden', }}>
          {filesView.map((preview: any, index) => (
            <Box key={index} sx={{ marginTop: '10px', marginLeft: '4px' }}>
              {preview.type.startsWith('image/') && (
                <Image src={preview.preview} width={40} height={40} alt="logo" />
              )}
              {!preview.type.startsWith('image/') && (
                <DocumentScannerIcon sx={{ color: 'white', fontSize: '40px' }} />
              )}
            </Box>
          ))}
          {filesView.length === 0 && <Typography sx={{ width: '100%', textAlign: 'center', color: 'white', fontSize: '15px', fontWeight: '600' }}>{disabled ? 'Em Breve' : 'Nenhum arquivo selecionado'}</Typography>}
        </Box>
      </Box>
    </Grid>
  )
}
