interface PopupProps {
  onClose: () => void;
}

const Popup = ({ onClose }: PopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Popup box */}
      <div className="bg-white rounded-xl p-6 w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Popup Title</h2>
        <p className="text-gray-600">This is a Tailwind popup.</p>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
