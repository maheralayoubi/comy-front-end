import { useState, useEffect, useCallback } from "react";
const safeSetStyle = (selector, property, value) => {
  try {
    const element = document.querySelector(selector);
    if (element) {
      element.style[property] = value;
    }
  } catch (error) {
    console.error(`Error setting style for ${selector}:`, error);
  }
};
const useResponsiveLayout = (selectedChatId, setSelectedUserId, setShowSheet) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);


  const updateLayout = useCallback(
    (isMobile, currentSelectedUserId) => {
      if (isMobile) {
        if (currentSelectedUserId) {
          safeSetStyle(".sidebar", "display", "none");
          safeSetStyle(".mainChat", "display", "flex");
          safeSetStyle(".profileDisplay", "display", "none");
        } else {
          safeSetStyle(".sidebar", "display", "block");
          safeSetStyle(".mainChat", "display", "none");
          safeSetStyle(".profileDisplay", "display", "flex");
        }
      } else {
        safeSetStyle(".sidebar", "display", "block");
        safeSetStyle(".mainChat", "display", "flex");
        safeSetStyle(".profileDisplay", "display", "flex");
      }
    },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 991;
      setIsMobileView(isMobile);
      updateLayout(isMobile, selectedChatId);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedChatId, updateLayout]);

  useEffect(() => {
    if (isMobileView) {
      updateLayout(true, selectedChatId);
    }
  }, [selectedChatId, isMobileView, updateLayout]);

  const handleSelectUserMobile = useCallback(() => {
    if (isMobileView) {
      updateLayout(true, true);
    }
  }, [isMobileView, updateLayout]);

  const handleBackToListMobile = useCallback(() => {
    if (isMobileView) {
      setSelectedUserId(null);
      updateLayout(true, null);
      setShowSheet(false)
    }
  }, [isMobileView, updateLayout, setSelectedUserId]);

  return {
    isMobileView,
    handleSelectUserMobile,
    handleBackToListMobile,
  };
};

export default useResponsiveLayout;