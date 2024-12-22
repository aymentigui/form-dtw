// components/VerificationForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const verificationSchema = z.object({
  code: z.string().length(6, { message: "Le code doit contenir 6 caractères" }),
});

type VerificationFormProps = {
  onSubmit: (data: z.infer<typeof verificationSchema>) => void;
};

export const VerificationForm = ({ onSubmit }: VerificationFormProps) => {
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
  });

  return (
    <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-4">
      <Input type="text" placeholder="Code de vérification" {...verificationForm.register("code")} />
      {verificationForm.formState.errors.code && (
        <p className="text-red-500">{verificationForm.formState.errors.code.message}</p>
      )}
      <Button type="submit" className="w-full">
        Vérifier le code
      </Button>
    </form>
  );
};
