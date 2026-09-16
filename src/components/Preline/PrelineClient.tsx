'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PrelineClient() {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false

    const initPreline = async () => {
      if (typeof window === 'undefined') return

      try {
        const [
          DataTable,
          Dropzone,
          $,
          _,
          noUiSlider,
          { Calendar },
          { HSStaticMethods },
        ] = await Promise.all([
          import('datatables.net-dt'),
          import('dropzone'),
          import('jquery'),
          import('lodash'),
          import('nouislider'),
          import('vanilla-calendar-pro'),
          import('preline/non-auto'),
        ])

        if (cancelled) return

        const win = window as any
        win.$ = $.default || $
        win.jQuery = $.default || $
        win._ = _.default || _
        win.Dropzone = Dropzone.default || Dropzone
        win.noUiSlider = noUiSlider.default || noUiSlider
        win.DataTable = DataTable.default || DataTable
        win.VanillaCalendarPro = Calendar

        HSStaticMethods?.cleanCollection()
        HSStaticMethods?.autoInit()
      } catch (error) {
        console.error('Error initializing Preline:', error)
      }
    }

    void initPreline()

    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}