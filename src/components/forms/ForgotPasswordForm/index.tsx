'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'Hubo un problema al intentar enviarte un correo para restablecer tu contraseña. Por favor, inténtalo de nuevo.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1 className="text-xl mb-4">Olvidé mi contraseña</h1>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {`Ingresa tu correo electrónico a continuación. Recibirás un mensaje con instrucciones sobre
              cómo restablecer tu contraseña. Para gestionar todos tus usuarios, `}
              <Link href="/admin/collections/users">inicia sesión en el panel de administración</Link>.
            </p>
          </div>
          <form className="max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <Message className="mb-8" error={error} />

            <FormItem className="mb-8">
              <Label htmlFor="email" className="mb-2">
                Correo electrónico
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Por favor, proporciona tu correo electrónico.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <Button type="submit" variant="default">
              Restablecer contraseña
            </Button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1 className="text-xl mb-4">Solicitud enviada</h1>
          <div className="prose dark:prose-invert">
            <p>Revisa tu correo electrónico para encontrar un enlace que te permitirá restablecer tu contraseña de forma segura.</p>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  )
}
