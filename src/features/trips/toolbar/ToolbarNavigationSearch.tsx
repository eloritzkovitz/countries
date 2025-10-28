import { FaArrowLeft } from "react-icons/fa6";
import { ActionButton, SearchInput } from "@components";

type ToolbarNavigationSearchProps = {
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
};

export function ToolbarNavigationSearch({  
  globalSearch,
  setGlobalSearch,
}: ToolbarNavigationSearchProps) {
  
  // Return button handler 
  const handleReturn = () => {
    window.history.back();
  };
  
  return (
    <>
      <ActionButton
        onClick={handleReturn}
        ariaLabel="Return"
        title="Return"
        className="toolbar-btn-menu"
        icon={<FaArrowLeft />}
      />
      <div className="mx-2">
        <SearchInput
          value={globalSearch}
          onChange={setGlobalSearch}
          placeholder="Search all trips..."
          className="w-64 h-8 rounded-full"
        />
      </div>
    </>
  );
}
