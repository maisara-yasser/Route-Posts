import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

type DropDownCommProps = {
    commentCreatorId: string;
    currentUserId: string;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
};

export default function DropDownComm({commentCreatorId, currentUserId, onEdit, onDelete, isDeleting = false,}: DropDownCommProps) {
    const [isOpen, setIsOpen] = useState(false);
    if (commentCreatorId !== currentUserId) return null;

    function handleEdit() {
        setIsOpen(false);
        onEdit();
    }

    function handleDelete() {
        setIsOpen(false);
        onDelete();
    }

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                aria-label="Comment options"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
                className="cursor-pointer rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx={12} cy={12} r={1} />
                    <circle cx={19} cy={12} r={1} />
                    <circle cx={5} cy={12} r={1} />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-40 rounded-md bg-white shadow-lg">
                    <div className="p-2">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
                        >
                            <CiEdit />
                            Edit comment
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-red-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RiDeleteBinLine />
                            {isDeleting ? "Deleting..." : "Delete comment"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}