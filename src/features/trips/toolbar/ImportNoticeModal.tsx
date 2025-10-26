import { Modal, ModalActions } from "@components";
import { FaCheck } from "react-icons/fa";

type ImportNoticeModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function ImportNoticeModal({
  onConfirm,
  onCancel,
}: ImportNoticeModalProps) {
  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="p-4">
        <p className="mb-4 text-base">
          Importing will <b>add</b> trips to your current list. Existing trips
          will not be overwritten.
        </p>
        <ModalActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitLabel="Continue"
          cancelLabel="Cancel"
          submitIcon={<FaCheck className="inline" />}
        />
      </div>
    </Modal>
  );
}
