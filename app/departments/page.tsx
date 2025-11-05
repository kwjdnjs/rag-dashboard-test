'use client'

import { useState } from 'react'
import { mockDepartments, mockUsers } from '@/lib/mockData'
import { Building2, Plus, Users, Edit, Trash2, Mail } from 'lucide-react'

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(mockDepartments)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newDept = {
      id: String(departments.length + 1),
      name: formData.get('name') as string,
      parentId: formData.get('parent') as string || undefined,
      organizationId: '1',
    }
    setDepartments(prev => [...prev, newDept])
    setShowAddModal(false)
    alert('부서가 생성되었습니다.')
  }

  const handleInviteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('초대 이메일이 발송되었습니다.')
    setShowInviteModal(false)
  }

  const handleDeleteDepartment = (id: string) => {
    if (confirm('정말 이 부서를 삭제하시겠습니까?')) {
      setDepartments(prev => prev.filter(dept => dept.id !== id))
      alert('부서가 삭제되었습니다.')
    }
  }

  // Get department hierarchy
  const getDepartmentHierarchy = (dept: typeof departments[0]) => {
    if (!dept.parentId) return dept.name
    const parent = departments.find(d => d.id === dept.parentId)
    return parent ? `${parent.name} > ${dept.name}` : dept.name
  }

  // Count users in department
  const getUserCount = (deptId: string) => {
    return mockUsers.filter(user => user.department === departments.find(d => d.id === deptId)?.name).length
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">부서 관리</h1>
        <p className="text-gray-600">조직 구조 및 부서를 관리합니다</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition justify-center"
        >
          <Plus size={20} />
          부서 추가
        </button>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition justify-center"
        >
          <Mail size={20} />
          사용자 초대
        </button>
      </div>

      {/* Organization Tree */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="text-blue-600" />
          조직도
        </h2>
        <div className="space-y-2">
          {departments
            .filter(dept => !dept.parentId)
            .map(parentDept => (
              <div key={parentDept.id}>
                <div className="font-semibold text-gray-800 py-2">{parentDept.name}</div>
                <div className="ml-6 space-y-1">
                  {departments
                    .filter(dept => dept.parentId === parentDept.id)
                    .map(childDept => (
                      <div key={childDept.id} className="text-gray-600 py-1 pl-4 border-l-2 border-gray-200">
                        └ {childDept.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{dept.name}</h3>
                  {dept.parentId && (
                    <p className="text-sm text-gray-500">
                      {departments.find(d => d.id === dept.parentId)?.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition">
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(dept.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={18} />
                <span className="text-sm">구성원 {getUserCount(dept.id)}명</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">부서 추가</h2>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  부서명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="예: 개발팀"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상위 부서 (선택)
                </label>
                <select
                  name="parent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">없음 (최상위 부서)</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {getDepartmentHierarchy(dept)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">사용자 초대</h2>
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="user@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  부서 <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">부서를 선택하세요</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {getDepartmentHierarchy(dept)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직급 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="예: 사원, 대리, 과장"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  권한 <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="User">User (일반 사용자)</option>
                  <option value="Admin">Admin (부서 관리자)</option>
                  <option value="Master">Master (전사 관리자)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  초대 발송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
