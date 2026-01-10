"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

const LogoutWarningModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-column-bg/90 backdrop-blur-xl border border-task-card-border p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-text-primary mb-2">Ready to Leave?</h3>
          <p className="text-text-secondary mb-8">
            Are you sure you want to log out of your Kanban board?
          </p>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-text-primary font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 active:scale-95"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutWarningModal;
