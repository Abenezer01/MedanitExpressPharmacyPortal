"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { generateInventorySuggestions } from "@/ai/flows/inventory-suggestions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  historicalOrderData: z.string().min(10, "Please provide more detailed historical order data."),
  userProfiles: z.string().min(10, "Please provide more detailed user profile data."),
})

type FormValues = z.infer<typeof formSchema>

export default function InventoryPage() {
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalOrderData: "",
      userProfiles: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setSuggestion(null)
    try {
      const result = await generateInventorySuggestions(values)
      setSuggestion(result.suggestedOrders)
    } catch (error) {
      console.error("Failed to generate suggestions:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate inventory suggestions. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
       <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">Inventory AI Suggestions</h1>
          <p className="text-muted-foreground">
            Generate inventory suggestions based on historical data and user profiles.
          </p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Input Data</CardTitle>
                <CardDescription>
                  Provide historical order data and user profiles to generate suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="historicalOrderData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Historical Order Data</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Last month: Amoxicillin 500mg - 200 units, Paracetamol 500mg - 500 units...'"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userProfiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Profiles</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'User A: 45yo male, chronic hypertension, buys Lisinopril monthly. User B: 28yo female, seasonal allergies...'"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="mr-2 h-4 w-4" />
                      Generate Suggestions
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Suggested Orders</CardTitle>
            <CardDescription>
              AI-powered suggestions for your next inventory restock.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {suggestion ? (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-muted p-4">
                {suggestion}
              </div>
            ) : !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center bg-muted/50 rounded-lg p-8">
                 <Bot className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Your generated suggestions will appear here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
