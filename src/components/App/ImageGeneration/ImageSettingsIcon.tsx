import React from 'react';

/* interface ImageSettingsIconProps extends React.SVGProps<SVGSVGElement> {
  [key: string]: any;
} */

const ImageSettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ children, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      fill="currentColor"
      stroke="currentColor"
      width="24"
      height="24"
      {...props}
    >
      <path d="M423 133v-3H305a37 37 0 0 1-28-12 37 37 0 0 1-12-28V17H125l-18 3-14 10a49 49 0 0 0-14 33v374c0 7 2 13 4 18 2 6 5 11 10 15a49 49 0 0 0 32 13h191v18H125a63 63 0 0 1-58-39c-3-7-5-16-5-24V62a63 63 0 0 1 39-58c7-3 15-5 24-5h137c6 0 12 1 18 4 6 2 11 5 16 10l65 43 66 43a48 48 0 0 1 14 34l-1 131h-18Zm-8-20v-1l-1-1-130-86h-1l-1-1v66l2 9a20 20 0 0 0 12 12l9 2Zm-311 15a43 43 0 0 1 20-35c7-4 14-5 20-5 7 0 14 1 20 5a43 43 0 0 1 20 35c0 7-2 14-5 20-4 6-9 11-15 15-6 3-13 5-20 5-6 0-13-2-20-5a43 43 0 0 1-20-35Zm24 16 7 4 9 2 9-2a20 20 0 0 0 12-11l2-9-2-9a20 20 0 0 0-12-12l-9-2-9 2a20 20 0 0 0-11 12l-2 9 2 9 4 7Zm94 122-3 3h-4l-4-1-3-2-29-35-31 42-32 43-2 2v3l1 4a8 8 0 0 0 4 4l4 1h156c-3 6-6 11-8 18h-33l-115-1-11-2-8-5-5-8-3-11a29 29 0 0 1 5-16l65-85 6-5c2-2 5-2 7-2a18 18 0 0 1 14 6l11 14 11 13 22-32 23-33 6-6 7-1 8 1 6 6 44 62 14 21h-21l-7-10-44-62-25 37Z" />
      <g transform="translate(-4 182) scale(1.08431)" style="transform-origin:242.01px -364.458px">
        <path d="M386 50h-5c-11 0-21 9-21 21v2c0 7-4 14-10 18l-5 2c-6 4-14 4-20 0h-2c-10-6-23-3-28 7l-3 4c-5 10-2 23 8 28l1 2c7 3 11 10 11 17v6c0 7-4 14-11 18l-1 1c-10 6-13 18-8 28l3 4c5 10 18 13 28 8l2-1c6-4 14-4 20 0l5 2c6 4 10 11 10 18v2c0 12 10 21 21 21h5c11 0 20-9 20-21v-2c0-7 4-14 11-18l4-2c7-4 15-4 21 0l2 1c10 5 22 2 28-8l2-4c6-10 3-23-7-28l-2-1c-6-4-10-11-10-18v-5c0-8 4-15 10-19l2-1c10-5 13-18 7-28l-2-4c-6-10-18-13-28-7h-2c-6 4-14 4-21 0l-4-2c-7-4-11-11-11-18v-2c0-12-9-21-20-21Z" style="paint-order:fill;fill:transparent;stroke-width:20px" />
        <circle cx="383.3" cy="154.1" r="31.2" style="paint-order:fill;fill:transparent;stroke-width:14px" />
      </g>
      {children}
    </svg>
  );
};

export default ImageSettingsIcon;
