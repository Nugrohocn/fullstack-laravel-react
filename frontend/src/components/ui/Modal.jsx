import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
                    <button
                        className="absolute top-4 left-4 text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-gray-700"
                        onClick={onClose}
                    >
                        <IoClose size={24} />
                    </button>

                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
