import { motion } from "framer-motion";
import PropTypes from "prop-types";

PageMotion.propTypes = {
  children: PropTypes.node,
};

const PageMotion = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
};

export default PageMotion;
