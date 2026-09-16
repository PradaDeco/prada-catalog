'use client'

import React, { Fragment, useCallback, useState, MouseEvent } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    ¡Base de datos poblada! Ya puedes{' '}
    <a target="_blank" href="/">
      visitar tu sitio web
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('La base de datos ya fue poblada.')
        return
      }
      if (loading) {
        toast.info('La población ya está en progreso.')
        return
      }
      if (error) {
        toast.error(`Ocurrió un error, por favor recarga e intenta de nuevo.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject('Ocurrió un error al poblar la base de datos.')
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: 'Poblando con datos....',
            success: <SuccessMessage />,
            error: 'Ocurrió un error al poblar la base de datos.',
          },
        )
      } catch (err) {
        setError(err)
      }
    },
    [loading, seeded, error],
  )

  let message = ''
  if (loading) message = ' (poblando...)'
  if (seeded) message = ' (¡listo!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Poblar tu base de datos
      </button>
      {message}
    </Fragment>
  )
}
