
'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top-btn" title="Go to top">
          <div className="text">
            <span>Back</span>
            <span>to</span>
            <span>Top</span>
          </div>
          <div className="clone">
            <span>Back</span>
            <span>to</span>
            <span>Top</span>
          </div>
          <ArrowUp />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;

    