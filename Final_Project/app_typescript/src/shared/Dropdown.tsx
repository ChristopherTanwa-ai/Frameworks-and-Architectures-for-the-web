import clsx from "clsx";
import React, { ReactNode } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

type DropdownComponentProps = {
    title: string;
    onClick: () => void;
    isOpen: boolean;
    children: ReactNode;
}

const Dropdown: React.FC<DropdownComponentProps> = ({
    title,
    onClick,
    isOpen,
    children,
}) => {
    return (
        <div className="inline-flex bg-white border rounded-md">
            <button
                onClick={onClick}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
            >
                {title}
            </button>

            <div className="relative">
                <button
                    // type="button"
                    onClick={onClick}
                    className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
                >
                    {!isOpen ? <AiOutlineDown /> : <AiOutlineUp />}
                </button>

                <div className={clsx(
                    { "hidden": !isOpen },
                    "absolute right-0 z-10 w-60 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg")
                }>
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

type DropdownItemProps = {
    title: string;
    select: (data: string) => void;
    checked?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ title, select, checked }) => {
    return (
        <button
            onClick={() => select(title)}
            className="w-full block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 text-start"
        >
            {title}
            <input type="checkbox" className="float-right" checked={checked} />
        </button>
    )
}

export default Dropdown;