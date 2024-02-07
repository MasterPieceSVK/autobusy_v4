import React from "react";

export default function Loading(props) {
  return (
    <div className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={170}
        height={170}
        viewBox="0 0 24 24"
        {...props}
      >
        <circle cx={18} cy={12} r={0} fill="#0d1b2a">
          <animate
            attributeName="r"
            begin="0.503s"
            calcMode="spline"
            dur="1.125s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx={12} cy={12} r={0} fill="#0d1b2a">
          <animate
            attributeName="r"
            begin="0.247s"
            calcMode="spline"
            dur="1.125s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
        <circle cx={6} cy={12} r={0} fill="#0d1b2a">
          <animate
            attributeName="r"
            begin={0}
            calcMode="spline"
            dur="1.125s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
