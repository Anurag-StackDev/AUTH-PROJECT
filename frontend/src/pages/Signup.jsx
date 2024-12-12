import { motion } from "framer-motion";
import { Mail, RectangleEllipsis, User } from "lucide-react";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import { useAuthStore } from "../store/AuthStore";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { signup, error } = useAuthStore();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-red-300 text-transparent bg-clip-text"
        >
          Create Account
        </h2>
        <form onSubmit={handleSignup}>
          <Input
            Icon={User}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            Icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            Icon={RectangleEllipsis}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-white font-semibold mt-2 text-sm">{error.message}</p>}
          <PasswordStrength password={password} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-5 w-full py-3 px-4 text-center bg-gradient-to-r from-red-800 to-pink-900 text-white font-bold rounded-lg shadow-lg hover:from-pink-900 hover:to-red-800 focus:outline-none transition duration-200"
          >
            SIGN UP
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?
          <Link to={"/login"} className="text-red-400 pl-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Signup;