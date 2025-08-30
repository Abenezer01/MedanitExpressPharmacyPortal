"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth"
import { app } from "@/lib/firebase"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

// Define the shape of the context state
interface AuthContextType {
  user: User | null
  role: string | null
  loading: boolean
  signIn: (email: string, pass: string) => Promise<any>
  signUp: (email: string, pass: string) => Promise<any>
  signOut: () => Promise<void>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

const PROTECTED_ROUTES = ["/", "/orders", "/inventory", "/deliveries", "/customers", "/reports", "/settings", "/profile"]
const PUBLIC_ROUTES = ["/login", "/signup"]

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true)
      if (user) {
        setUser(user)
        // In a real app, you'd fetch the user's role from your database (e.g., Firestore)
        // For this example, we'll assign a default 'admin' role if the user is logged in.
        setRole("admin")

        if (PUBLIC_ROUTES.includes(pathname)) {
          router.push("/")
        }

      } else {
        setUser(null)
        setRole(null)
        if (PROTECTED_ROUTES.includes(pathname)) {
          router.push("/login")
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth, pathname, router])


  const signIn = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass)
  }

  const signUp = (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
    router.push("/login")
  }

  const value = {
    user,
    role,
    loading,
    signIn,
    signUp,
    signOut,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  // For public pages, don't block rendering
  if (PUBLIC_ROUTES.includes(pathname)) {
     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  // If user is not logged in and trying to access a protected route, don't render children
  if (!user && PROTECTED_ROUTES.includes(pathname)) {
      return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
