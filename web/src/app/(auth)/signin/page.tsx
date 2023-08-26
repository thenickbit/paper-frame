'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

type Providers = 'email' | 'github';

const emailSchema = z.object({
  email: z.string().email(),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<Providers>();
  const [view, setView] = useState<'sign-in' | 'email-sent'>('sign-in');
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleEmailSignIn = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading('email');

    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) showErrorToast();

    setView('email-sent');
    setIsLoading(undefined);
  };

  const handleGithubSignIn = async () => {
    setIsLoading('github');

    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });

    if (error) showErrorToast();
    setIsLoading(undefined);
  };

  const showErrorToast = () => {
    toast({
      title: 'Something went wrong!',
      description: 'Please refresh and try again.',
    });
  };

  if (view === 'email-sent') {
    return (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <p className="text-center text-neutral-400">Check your email to continue signing up!</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEmailSignIn)} className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading === 'email'}>
            {isLoading === 'email' && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="outline" className="bg-background" onClick={() => handleGithubSignIn()}>
          {isLoading === 'github' ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.github className="mr-2 h-4 w-4" />
          )}
          Github
        </Button>
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
