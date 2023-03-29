import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

import "./OverlayNav.scss";

const OverlayNav = ({ isOpen }) => {
  const links = [
    { to: "/", name: "Home" },
    { to: "/Link1", name: "Link1" },
    { to: "/Link2", name: "Link2" },
    { to: "/Link3", name: "Link3" },
  ];

  //framer-motion variant

  const wrapperVariant = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      translateY: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      translateY: 0,
    },
    unmount: {
      opacity: 0,
      scale: 0,
      translateY: 100,
    },
  };

  useEffect(() => {
    isOpen ? (document.body.style.overflowY = "hidden") : "scroll";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overlaynav-wrapper"
          initial="hidden"
          animate="visible"
          exit="unmount"
          transition={{
            duration: 0.8,
            ease: "backInOut",
          }}
          variants={wrapperVariant}
        >
          {links.map((link, index) => (
            <motion.a
              whileTap={{ scale: 0.5 }}
              key={index}
              href="#"
              className="overlaynav__link"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayNav;
