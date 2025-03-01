import { FiEdit2 } from "react-icons/fi";

const EditPhotoButton = ({ onEdit, fileInputRef, onFileChange }) => {
  return (
    <>
      <button
        onClick={onEdit}
        className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Edit photo"
      >
        <FiEdit2 className="w-4 h-4 text-gray-600" />
      </button>
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
    </>
  );
};

export default EditPhotoButton; 