import type { ComponentPropsWithoutRef } from 'react';

export type LogoSvgProps = ComponentPropsWithoutRef<'svg'> & { size?: number };

export const LogoSvg = ({ size = 32, ...props }: LogoSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2033_49)">
        <path
          d="M53 103C53 109.566 54.2933 116.068 56.806 122.134C59.3188 128.2 63.0017 133.712 67.6447 138.355C72.2876 142.998 77.7995 146.681 83.8658 149.194C89.9321 151.707 96.4339 153 103 153C109.566 153 116.068 151.707 122.134 149.194C128.2 146.681 133.712 142.998 138.355 138.355C142.998 133.712 146.681 128.2 149.194 122.134C151.707 116.068 153 109.566 153 103C153 89.7392 147.732 77.0215 138.355 67.6447C128.979 58.2678 116.261 53 103 53C89.7392 53 77.0215 58.2678 67.6447 67.6447C58.2678 77.0215 53 89.7392 53 103Z"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M103 75.2223V103L119.667 119.667"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2033_49"
          x="0.5"
          y="0.5"
          width="205"
          height="205"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.101961 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2033_49"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2033_49"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
