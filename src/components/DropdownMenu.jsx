import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MdOutlineAccountCircle
        className="account-icon"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="menu-overlay"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="menu"
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p>DropdownMenu</p>
              <p>Login</p>
              <p>Register</p>
              <p>Logout</p>
              <p>DropdownMenu</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
