import type { ColumnKey } from "@features/trips/constants/columns";

type TableCellProps = {
  children: React.ReactNode;
  columnKey: ColumnKey;
  rowSpan?: number;
  className?: string;
  handleResizeStart: (e: React.MouseEvent, key: ColumnKey) => void;
};

export function TableCell({
  children,
  columnKey,
  rowSpan = 1,
  className = "trips-td",
  handleResizeStart,
}: TableCellProps) {
  return (
    <td className={className} rowSpan={rowSpan}>
      {children}
      <div
        className="trips-resize-handle"
        onMouseDown={(e) => handleResizeStart(e, columnKey)}
      />
    </td>
  );
}
