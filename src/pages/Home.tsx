import React, { useState } from "react";
import SwipeContainer from "../components/SwipeContainer";
import SearchFilters from "../components/SearchFilters";
import WelcomeScreen from "../components/WelcomeScreen";
import { Property } from "../../types/types";
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
  // Sample properties for the landing page

  const sampleProperties: Property[] = [
    {
      id: "1",
      image:
        "https://media.rightmove.co.uk/7k/6606/158106695/6606_33667158_IMG_00_0000.jpeg",
      price: 500000,
      bedrooms: 4,
      type: "House",
      address: "Bosham Road, Maidenbower, Crawley",
      url: "https://www.rightmove.co.uk/properties/158106695#/?channel=RES_BUY",
    },
    {
      id: "2",
      image:
        "https://media.rightmove.co.uk/5k/4276/158104682/4276_15409191-12f7-4b8b-b048-e4b226aab05f_IMG_00_0000.jpeg",
      price: 350000,
      bedrooms: 3,
      type: "House",
      address: "Findon Road, Crawley",
      url: "https://www.rightmove.co.uk/properties/158104682#/media?id=media14&ref=photoCollage&channel=RES_BUY",
    },
    {
      id: "3",
      image:
        "https://media.rightmove.co.uk/105k/104822/158148668/104822_PRA12844_IMG_00_0000.jpeg",
      price: 365000,
      bedrooms: 3,
      type: "House",
      address: "Hawkins Road, Crawley",
      url: "https://www.rightmove.co.uk/properties/158148668#/?channel=RES_BUY",
    },
    {
      id: "4",
      image:
        "https://media.rightmove.co.uk/33k/32031/157739750/32031_e25d0a31-9dc4-4333-8492-b8c39dc77445_IMG_00_0000.jpeg",
      price: 375000,
      bedrooms: 3,
      type: "Flat",
      address: "Hawkins Road, Crawley",
      url: "https://www.rightmove.co.uk/properties/157739750#/?channel=RES_BUY",
    },
    {
      id: "5",
      image:
        "https://media.rightmove.co.uk/47k/46554/158083613/46554_HOR240004_IMG_00_0000.jpeg",
      price: 800000,
      bedrooms: 4,
      type: "House",
      address: "Mount Close, Crawley",
      url: "https://www.rightmove.co.uk/properties/158083613#/?channel=RES_BUY",
    },
    {
      id: "6",
      image:
        "https://media.rightmove.co.uk/33k/32031/157720766/32031_fe0b8696-957f-445d-9acf-590f6de31e1d_IMG_00_0000.jpeg",
      price: 675000,
      bedrooms: 4,
      type: "House",
      address: "Saxon Road, Worth, Crawley",
      url: "https://www.rightmove.co.uk/properties/157720766#/?channel=RES_BUY",
    },
    {
      id: "7",
      image:
        "https://media.rightmove.co.uk/8k/7161/157607810/7161_33642337_IMG_00_0000.jpeg",
      price: 575000,
      bedrooms: 4,
      type: "House",
      address: "Ifield Green, Crawley",
      url: "https://www.rightmove.co.uk/properties/157607810#/?channel=RES_BUY",
    },
    {
      id: "8",
      image:
        "https://media.rightmove.co.uk/2k/1575/157949264/1575_20418999_IMG_00_0000.png",
      price: 500000,
      bedrooms: 4,
      type: "House",
      address: "Heathfield, Pound Hill, Crawley",
      url: "https://www.rightmove.co.uk/properties/157949624#/?channel=RES_BUY",
    },
  ];

  const handleSearch = (filters: {
    minPrice: number;
    maxPrice: number;
    minBedrooms: number;
    maxBedrooms: number;
    type: string;
  }) => {
    setSearchFilters(filters); // Save the filters
    // Fetch properties based on filters (mock data for now)
    const mockProperties: Property[] = [
      {
        id: "1",
        image:
          "https://media.rightmove.co.uk/7k/6606/158106695/6606_33667158_IMG_00_0000.jpeg",
        price: 500000,
        bedrooms: 4,
        type: "House",
        address: "Bosham Road, Maidenbower, Crawley",
        url: "https://www.rightmove.co.uk/properties/158106695#/?channel=RES_BUY",
      },
      {
        id: "2",
        image:
          "https://media.rightmove.co.uk/5k/4276/158104682/4276_15409191-12f7-4b8b-b048-e4b226aab05f_IMG_00_0000.jpeg",
        price: 350000,
        bedrooms: 3,
        type: "House",
        address: "Findon Road, Crawley",
        url: "https://www.rightmove.co.uk/properties/158104682#/media?id=media14&ref=photoCollage&channel=RES_BUY",
      },
      {
        id: "3",
        image:
          "https://media.rightmove.co.uk/105k/104822/158148668/104822_PRA12844_IMG_00_0000.jpeg",
        price: 365000,
        bedrooms: 3,
        type: "House",
        address: "Hawkins Road, Crawley",
        url: "https://www.rightmove.co.uk/properties/158148668#/?channel=RES_BUY",
      },
      {
        id: "4",
        image:
          "https://media.rightmove.co.uk/33k/32031/157739750/32031_e25d0a31-9dc4-4333-8492-b8c39dc77445_IMG_00_0000.jpeg",
        price: 375000,
        bedrooms: 3,
        type: "Flat",
        address: "Hawkins Road, Crawley",
        url: "https://www.rightmove.co.uk/properties/157739750#/?channel=RES_BUY",
      },
      {
        id: "5",
        image:
          "https://media.rightmove.co.uk/47k/46554/158083613/46554_HOR240004_IMG_00_0000.jpeg",
        price: 800000,
        bedrooms: 4,
        type: "House",
        address: "Mount Close, Crawley",
        url: "https://www.rightmove.co.uk/properties/158083613#/?channel=RES_BUY",
      },
      {
        id: "6",
        image:
          "https://media.rightmove.co.uk/33k/32031/157720766/32031_fe0b8696-957f-445d-9acf-590f6de31e1d_IMG_00_0000.jpeg",
        price: 675000,
        bedrooms: 4,
        type: "House",
        address: "Saxon Road, Worth, Crawley",
        url: "https://www.rightmove.co.uk/properties/157720766#/?channel=RES_BUY",
      },
      {
        id: "7",
        image:
          "https://media.rightmove.co.uk/8k/7161/157607810/7161_33642337_IMG_00_0000.jpeg",
        price: 575000,
        bedrooms: 4,
        type: "House",
        address: "Ifield Green, Crawley",
        url: "https://www.rightmove.co.uk/properties/157607810#/?channel=RES_BUY",
      },
      {
        id: "8",
        image:
          "https://media.rightmove.co.uk/2k/1575/157949264/1575_20418999_IMG_00_0000.png",
        price: 500000,
        bedrooms: 4,
        type: "House",
        address: "Heathfield, Pound Hill, Crawley",
        url: "https://www.rightmove.co.uk/properties/157949624#/?channel=RES_BUY",
      },
    ];

    // Filter properties based on search parameters
    const filteredProperties = mockProperties.filter((property) => {
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
                style={{ width: "250px", height: "auto", maxWidth: "100%" }}
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
