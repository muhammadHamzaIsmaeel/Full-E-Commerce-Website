// src/components/Notification.tsx
import React, { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'; // Install: npm install @heroicons/react

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onClose]);

    let backgroundColor = 'bg-green-100 border-green-500 text-green-700'; // Default success color
    let icon = <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />;

    if (type === 'error') {
        backgroundColor = 'bg-red-100 border-red-500 text-red-700';
        icon = <ExclamationCircleIcon className="h-6 w-6 text-red-500 mr-2" />;
    } else if (type === 'info') {
        backgroundColor = 'bg-blue-100 border-blue-500 text-blue-700';
        icon = <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />;
    } else if (type === 'warning') {
        backgroundColor = 'bg-yellow-100 border-yellow-500 text-yellow-700';
    }

    return (
        <div
            className={`fixed top-4 right-4 z-50 max-w-sm w-full ${backgroundColor} border-l-4 shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out slide-in-right`}
            style={{ animation: 'slideInRight 0.5s ease-out' }} // Use CSS Animation directly
        >
            <div className="flex items-center p-4">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;