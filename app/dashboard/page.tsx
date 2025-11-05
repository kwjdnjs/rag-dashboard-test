'use client'

import { useEffect, useState } from 'react'
import { mockDashboardStats, mockFAQSuggestions } from '@/lib/mockData'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { MessageSquare, TrendingUp, Clock, ThumbsUp, FileText, CheckCircle, XCircle } from 'lucide-react'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']

export default function DashboardPage() {
  const [stats, setStats] = useState(mockDashboardStats)
  const [suggestions, setSuggestions] = useState(mockFAQSuggestions)

  const handleApproveSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
    alert('FAQ 제안이 승인되었습니다.')
  }

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
    alert('FAQ 제안이 거절되었습니다.')
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">대시보드</h1>
        <p className="text-gray-600">시스템 통계 및 분석 현황</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">총 질의 수</p>
          <p className="text-3xl font-bold text-gray-800">{stats.totalQueries.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">응답 성공률</p>
          <p className="text-3xl font-bold text-gray-800">{stats.successRate}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">-0.2s</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">평균 응답 시간</p>
          <p className="text-3xl font-bold text-gray-800">{stats.avgResponseTime}초</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+0.3</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">사용자 만족도</p>
          <p className="text-3xl font-bold text-gray-800">{stats.userSatisfaction}/5.0</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Queries Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">일별 질의량</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.dailyQueries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Response Types Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">응답 유형 분포</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.responseTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.responseTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">가장 많이 참조된 문서</h2>
          </div>
          <div className="space-y-4">
            {stats.topDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <span className="text-gray-700">{doc.name}</span>
                </div>
                <span className="text-blue-600 font-medium">{doc.count}회</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">FAQ 등록 제안</h2>
          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">제안된 FAQ가 없습니다.</p>
            ) : (
              suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="mb-3">
                    <p className="font-medium text-gray-800 mb-1">{suggestion.question}</p>
                    <p className="text-sm text-gray-600">{suggestion.suggestedAnswer}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">빈도: {suggestion.frequency}회</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveSuggestion(suggestion.id)}
                        className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        승인
                      </button>
                      <button
                        onClick={() => handleRejectSuggestion(suggestion.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition flex items-center gap-1"
                      >
                        <XCircle size={14} />
                        거절
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
