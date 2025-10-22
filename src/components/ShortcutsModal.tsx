import React from "react";
import { FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ActionButton, Modal, PanelHeader } from "@components";
import { categoryColumns, keyCommands } from "@config/keyCommands";
import { useUI } from "@contexts/UIContext";
import type { KeyCommand } from "@types";

// Helper to render arrow icons for arrow keys
function renderKey(key: string) {
  switch (key) {
    case "ArrowUp":
      return <FaArrowUp className="inline-block align-middle" />;
    case "ArrowDown":
      return <FaArrowDown className="inline-block align-middle" />;
    default:
      return key.length === 1 ? key.toLowerCase() : key;
  }
}

// Helper to render modifier icons
function renderModifier(mod: string) {
  switch (mod) {
    case "Shift":
      return <span className="inline-block align-middle">⇧</span>;
    default:
      return mod[0] + mod.slice(1);
  }
}

// Group shortcuts by category
const groupedCommands = keyCommands.reduce((acc, cmd) => {
  acc[cmd.category] = acc[cmd.category] || [];
  acc[cmd.category].push(cmd);
  return acc;
}, {} as Record<string, KeyCommand[]>);

export function ShortcutsModal() {
  const { showShortcuts, closeShortcuts } = useUI();

  return (
    <Modal
      isOpen={showShortcuts}
      onClose={closeShortcuts}
      position="center"
      className="min-w-[900px] max-w-[1200px] max-h-[90vh] bg-white rounded-xl shadow-2xl p-4 overflow-y-auto"
    >
      <PanelHeader
        title={
          <>
            <span className="mr-2">⌨️</span>
            Keyboard Shortcuts
          </>
        }
      >
        <ActionButton onClick={closeShortcuts} ariaLabel="Close" title="Close">
          <FaTimes />
        </ActionButton>
      </PanelHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {categoryColumns.map((categories, colIdx) => (
          <div key={colIdx} className="w-full">
            {categories.map((category) =>
              groupedCommands[category] ? (
                <div key={category} className="mb-6">
                  <div className="text-lg font-bold mb-2 text-left">
                    {category}
                  </div>
                  <table className="w-full mx-auto text-left">
                    <tbody>
                      {/* Render each command in the category */}
                      {groupedCommands[category].map((cmd) => (
                        <tr key={cmd.key + cmd.modifiers.join("+")}>                          
                          <td className="py-2 pr-6 min-w-[90px]">
                            {/* Render modifiers and key */}
                            <span className="inline-flex gap-2 justify-center">
                              {cmd.modifiers.map((m: string, i) => (
                                <React.Fragment key={m}>
                                  <kbd className="px-2 py-1 bg-gray-200 border border-gray-400 rounded text-sm font-mono shadow text-gray-800 select-none dark:text-gray-200 dark:bg-gray-600 dark:border-gray-500">
                                    {renderModifier(m)}
                                  </kbd>
                                  {/* Add + between modifiers and before the key */}
                                  <span className="px-1 text-gray-600 dark:text-gray-400 select-none">
                                    {i === cmd.modifiers.length - 1 ? "+" : ""}
                                  </span>
                                </React.Fragment>
                              ))}
                              <kbd className="px-2 py-1 bg-gray-200 border border-gray-400 rounded text-sm font-mono shadow text-gray-800 select-none dark:text-gray-200 dark:bg-gray-600 dark:border-gray-500">
                                {renderKey(cmd.key)}
                              </kbd>
                            </span>
                          </td>
                          <td className="py-1 text-sm text-gray-700 select-none">
                            {cmd.action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
