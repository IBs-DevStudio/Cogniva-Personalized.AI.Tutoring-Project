'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

const MobileWarningModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check screen size
      const isSmallScreen = window.innerWidth < 768;
      
      // Check user agent for mobile devices
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(navigator.userAgent);
      
      // Check if touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const shouldShowWarning = isSmallScreen || (isMobileDevice && isTouchDevice);
      
      setIsMobile(shouldShowWarning);
      setShowModal(shouldShowWarning);
    };

    checkDevice();
    
    // Listen for window resize
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleContinue = () => {
    setShowModal(false);
    // Store user preference to not show again in this session
    sessionStorage.setItem('mobileWarningDismissed', 'true');
  };

  // Don't show modal if user already dismissed it in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('mobileWarningDismissed');
    if (dismissed) {
      setShowModal(false);
    }
  }, []);

  if (!showModal || !isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-4xl shadow-2xl max-w-md w-full mx-4 p-6 relative animate-in fade-in-50 zoom-in-95 duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Better Experience Awaits
          </h2>
          <p className="text-gray-600 text-sm">
            Cogniva by Ikram Banadar is optimized for desktop and tablet experiences
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Monitor className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Optimal on Desktop & Tablets</h3>
              <p className="text-gray-600 text-xs">
                Full features, voice interactions, and seamless navigation work best on larger screens
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Mobile Users</h3>
              <p className="text-gray-600 text-xs">
                Switch to desktop mode in your browser for the complete experience
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Mode Instructions */}
        <div className="bg-gray-50 rounded-3xl p-4 mb-6">
          <p className="text-xs text-gray-700 font-medium mb-2">
            📱 Enable Desktop Mode:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Chrome/Safari: Tap menu → "Request Desktop Site"</li>
            <li>• Firefox: Tap menu → "Desktop site"</li>
            <li>• Edge: Tap menu → "Request desktop site"</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-3xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Cogniva
          </button>
          
          <p className="text-center text-xs text-gray-500">
            You can still use Cogniva, but some features may be limited on mobile
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-orange-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  );
};

export default MobileWarningModal;