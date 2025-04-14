import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

function SalesDashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/leads?status=Ready for Sales`)
      .then(res => setLeads(res.data));
  }, []);

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Typography variant="h4" mb={3}>Ready for Sales</Typography>
      {leads.length === 0 && <Typography>No leads ready yet.</Typography>}
      {leads.map(lead => (
        <Box key={lead.phone} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
          <Typography variant="h6">{lead.name}</Typography>
          <Typography>Car: {lead.carBrand} {lead.carModel} ({lead.carYear})</Typography>
          {lead.setupPhoto && <img src={lead.setupPhoto} alt="Setup" width="100" />}
          <Typography>Installation: {lead.installation || 'N/A'}</Typography>
          <Typography>Location: {lead.location || 'N/A'}</Typography>
          <Button
            href={`https://wa.me/${lead.phone}`}
            target="_blank"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Message on WhatsApp
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default SalesDashboard;