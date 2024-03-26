import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>LoginPage</h1>
    </motion.div>
  );
};

export default LoginPage;
