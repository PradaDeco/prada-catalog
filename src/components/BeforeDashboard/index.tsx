import { Banner } from '@payloadcms/ui'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenido al panel de administración de Prada Design.</h4>
      </Banner>
      Desde aquí puedes gestionar el catálogo de telas, las categorías y las páginas del sitio.
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' para cargar datos de ejemplo y comenzar más rápido, luego '}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">visita el sitio</a>
          {' para ver los resultados.'}
        </li>
      </ul>
    </div>
  )
}
