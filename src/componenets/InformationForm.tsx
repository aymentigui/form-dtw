
"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { registrationSchema } from "@/lib/schcema";

// Ajout de la validation pour les lettres arabes avec une regex


type InformationFormProps = {
  onSubmit: (data: z.infer<typeof registrationSchema>) => void;
};

export const InformationForm = ({ onSubmit }: InformationFormProps) => {
  const [isSociete, setIsSociete] = useState(false);
  const registrationForm = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    registrationForm.setValue("isSociety", isSociete);
  }, [])

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={registrationForm.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isSociety"
          {...registrationForm.register("isSociety")}
          checked={isSociete}
          onCheckedChange={() => {
            setIsSociete((p) => {
              registrationForm.setValue("isSociety", !p);
              return !p
            });
            if (!isSociete)
              registrationForm.setValue("societyName", '');
          }}
        />
        <label htmlFor="isSociety">Êtes-vous une société ?</label>
      </div>

      {isSociete && (
        <Input placeholder="Nom de la société" {...registrationForm.register("societyName")} />
      )}
      {isSociete && (
        <Input placeholder="اسم الشركة باللغة العربية" {...registrationForm.register("arabicSocietyName")} />
      )}
      {registrationForm.formState.errors.arabicSocietyName && (
        <p className="text-red-400">{registrationForm.formState.errors.arabicSocietyName.message}</p>
      )}
      <Input placeholder={"Nom et prénom" + (isSociete ? " de gérant" : "")} {...registrationForm.register("name")} />
      {registrationForm.formState.errors.name && (
        <p className="text-red-400">{registrationForm.formState.errors.name.message}</p>
      )}
      <Input
        placeholder="الاسم و اللقب باللغة العربية"
        {...registrationForm.register("arabicName")}
      />
      {registrationForm.formState.errors.arabicName && (
        <p className="text-red-400">{registrationForm.formState.errors.arabicName.message}</p>
      )}
      <Input placeholder="Adresse" {...registrationForm.register("address")} />
      {registrationForm.formState.errors.address && (
        <p className="text-red-400">{registrationForm.formState.errors.address.message}</p>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-sm px-2">Date de naissance</label>
        <Input type="date" placeholder="Date de naissance" {...registrationForm.register("dateOfBirth")} />
      </div>
      {registrationForm.formState.errors.dateOfBirth && (
        <p className="text-red-400">{registrationForm.formState.errors.dateOfBirth.message}</p>
      )}
      <Input placeholder="Numéro de téléphone" {...registrationForm.register("phoneNumber")} />
      {registrationForm.formState.errors.phoneNumber && (
        <p className="text-red-400">{registrationForm.formState.errors.phoneNumber.message}</p>
      )}

      <Select onValueChange={(value) => registrationForm.setValue("activityType", value as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Nature de l'activité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Transport de personnes">Transport de personnes</SelectItem>
          <SelectItem value="Transport de marchandises">Transport de marchandises</SelectItem>
        </SelectContent>
      </Select>
      {registrationForm.formState.errors.activityType && (
        <p className="text-red-400">{registrationForm.formState.errors.activityType.message}</p>
      )}

      <Input placeholder="Numéro d'identification national (NIN)" {...registrationForm.register("nin")} />
      {registrationForm.formState.errors.nin && (
        <p className="text-red-400">{registrationForm.formState.errors.nin.message}</p>
      )}
      <Input placeholder="Numéro d'enregistrement des transporteurs" {...registrationForm.register("transporterNumber")} />
      {registrationForm.formState.errors.transporterNumber && (
        <p className="text-red-400">{registrationForm.formState.errors.transporterNumber.message}</p>
      )}

      {/* {registrationForm.formState.errors && (
        <div className="text-red-400">
          {Object.values(registrationForm.formState.errors).map((error) => (
            <p key={error.message}>{error.message}</p>
          ))}
        </div>
      )}  */}

      <Button type="submit" className="w-full">
        S'inscrire
      </Button>
    </motion.form>
  );
};
