import React from 'react'

interface Props {
  children: React.ReactNode
  extraClass?: string
}

export default function AppSection({ children, extraClass }: Props) {
  return (
    <section className={`app-section ${extraClass || ''}`}>{children}</section>
  )
}
