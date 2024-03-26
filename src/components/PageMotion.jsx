import { motion } from "framer-motion";
import PropTypes from "prop-types";

const PageMotion = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
};
PageMotion.propTypes = {
  children: PropTypes.node,
};

export default PageMotion;
