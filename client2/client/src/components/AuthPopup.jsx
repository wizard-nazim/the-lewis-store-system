import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent } from "./ui/dialog";

const AuthPopup = ({ open, onClose, mode }) => {
  const [currentMode, setCurrentMode] = useState(mode || "login");

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

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

                {/* Inputs with neon border effect */}
                <Input
                  placeholder="Email"
                  type="email"
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />

                {/* Login Button */}
                <Button
                  variant="default"
                  className="w-full mt-2 bg-black text-white hover:bg-black/90 hover:shadow-[0_0_8px_#FF0000] transition-all duration-200"
                >
                  Sign In
                </Button>

                <p className="text-center text-sm opacity-70">
                  Don't have an account?{" "}
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
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="border-black focus:border-red-600 focus:ring-red-600 text-black bg-white placeholder-black/50"
                />

                {/* Register Button */}
                <Button
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
