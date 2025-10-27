import { Separator } from "@components";

export function SeparatorRow() {
  return (
    <tr>
      <td colSpan={2}>
        <Separator className="my-4" />
      </td>
    </tr>
  );
}