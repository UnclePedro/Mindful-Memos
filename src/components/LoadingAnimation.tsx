interface LoadingAnimationProps {
  size?: number; // Optional size prop, defaults to 20 if not provided
}

export const LoadingAnimation = ({ size = 20 }: LoadingAnimationProps) => {
  return (
    <svg
      className="animate-spin text-white"
      fill="none"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
};
