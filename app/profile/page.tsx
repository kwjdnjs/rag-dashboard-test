'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Building2, Shield, Camera, Lock, Save } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    id: '1',
    email: 'admin@company.com',
    name: '김관리',
    nickname: '관리자',
    department: 'IT',
    position: '팀장',
    role: 'Master',
    profileImage: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser({ ...user, ...parsedUser })
      setEditedUser({ ...user, ...parsedUser })
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword && newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    setUser(editedUser)
    localStorage.setItem('user', JSON.stringify(editedUser))
    setIsEditing(false)
    setNewPassword('')
    setConfirmPassword('')
    alert('프로필이 수정되었습니다.')
  }

  const getRoleBadge = (role: string) => {
    const colors: { [key: string]: string } = {
      'User': 'bg-gray-100 text-gray-700',
      'Admin': 'bg-blue-100 text-blue-700',
      'Master': 'bg-purple-100 text-purple-700',
      'Super Master': 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[role] || colors['User']}`}>
        {role}
      </span>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">마이페이지</h1>
        <p className="text-gray-600">개인 정보를 확인하고 수정합니다</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                    <Camera size={20} />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-3">{user.nickname}</p>
              {getRoleBadge(user.role)}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Building2 size={18} />
                <span className="text-sm">{user.department} · {user.position}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield size={18} />
                <span className="text-sm">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">개인 정보</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  수정하기
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Read-only fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">* 이름은 수정할 수 없습니다</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">* 이메일은 수정할 수 없습니다</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부서
                  </label>
                  <input
                    type="text"
                    value={user.department}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    직급
                  </label>
                  <input
                    type="text"
                    value={user.position}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    권한
                  </label>
                  <input
                    type="text"
                    value={user.role}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Editable fields */}
              {isEditing && (
                <>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">수정 가능한 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          닉네임
                        </label>
                        <input
                          type="text"
                          value={editedUser.nickname}
                          onChange={(e) => setEditedUser({ ...editedUser, nickname: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          placeholder="닉네임을 입력하세요"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          새 비밀번호
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="비밀번호를 변경하려면 입력하세요"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          * 변경하지 않으려면 비워두세요
                        </p>
                      </div>

                      {newPassword && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            비밀번호 확인
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                              placeholder="비밀번호를 다시 입력하세요"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false)
                        setEditedUser(user)
                        setNewPassword('')
                        setConfirmPassword('')
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <Save size={20} />
                      저장
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
