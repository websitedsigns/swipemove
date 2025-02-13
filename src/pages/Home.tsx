import React, { useState, useEffect } from "react";
import SwipeContainer from "../components/SwipeContainer";
import SearchFilters from "../components/SearchFilters";
import WelcomeScreen from "../components/WelcomeScreen";
import { Property } from "../../types/types";
import { sampleProperties } from "../data/propertyData";
import {
  IconButton,
  Button,
  Box,
  Badge,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropertyCard from "../components/PropertyCard";
import "./Home.css";
import logo from "../assets/SwipeMove-3.png";
import LoginModal from "../components/LoginModal"; // Import the updated LoginModal
import RegisterModal from "../components/RegisterModal"; // Import the RegisterModal

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
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State for register modal
  const [user, setUser] = useState<{ name: string } | null>(null); // Store user info (null = not logged in)

  // Handle login success
  const handleLogin = (userName: string) => {
    setUser({ name: userName });
    localStorage.setItem("userName", userName); // Save user name to localStorage
    setShowLoginModal(false);
  };

  // Handle register success
  const handleRegister = (userName: string) => {
    handleLogin(userName); // Use the same handler for registering and logging in
    setShowRegisterModal(false); // Close the register modal after registration
  };

  useEffect(() => {
    // Check if there's a user name stored in localStorage on component mount
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUser({ name: storedUserName });
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userName"); // Clear user name from localStorage
  };

  const handleSearch = (filters: {
    minPrice: number;
    maxPrice: number;
    minBedrooms: number;
    maxBedrooms: number;
    type: string;
  }) => {
    setSearchFilters(filters); // Save the filters
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

  const handleLikedPropertiesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

            {/* Liked Properties and User Authentication */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton onClick={handleLikedPropertiesClick}>
                <Badge badgeContent={likedProperties.length} color="primary">
                  <AccountCircleIcon />
                </Badge>
              </IconButton>
              {!user ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#5DC2BB", color: "white" }}
                  onClick={() => setShowLoginModal(true)} // Show login modal
                >
                  Sign In / Register
                </Button>
              ) : (
                <>
                  <Typography variant="h6">{user.name}</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF5F5F",
                      color: "white",
                    }}
                    onClick={handleLogout} // Log out user
                  >
                    Sign Out
                  </Button>
                </>
              )}
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

          {/* Login Modal */}
          <LoginModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin} // Pass the onLogin handler to the LoginModal
          />

          {/* Register Modal */}
          <RegisterModal
            open={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
            onRegister={handleRegister} // Use handleRegister for registration
          />

          {/* Main Content */}
          <Box sx={{ marginTop: "80px" }}>
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
