type CardListProps = {
  items?: string[];
  limit?: number;
  colorClass?: string;
  moreColorClass?: string;
};

export function CardList({
  items,
  limit = 2,
  colorClass = "bg-blue-100 text-blue-800",
  moreColorClass = "bg-blue-200 text-blue-900",
}: CardListProps) {
  if (!items || items.length === 0)
    return <span className="text-gray-400 text-xs">—</span>;

  return (
    <div className="flex flex-wrap gap-1">
      {items.slice(0, limit).map((item) => (
        <span
          key={item}
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </span>
      ))}
      {items.length > limit && (
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${moreColorClass}`}
        >
          +{items.length - limit} more
        </span>
      )}
    </div>
  );
}
