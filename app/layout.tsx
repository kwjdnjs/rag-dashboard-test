import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RAG AI 챗봇 관리 시스템',
  description: 'RAG 기반 카카오워크 AI 챗봇 및 데이터 관리 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
