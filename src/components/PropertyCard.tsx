import React from 'react';
import { Property } from '../../types/types';
import { Box, Typography } from '@mui/material';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        maxWidth: '300px',
        margin: '0 auto',
        backgroundColor: 'white',
      }}
      onClick={onClick}
    >
      <img
        src={property.image}
        alt={property.address}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          £{property.price.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>
          {property.bedrooms} Bedrooms | {property.type}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          {property.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default PropertyCard;