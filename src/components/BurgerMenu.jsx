import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";

export default function BurgerMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  console.log(opened);

  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        aria-label="Toggle burger menu"
        className="menu-burger-container"
      />
      <AnimatePresence>
        {opened && (
          <>
            <motion.div
              className="menu-overlay"
              onClick={() => toggle(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="menu-burger"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <ul className="menu-list">
                <li>
                  <NavLink to="/" className="menu-link">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/quiz" className="menu-link">
                    Quiz
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard" className="menu-link">
                    Leaderboard
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
