"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createTenant } from "@/app/actions/tenantActions"

import { API_RESPONSE_STATUS_CODE } from "@/lib/enum/auth.enum"

export default function NewTenant() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await createTenant(name, email);
    if (res.status === API_RESPONSE_STATUS_CODE.SUCCESS) {
      toast({
        title: "Tenant added successfully",
        description: "You can now manage this tenant",
      })
      router.push("/dashboard")
    }else {
      toast({
        title: "Error adding tenant",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Create New Tenant</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Tenant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <Button type="submit">Create Tenant</Button>
      </form>
    </main>
  )
}

