import React from 'react';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1-3.3-1.4c-1.4 1-3.3 1.4-3.3 1.4s-2.1-.4-3.3-1.4c-1.4-1.4-2.8-3.3-2.8-3.3s.4.1 1.4.4c-2.1-.4-4.4-3.3-4.4-3.3s1.4 1.4 3.3 2.1c-2.1-1.4-3.3-3.3-3.3-3.3s3.3 1.4 6.1 4.4C14.1 6.1 17 4 17 4z" />
  </svg>
);

export default TwitterIcon;
