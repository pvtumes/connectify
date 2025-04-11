import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, X, Bell } from "lucide-react";
import "./Toast.css";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
    }[type] || "bg-blue-500";

  const icon = {
    success: <Check size={18} />,
    error: <AlertCircle size={18} />,
    info: <Bell size={18} />,
  }[type] || <Bell size={18} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`toast-container ${bgColor}`}
    >
      <div className="toast-icon">{icon}</div>
      <p className="toast-message">{message}</p>
      <button onClick={onClose} className="toast-close-button">
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
