type ImportNoticeModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function ImportNoticeModal({
  onConfirm,
  onCancel,
}: ImportNoticeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow">
        <p>
          Importing will <b>add</b> trips to your current list. Existing trips
          will not be overwritten.
        </p>
        <div className="flex gap-2 mt-4">
          <button className="btn" onClick={onConfirm}>
            Continue
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
