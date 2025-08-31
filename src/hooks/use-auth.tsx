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
import { Loader2, Pill } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { SidebarNav } from "@/components/sidebar-nav"
import { UserNav } from "@/components/user-nav"

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

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  )
}

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar className="hidden border-r bg-card text-card-foreground md:block">
          <SidebarHeader className="flex h-16 items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <Pill className="h-6 w-6" />
              <span className="">Apotheca Central</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="shrink-0 md:hidden" />
            <div className="w-full flex-1">
              {/* Header content can go here, like a global search */}
            </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}


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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, pathname])


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

  const isPublicPage = PUBLIC_ROUTES.includes(pathname)

  return (
    <AuthContext.Provider value={value}>
      {isPublicPage ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <AppLayout>{children}</AppLayout>
      )}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
