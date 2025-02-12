import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import './SearchFilters.css';

interface SearchFiltersProps {
  onSearch: (filters: { minPrice: number; maxPrice: number; minBedrooms: number; maxBedrooms: number; type: string }) => void;
  onClose: () => void; // Function to close the modal
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch, onClose }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState(0);
  const [type, setType] = useState('');

  const handleSearch = () => {
    onSearch({ minPrice, maxPrice, minBedrooms, maxBedrooms, type });
  };

  // Generate price options in £10k increments
  const priceOptions = [];
  for (let i = 0; i <= 1000000; i += 10000) {
    priceOptions.push(i);
  }

  // Generate bedroom options
  const bedroomOptions = [0, 1, 2, 3, 4, 5];

  // Property type options
  const propertyTypes = ['House', 'Flat', 'Terrace'];

  return (
    <Box className="search-filters-container">
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" className="search-filters-title" gutterBottom>
        Search Properties
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        {/* Min Price */}
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Min Price
          </Typography>
          <FormControl fullWidth className="search-filters-form-control">
            <Select
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            >
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  £{price.toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Max Price */}
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Max Price
          </Typography>
          <FormControl fullWidth className="search-filters-form-control">
            <Select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            >
              {priceOptions.map((price) => (
                <MenuItem key={price} value={price}>
                  £{price.toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Min Bedrooms */}
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Min Bedrooms
          </Typography>
          <FormControl fullWidth className="search-filters-form-control">
            <Select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(Number(e.target.value))}
            >
              {bedroomOptions.map((bedrooms) => (
                <MenuItem key={bedrooms} value={bedrooms}>
                  {bedrooms}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Max Bedrooms */}
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Max Bedrooms
          </Typography>
          <FormControl fullWidth className="search-filters-form-control">
            <Select
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(Number(e.target.value))}
            >
              {bedroomOptions.map((bedrooms) => (
                <MenuItem key={bedrooms} value={bedrooms}>
                  {bedrooms}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Property Type */}
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: '300px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Property Type
          </Typography>
          <FormControl fullWidth className="search-filters-form-control">
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as string)}
            >
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Search Button */}
      <Button
        variant="contained"
        onClick={handleSearch}
        className="search-filters-button"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchFilters;