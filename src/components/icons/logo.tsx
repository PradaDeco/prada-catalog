import React from 'react'

export function LogoIcon(props: React.ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Prada Design Logo"
      src="/logo-prada.png"
      {...props}
      style={{ height: '2rem', width: 'auto', objectFit: 'contain', ...props.style }}
    />
  )
}
