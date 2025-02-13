import React, { useState } from "react";
import SwipeContainer from "../components/SwipeContainer";
import SearchFilters from "../components/SearchFilters";
import WelcomeScreen from "../components/WelcomeScreen";
import { Property } from "../../types/types";
import { sampleProperties } from "../data/propertyData"; 

import {
  IconButton,
  Button,
  Box,
  Typography,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropertyCard from "../components/PropertyCard";
import "./Home.css";
import logo from "../assets/SwipeMove-3.png";

const Home: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [likedProperties, setLikedProperties] = useState<Property[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    minBedrooms: 0,
    maxBedrooms: 0,
    type: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For liked properties dropdown

  const handleSearch = (filters: {
    minPrice: number;
    maxPrice: number;
    minBedrooms: number;
    maxBedrooms: number;
    type: string;
  }) => {
    setSearchFilters(filters); // Save the filters
    // Simulate the filtering of sampleProperties based on search filters
    const filteredProperties = sampleProperties.filter((property) => {
      return (
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice &&
        property.bedrooms >= filters.minBedrooms &&
        property.bedrooms <= filters.maxBedrooms &&
        (filters.type === "" ||
          property.type.toLowerCase() === filters.type.toLowerCase())
      );
    });
    setProperties(filteredProperties);
    setShowSearchModal(false); // Close the modal after searching
  };

  const handleSwipeLeft = (property: Property) => {
    console.log("Swiped left:", property);
  };

  const handleSwipeRight = (property: Property) => {
    setLikedProperties((prev) => [...prev, property]);
  };

  // Handle opening the liked properties dropdown
  const handleLikedPropertiesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the liked properties dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {showWelcome ? (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1px 20px",
              backgroundColor: "#f5f5f5",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            {/* Logo and Search Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <IconButton onClick={() => setShowSearchModal(true)}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={logo}
                alt="SwipeMove Logo"
                style={{ width: "150px", height: "auto", maxWidth: "100%" }}
              />
            </Box>

            {/* Liked Properties and Sign-In/Log-In */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton onClick={handleLikedPropertiesClick}>
                <Badge badgeContent={likedProperties.length} color="primary">
                  <AccountCircleIcon />
                </Badge>
              </IconButton>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#5DC2BB", color: "white" }}
              >
                Sign In / Log In
              </Button>
            </Box>
          </Box>

          {/* Liked Properties Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {likedProperties.map((property) => (
              <MenuItem key={property.id} onClick={handleClose}>
                <PropertyCard
                  property={property}
                  onClick={() => window.open(property.url, "_blank")}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* Search Modal */}
          {showSearchModal && (
            <SearchFilters
              onSearch={handleSearch}
              onClose={() => setShowSearchModal(false)}
            />
          )}

          {/* Main Content */}
          <Box sx={{ marginTop: "80px" }}>
            {" "}
            {/* Add margin to avoid overlap with the header */}
            {properties.length > 0 ? (
              <SwipeContainer
                properties={properties}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            ) : (
              <Box className="landing-page">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#5DC2BB",
                    color: "white",
                    marginTop: "20px",
                  }}
                  onClick={() => setProperties(sampleProperties)}
                >
                  Start Swiping
                </Button>
                <Box className="sample-properties">
                  {sampleProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onClick={() => window.open(property.url, "_blank")}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default Home;
