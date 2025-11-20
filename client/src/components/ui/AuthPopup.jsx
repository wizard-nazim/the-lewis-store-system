import React, { useState, useEffect, useContext } from "react"; // Combine React imports
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button"; // Assuming button.jsx is in the same ui/ folder
import { Input } from "./input";
import { Dialog, DialogContent } from "./dialog";
import { ShopContext } from "../components/context/ShopContext";


const AuthPopup = ({ open, onClose, mode }) => {
  const { login, register } = useContext(ShopContext);
  const [currentMode, setCurrentMode] = useState(mode || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const handleSubmit = async () => {
    const values = { email, password, ...(currentMode === "register" && { username: name }) }; // Adjust fields to match backend DTO
    try {
      if (currentMode === "login") {
        await login(values);
      } else {
        await register(values);
      }
      onClose();
    } catch (err) {
      // Handle error (e.g., toast)
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-md rounded-2xl overflow-hidden bg-white text-black">
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            {currentMode === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="p-8 space-y-4"
              >
                <h2 className="text-2xl font-bold text-center text-black">
                  Sign In
                </h2>

                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />

                <Button
                  onClick={handleSubmit}
                  variant="default"
                  className="w-full mt-2 bg-black text-white hover:bg-black/90 hover:shadow-[0_0_8px_#FF0000] transition-all duration-200"
                >
                  Sign In
                </Button>

                <p className="text-center text-sm opacity-70">
                  Don’t have an account?{" "}
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => setCurrentMode("register")}
                  >
                    Register
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                className="p-8 space-y-4"
              >
                <h2 className="text-2xl font-bold text-center text-black">
                  Create Account
                </h2>

                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />

                <Button
                  onClick={handleSubmit}
                  variant="default"
                  className="w-full mt-2 bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_8px_#000000] transition-all duration-200"
                >
                  Register
                </Button>

                <p className="text-center text-sm opacity-70">
                  Already have an account?{" "}
                  <button
                    className="text-black hover:underline"
                    onClick={() => setCurrentMode("login")}
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPopup;