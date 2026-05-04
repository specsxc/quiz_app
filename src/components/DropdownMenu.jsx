import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router";
import { GoSignOut } from "react-icons/go";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, session } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();

    const { success, error } = await signOut();
    if (success) {
      toast.success("Logout Successful!");
      setIsOpen(false);
      navigate("/");
    } else {
      toast.error(`Błąd: ${error.message}`);
      setIsOpen(false);
    }
  };

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
                {session && (
                  <>
                    <span className="menu-head account-underline">
                      Logged in as:{" "}
                      {session && session?.user?.user_metadata.name}
                    </span>
                    <li>
                      <NavLink
                        to="/profile"
                        className="menu-link"
                        onClick={() => setIsOpen(false)}
                      >
                        My Profile
                      </NavLink>
                    </li>
                  </>
                )}
                {!session && (
                  <>
                    <li>
                      <NavLink
                        to="/signin"
                        className="menu-link"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signup"
                        className="menu-link"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    to="/settings"
                    className="menu-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </NavLink>
                </li>
                {session && (
                  <li>
                    <NavLink
                      to="/"
                      onClick={handleSignOut}
                      className="menu-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
