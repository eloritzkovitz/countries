import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

type VisitedStatusIndicatorProps = {
  visited: boolean;
  className?: string;
};

export function VisitedStatusIndicator({
  visited,
  className = "",
}: VisitedStatusIndicatorProps) {
  return visited ? (
    <FaCircleCheck
      className={`w-5 h-5 ${className}`}
      color="#22c55e"
      title="Visited"
      aria-label="Visited"
    />
  ) : (
    <FaCircleXmark
      className={`w-5 h-5 ${className}`}
      color="#d1d5db"
      title="Not visited"
      aria-label="Not visited"
    />
  );
}
