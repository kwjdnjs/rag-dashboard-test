'use client'

import { useState } from 'react'
import { mockChatLogs } from '@/lib/mockData'
import { ScrollText, Download, Filter, Search, ThumbsUp, ThumbsDown, Clock, User, MessageSquare } from 'lucide-react'

export default function LogsPage() {
  const [logs, setLogs] = useState(mockChatLogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedTab, setSelectedTab] = useState<'queries' | 'admin' | 'errors'>('queries')

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || log.responseType === filterType
    return matchesSearch && matchesType
  })

  const handleExport = () => {
    alert('로그를 다운로드합니다. (Mock)')
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">로그 관리</h1>
        <p className="text-gray-600">시스템 로그 및 활동 이력을 확인합니다</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedTab('queries')}
          className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
            selectedTab === 'queries'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          질문 로그
        </button>
        <button
          onClick={() => setSelectedTab('admin')}
          className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
            selectedTab === 'admin'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          관리자 활동
        </button>
        <button
          onClick={() => setSelectedTab('errors')}
          className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
            selectedTab === 'errors'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          에러 로그
        </button>
      </div>

      {/* Queries Tab */}
      {selectedTab === 'queries' && (
        <>
          {/* Actions Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="로그 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="all">모든 유형</option>
                    <option value="FAQ">FAQ</option>
                    <option value="용어정의">용어정의</option>
                    <option value="스몰톡">스몰톡</option>
                  </select>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full sm:w-auto justify-center"
              >
                <Download size={20} />
                내보내기
              </button>
            </div>
          </div>

          {/* Logs List */}
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-800">{log.userName}</span>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          log.responseType === 'FAQ' ? 'bg-blue-100 text-blue-700' :
                          log.responseType === '용어정의' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {log.responseType}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {log.responseTime.toFixed(2)}초
                        </span>
                      </div>
                    </div>
                  </div>
                  {log.feedback && (
                    <div className={`p-2 rounded-lg ${
                      log.feedback === 'positive' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {log.feedback === 'positive' ? (
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">질문:</p>
                    <p className="text-gray-800">{log.question}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">응답:</p>
                    <p className="text-gray-800">{log.answer}</p>
                  </div>
                  {log.referencedDocuments && log.referencedDocuments.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">참조 문서:</p>
                      <div className="flex flex-wrap gap-2">
                        {log.referencedDocuments.map((doc, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <ScrollText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">로그가 없습니다.</p>
            </div>
          )}
        </>
      )}

      {/* Admin Activity Tab */}
      {selectedTab === 'admin' && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-12">
            <ScrollText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">관리자 활동 로그</p>
            <p className="text-sm text-gray-400">
              관리자의 초대, 승인, 권한 변경 등의 활동이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      )}

      {/* Errors Tab */}
      {selectedTab === 'errors' && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-12">
            <ScrollText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">에러 로그</p>
            <p className="text-sm text-gray-400">
              시스템 에러 및 API 오류가 여기에 표시됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
