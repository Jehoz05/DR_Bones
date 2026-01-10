import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Hero from "../components/LoadingSpinner";

export default function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50"
    >
      <Navigation />
      <Hero />
    </motion.div>
  );
}
