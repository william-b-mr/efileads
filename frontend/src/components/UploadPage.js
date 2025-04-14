import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append('leads', file);
      setStatus('Processing...');
      await axios.post('http://localhost:3001/api/upload', formData);
      setStatus('Leads sent to bot!');
    } catch (err) {
      console.error(err);
      setStatus('Error uploading file');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5">Upload Leads</Typography>
      <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <Box p={2} border="2px dashed" {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography>
              {file ? file.name : 'Drop CSV/Excel file here or click to browse'}
            </Typography>
          </Box>
        )}
      </Dropzone>
      <Button onClick={handleUpload} disabled={!file} variant="contained" sx={{ mt: 2 }}>
        Start
      </Button>
      <Typography mt={2}>{status}</Typography>
    </Box>
  );
}

export default UploadPage;