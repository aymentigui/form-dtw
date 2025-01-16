// pages/RegistrationPage.tsx 
"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendVerificationCode, verifyCode, registerUser } from "@/lib/api";
import { EmailForm } from "./EmailForm";
import { VerificationForm } from "./VerificationForm";
import { InformationForm } from "./InformationForm";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";  // Importation de l'élément de chargement

const RegistrationPage = () => {
  const [step, setStep] = useState(1); // Étape actuelle du processus d'inscription
  const { toast } = useToast(); // Hook pour afficher les notifications
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // État de chargement
  const router = useRouter();

  // Fonction pour gérer la soumission de l'email (étape 1)
  const onEmailSubmit = async (data: { email: string }) => {
    setLoading(true); // Démarre le chargement
    try {
      await sendVerificationCode(data.email); // Envoi du code de vérification
      toast({
        title: "Code envoyé",
        description: "Veuillez vérifier votre email pour le code de vérification.",
      });
      setEmail(data.email);
      setStep(2); // Passe à l'étape 2 (vérification du code)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le code de vérification. Veuillez réessayer.",
        variant: "destructive", // Style d'erreur
      });
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  // Fonction pour gérer la soumission du code de vérification (étape 2)
  const onVerificationSubmit = async (data: { code: string }) => {
    setLoading(true); // Démarre le chargement
    try {
      await verifyCode(email, data.code); // Vérifie le code avec l'API
      toast({
        title: "Code vérifié",
        description: "Vous pouvez maintenant terminer votre inscription.",
      });
      setStep(3); // Passe à l'étape 3 (inscription des informations personnelles)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Code de vérification invalide. Veuillez réessayer.",
        variant: "destructive", // Style d'erreur
      });
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  // Fonction pour gérer l'inscription des informations personnelles (étape 3)
  const onRegistrationSubmit = async (data: any) => {
    setLoading(true); // Démarre le chargement
    try {
      // Enregistrement de l'utilisateur avec les informations de l'email et des données du formulaire
      const response = await registerUser({ ...data, email: email });
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      const userData = { ...data, email: email, id: response.userId };
      const userDataString = encodeURIComponent(JSON.stringify(userData));
      router.push(`/confermation?data=${userDataString}`);
      // Redirigez l'utilisateur ou effectuez une action après l'inscription
      // Par exemple : redirection vers la page d'accueil ou de connexion
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de terminer l'inscription. Veuillez réessayer.",
        variant: "destructive", // Style d'erreur
      });
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Afficher le chargement global */}
      {loading && (
        <div className="flex justify-center items-center absolute inset-0 bg-opacity-50 bg-gray-500 z-10">
          <ClipLoader color="#4B8B3B" size={50} />
        </div>
      )}

      {step === 1 && !loading && <EmailForm onSubmit={onEmailSubmit} />}
      {step === 2 && !loading && <VerificationForm onSubmit={onVerificationSubmit} />}
      {step === 3 && !loading && <InformationForm onSubmit={onRegistrationSubmit} />}
    </div>
  );
};

export default RegistrationPage;
