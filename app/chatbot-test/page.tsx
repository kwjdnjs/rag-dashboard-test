'use client'

import { useState } from 'react'
import { Send, Bot, User, FileText, Clock, Tag } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: string
  responseType?: string
  responseTime?: number
  references?: string[]
}

export default function ChatbotTestPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '안녕하세요! 챗봇 테스트에 오신 것을 환영합니다. 무엇을 도와드릴까요?',
      timestamp: new Date().toISOString(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatbotType, setChatbotType] = useState('mixed')

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: String(Date.now()),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Mock bot response
    setTimeout(() => {
      const mockResponses = [
        {
          content: '연차는 사내 포털의 전자결재 시스템에서 "휴가신청" 메뉴를 선택하여 신청할 수 있습니다.',
          responseType: 'FAQ',
          references: ['직원 복지 가이드.pdf'],
        },
        {
          content: 'ROI(Return on Investment)는 투자 대비 수익률을 의미하며, 투자로 인한 이익을 투자 비용으로 나눈 값입니다.',
          responseType: '용어정의',
          references: ['용어 사전.pdf'],
        },
        {
          content: '좋은 하루 보내세요! 더 궁금하신 것이 있으시면 언제든지 물어보세요.',
          responseType: '스몰톡',
        },
      ]

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      const botMessage: Message = {
        id: String(Date.now() + 1),
        type: 'bot',
        content: randomResponse.content,
        timestamp: new Date().toISOString(),
        responseType: randomResponse.responseType,
        responseTime: Math.random() * 2 + 0.5,
        references: randomResponse.references,
      }

      setMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 1000)
  }

  const getResponseTypeBadge = (type?: string) => {
    if (!type) return null
    
    const colors = {
      'FAQ': 'bg-blue-100 text-blue-700',
      '용어정의': 'bg-green-100 text-green-700',
      '스몰톡': 'bg-purple-100 text-purple-700',
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${colors[type as keyof typeof colors]}`}>
        <Tag size={12} />
        {type}
      </span>
    )
  }

  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">챗봇 테스트</h1>
        <p className="text-gray-600">챗봇의 응답을 테스트하고 성능을 확인합니다</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-6rem)]">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">설정</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  응답 타입
                </label>
                <select
                  value={chatbotType}
                  onChange={(e) => setChatbotType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="detailed">더 자세하게</option>
                  <option value="fast">더 빠르게</option>
                  <option value="mixed">혼합</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">테스트 통계</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 질문 수</span>
                    <span className="font-medium">{Math.floor(messages.length / 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">평균 응답 시간</span>
                    <span className="font-medium">1.2초</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">참고사항</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 실제 카카오워크와 동일한 응답</li>
                  <li>• 현재 설정이 즉시 반영됩니다</li>
                  <li>• 테스트 데이터는 저장되지 않습니다</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setMessages([{
                    id: '1',
                    type: 'bot',
                    content: '안녕하세요! 챗봇 테스트에 오신 것을 환영합니다. 무엇을 도와드릴까요?',
                    timestamp: new Date().toISOString(),
                  }])
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                대화 초기화
              </button>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-gray-600" />
                    )}
                  </div>

                  <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {message.type === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {message.responseType && getResponseTypeBadge(message.responseType)}
                        {message.responseTime && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full flex items-center gap-1">
                            <Clock size={12} />
                            {message.responseTime.toFixed(2)}초
                          </span>
                        )}
                        {message.references && message.references.map((ref, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full flex items-center gap-1">
                            <FileText size={12} />
                            {ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="px-4 py-3 bg-gray-100 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={20} />
                  전송
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
