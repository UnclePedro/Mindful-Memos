interface LoadingAnimationProps {
  size?: number; // Optional size prop, defaults to 20 if not provided
  color?: string; // Optional color prop, defaults to white if not provided
}

export const LoadingAnimation = ({
  size = 20,
  color = "white",
}: LoadingAnimationProps) => {
  return (
    <svg
      className="animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      style={{ color }} // Apply the color prop dynamically
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor" // Uses the current text color, set by `style={{ color }}`
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor" // Uses the current text color, set by `style={{ color }}`
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
};
