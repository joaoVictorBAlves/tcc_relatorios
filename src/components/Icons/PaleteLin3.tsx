const PaleteLin3 = () => {
  return (
    <svg
      width="355"
      height="18"
      viewBox="0 0 355 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2324_392)">
        <path
          d="M4 8C4 5.79086 5.79086 4 8 4H347.001C349.21 4 351.001 5.79086 351.001 8V10C351.001 12.2091 349.21 14 347.001 14H8C5.79086 14 4 12.2091 4 10V8Z"
          fill="url(#paint0_linear_2324_392)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2324_392"
          x="2"
          y="2"
          width="351.001"
          height="14"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.101961 0 0 0 0 0.211765 0 0 0 0 0.486275 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2324_392"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2324_392"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2324_392"
          x1="4"
          y1="9"
          x2="351.001"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0559088" stop-color="#EDF4FC" />
          <stop offset="0.425" stop-color="#74B3D7" />
          <stop offset="0.925909" stop-color="#08326E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PaleteLin3;
