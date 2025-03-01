import { FiTrash2 } from "react-icons/fi";

const RemovePhotoButton = ({ onRemove }) => {
  return (
    <button
      onClick={onRemove}
      className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
      title="Remove photo"
    >
      <FiTrash2 className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default RemovePhotoButton; 