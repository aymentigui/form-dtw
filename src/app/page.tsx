"use client"
import RegistrationPage from "@/componenets/RegistrationForm";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Logo animé */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8"
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-24 w-24 md:h-32 md:w-32 drop-shadow-lg"
        />
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-6"
      >
      Inscription des opérateurs de  Transport
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-2xl md:text-3xl font-extrabold text-center text-red-400 mb-6"
      >
        Direction des transports de wilaya d'Alger - DTW
      </motion.h2>

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg"
      >
        <RegistrationPage />
      </motion.div>
    </main>
  );
}
