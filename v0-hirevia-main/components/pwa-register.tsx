"use client"

import { useEffect } from 'react'

export default function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register the service worker from the public folder
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // console.debug('Service worker registered:', reg)
        })
        .catch((err) => {
          // console.error('Service worker registration failed:', err)
        })
    }
  }, [])

  return null
}
