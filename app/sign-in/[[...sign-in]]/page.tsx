'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { SignIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const DEMO_EMAIL = 'demo.recruiter@cogniva.app'
const DEMO_PASSWORD = 'Demo1234!'

export default function Page() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null)

  const copyToClipboard = async (text: string, field: 'email' | 'password') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1800)
    } catch (error) {
      console.error('Failed to copy text', error)
    }
  }

  return (
    <main>
      <section className='w-full max-w-xl mx-auto flex flex-col gap-4 pb-10'>
        {/* Demo credentials module */}
        <div className='w-full rounded-xl border border-border bg-card px-4 py-3 flex items-center justify-between gap-3'>
          <div className='space-y-1'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
              Demo credentials
            </p>
            <p className='text-xs text-muted-foreground'>
              Use a ready-made demo account (for recruiters or reviewers) to quickly explore Cogniva&apos;s primary features.
            </p>
          </div>
          <Button
            size='sm'
            variant='outline'
            className='whitespace-nowrap'
            onClick={() => setIsDemoOpen(true)}
          >
            View demo details
          </Button>
        </div>

        {/* Clerk sign-in card */}
        <div className='flex justify-center pt-2'>
          <SignIn routing='path' path='/sign-in' />
        </div>
      </section>

      {/* Demo credentials modal */}
      {isDemoOpen && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4'>
          <div className='w-full max-w-md rounded-xl border border-border bg-card shadow-lg p-5 space-y-4 relative'>
            <button
              type='button'
              onClick={() => setIsDemoOpen(false)}
              className='absolute right-3 top-3 text-xs text-muted-foreground hover:text-foreground'
            >
              Close
            </button>

            <div className='space-y-1 pr-10'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-primary'>
                Recruiter demo access
              </p>
              <h1 className='text-base font-semibold text-foreground'>
                Sign in instantly with a demo Cogniva account
              </h1>
              <p className='text-xs text-muted-foreground'>
                This shared demo account is for recruiters, reviewers, or anyone who just wants to see how Cogniva&apos;s
                main flows work without creating a personal account.
              </p>
            </div>

            <div className='space-y-3 rounded-lg border border-border bg-background px-3 py-3 text-xs text-foreground'>
              <div className='flex items-center justify-between gap-3'>
                <div className='space-y-0.5'>
                  <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>Demo email</p>
                  <p className='font-mono text-xs break-all'>{DEMO_EMAIL}</p>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  className={`shrink-0 flex items-center gap-1.5 ${
                    copiedField === 'email' ? 'border-green-500 text-green-700 bg-green-50' : ''
                  }`}
                  onClick={() => copyToClipboard(DEMO_EMAIL, 'email')}
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className='h-3 w-3' />
                      Copied
                    </>
                  ) : (
                    'Copy'
                  )}
                </Button>
              </div>

              <div className='h-px w-full bg-border' />

              <div className='flex items-center justify-between gap-3'>
                <div className='space-y-0.5'>
                  <p className='text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>Demo password</p>
                  <p className='font-mono text-xs'>{DEMO_PASSWORD}</p>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  className={`shrink-0 flex items-center gap-1.5 ${
                    copiedField === 'password' ? 'border-green-500 text-green-700 bg-green-50' : ''
                  }`}
                  onClick={() => copyToClipboard(DEMO_PASSWORD, 'password')}
                >
                  {copiedField === 'password' ? (
                    <>
                      <Check className='h-3 w-3' />
                      Copied
                    </>
                  ) : (
                    'Copy'
                  )}
                </Button>
              </div>
            </div>

            <div className='space-y-1 text-[11px] leading-relaxed text-muted-foreground'>
              <p className='font-semibold text-foreground'>Important: demo account has limited access</p>
              <ul className='list-disc list-inside space-y-0.5'>
                <li>
                  Some flows and actions are shortened so you can quickly see how Cogniva&apos;s AI companions work.
                </li>
                <li>Usage is capped to keep the demo stable for everyone.</li>
                <li>
                  For a full experience later, you can sign up with your own email or phone and unlock all features.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
