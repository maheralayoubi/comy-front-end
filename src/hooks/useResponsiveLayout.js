import { useState, useEffect, useCallback } from "react";
const safeSetStyle = (selector, property, value) => {
  try {
    const element = document.querySelector(selector);
    if (element) {
      element.style[property] = value;
    } else {
    }
  } catch (error) {
  }
};
const useResponsiveLayout = (selectedUserId, setSelectedUserId) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);
  const updateLayout = useCallback((isMobile, currentSelectedUserId) => {
    if (isMobile) {
      if (currentSelectedUserId) {
        safeSetStyle(".sidebar", "display", "none");
        safeSetStyle(".mainChat", "display", "flex");
        safeSetStyle(".profileDisplay", "display", "none");
      } else {
        safeSetStyle(".sidebar", "display", "block");
        safeSetStyle(".mainChat", "display", "none");
        safeSetStyle(".profileDisplay", "display", "none");
      }
    } else {
      safeSetStyle(".sidebar", "display", "block");
      safeSetStyle(".mainChat", "display", "flex");
      safeSetStyle(".profileDisplay", "display", "flex");
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 991;
      setIsMobileView(isMobile);
      updateLayout(isMobile, selectedUserId);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedUserId, updateLayout]);
  useEffect(() => {
    if (isMobileView) {
      updateLayout(true, selectedUserId);
    }
  }, [selectedUserId, isMobileView, updateLayout]);
  const handleSelectUserMobile = useCallback(() => {
    if (isMobileView) {
      updateLayout(true, true);
    }
  }, [isMobileView, updateLayout]);
  const handleBackToListMobile = useCallback(() => {
    if (isMobileView) {
      updateLayout(true, null);
    }
  }, [isMobileView,  updateLayout]);
  return {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile,
  };
};
export default useResponsiveLayout;
