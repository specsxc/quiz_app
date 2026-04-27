import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router"; // ✅ poprawny import
import { GoSignOut } from "react-icons/go";

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
              <ul className="menu-list">
                <li>
                  <NavLink
                    to="/account"
                    className="menu-link account-underline"
                  >
                    <MdOutlineAccountCircle className="account-icon-menu" />
                    Account
                  </NavLink>
                </li>
                <li>
                  {/* Zmieniono ścieżkę z "/login" na "/signin" */}
                  <NavLink to="/signin" className="menu-link">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="menu-link">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/logout" className="menu-link signout">
                    <GoSignOut className="signout-icon" />
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/footer" className="menu-link">
                    Footer
                  </NavLink>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
