"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { addInvestment } from "../actions/investmentActions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein.",
  }),
  amount: z.coerce.number().min(1, {
    message: "Der Betrag muss größer als 0 sein.",
  }),
  type: z.enum(["renewable_energy", "infrastructure", "it_systems"], {
    required_error: "Bitte wählen Sie eine Art der Investition aus.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Die Dauer muss mindestens 1 Jahr betragen.",
  }),
})

export default function NewInvestment() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: undefined,
      duration: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await addInvestment(values)
      if (result.success) {
        toast({
          title: "Erfolg",
          description: result.message,
        })
        router.push("/investments?newInvestment=true")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error adding investment:", error)
      toast({
        title: "Fehler",
        description: `Es gab einen Fehler beim Hinzufügen der Investition: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Neue Investition hinzufügen</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name der Investition</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. Solarpark A" {...field} />
                </FormControl>
                <FormDescription>Geben Sie einen eindeutigen Namen für Ihre Investition ein.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investitionsbetrag (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Geben Sie den Betrag in Euro ein, den Sie investieren möchten.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Art der Investition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie eine Option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="renewable_energy">Erneuerbare Energien</SelectItem>
                    <SelectItem value="infrastructure">Infrastruktur</SelectItem>
                    <SelectItem value="it_systems">IT-Systeme</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Wählen Sie die Art der Investition aus.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geplanter Zeitraum (Jahre)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Geben Sie die geplante Dauer der Investition in Jahren an.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Wird hinzugefügt..." : "Investition hinzufügen"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

