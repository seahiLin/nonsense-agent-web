'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthUI() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.replace('/')
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-[400px] p-8 rounded-xl bg-[#1C1C1C] shadow-2xl">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#f86767',
                brandAccent: '#e55757',
                inputBackground: '#2C2C2C',
                inputBorder: '#2C2C2C',
                inputText: '#fff',
                inputPlaceholder: '#666666',
              },
              space: {
                inputPadding: '12px',
                buttonPadding: '12px'
              },
              borderWidths: {
                buttonBorderWidth: '0px',
                inputBorderWidth: '1px'
              },
              radii: {
                borderRadiusButton: '6px',
                buttonBorderRadius: '6px',
                inputBorderRadius: '6px'
              },
            }
          },
          className: {
            container: 'flex flex-col gap-4',
            label: 'text-sm text-gray-400 font-normal',
            input: 'bg-[#2C2C2C] border-[#2C2C2C] text-white placeholder:text-gray-500',
            divider: 'bg-gray-600',
            anchor: 'text-gray-400 hover:text-white transition-colors',
          },
          style: {
            input: {
              fontSize: '14px',
              backgroundColor: '#2C2C2C',
            },
            label: {
              marginBottom: '4px',
            },
            message: {
              fontSize: '14px',
              color: '#666666',
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email address',
              password_label: 'Your Password',
              email_input_placeholder: 'Enter your email',
              password_input_placeholder: 'Enter your password',
              button_label: 'Sign in',
              loading_button_label: 'Signing in ...',
              social_provider_text: 'Sign in with {{provider}}',
            },
            sign_up: {
              email_label: 'Email address',
              password_label: 'Your Password',
              email_input_placeholder: 'Enter your email',
              password_input_placeholder: 'Enter your password',
              button_label: 'Sign up',
              loading_button_label: 'Signing up ...',
              social_provider_text: 'Sign up with {{provider}}',
            },
          },
        }}
        providers={['google', 'github']}
        providerScopes={{
          google: 'email',
        }}
        theme="dark"
        socialLayout="horizontal"
      />
    </div>
  )
} 