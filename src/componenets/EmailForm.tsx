// components/EmailForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type EmailFormProps = {
  onSubmit: (data: z.infer<typeof emailSchema>) => void;
};

export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

  return (
    <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-4">
      <Input type="email" placeholder="Adresse email" {...emailForm.register("email")} />
      {emailForm.formState.errors.email && (
        <p className="text-red-500">{emailForm.formState.errors.email.message}</p>
      )}
      <Button type="submit" className="w-full ">
        Envoyer le code de vérification
      </Button>
    </form>
  );
};
