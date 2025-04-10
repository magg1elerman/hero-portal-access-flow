
import { SVGProps } from "react";

const HaulerHeroLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 10C18.95 10 10 18.95 10 30C10 41.05 18.95 50 30 50C41.05 50 50 41.05 50 30C50 18.95 41.05 10 30 10Z"
        fill="#0B6E4F"
      />
      <path
        d="M30 15C21.7 15 15 21.7 15 30C15 38.3 21.7 45 30 45C38.3 45 45 38.3 45 30C45 21.7 38.3 15 30 15Z"
        fill="white"
      />
      <path
        d="M26 22L26 38"
        stroke="#0B6E4F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 22L34 38"
        stroke="#0B6E4F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M26 30L34 30"
        stroke="#0B6E4F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M65 20H70V40H65V20Z"
        fill="#0B6E4F"
      />
      <path
        d="M75 20H80V28H88V20H93V40H88V33H80V40H75V20Z"
        fill="#0B6E4F"
      />
      <path
        d="M100 40V20H115V25H105V27.5H113V32.5H105V35H115V40H100Z"
        fill="#0B6E4F"
      />
      <path
        d="M122 20H127V28H132L137 20H143L136 30L143 40H137L132 32H127V40H122V20Z"
        fill="#0B6E4F"
      />
      <path
        d="M150 40V20H165V25H155V27.5H163V32.5H155V35H165V40H150Z"
        fill="#0B6E4F"
      />
      <path
        d="M170 20H175V35H185V40H170V20Z"
        fill="#0B6E4F"
      />
      <path
        d="M190 20H185V40H190V20Z"
        fill="#0B6E4F"
      />
    </svg>
  );
};

export default HaulerHeroLogo;
