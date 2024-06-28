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
      <path
        d="M3 53C3 59.5661 4.29329 66.0679 6.80602 72.1342C9.31876 78.2004 13.0017 83.7124 17.6447 88.3553C22.2876 92.9983 27.7995 96.6812 33.8658 99.194C39.9321 101.707 46.4339 103 53 103C59.5661 103 66.0679 101.707 72.1342 99.194C78.2004 96.6812 83.7124 92.9983 88.3553 88.3553C92.9983 83.7124 96.6812 78.2004 99.194 72.1342C101.707 66.0679 103 59.5661 103 53C103 39.7392 97.7321 27.0215 88.3553 17.6447C78.9785 8.26784 66.2608 3 53 3C39.7392 3 27.0215 8.26784 17.6447 17.6447C8.26784 27.0215 3 39.7392 3 53Z"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 25.2223V53.0001L69.6667 69.6667"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
