import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contex/AuthContex';

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-black text-white shadow-md'
        : 'text-[#1C1917] hover:bg-black/5'
    }`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-white border-r border-gray-200 px-4 py-6 shadow-sm">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <span className="text-lg font-bold">K</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-[#1C1917]">Kshtriya</h1>
            <p className="text-xs font-semibold tracking-wide text-red-600 uppercase">Admin Portal</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="mb-1 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Overview
          </p>
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>

          <p className="mb-1 mt-4 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Management
          </p>
          <NavLink to="/admin/users" className={linkClass}>
            User Management
          </NavLink>
          <NavLink to="/admin/verifications" className={linkClass}>
            Verification Queue
          </NavLink>

          <p className="mb-1 mt-4 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Finance
          </p>
          <NavLink to="/admin/transactions" className={linkClass}>
            Transactions
          </NavLink>
          <NavLink to="/admin/revenue" className={linkClass}>
            Revenue
          </NavLink>
        </nav>

        <div className="mt-auto border-t border-gray-100 pt-4">
          <button
            onClick={async () => {
              try {
                await fetch('/api/logout');
              } catch (err) {}
              window.location.href = '/login';
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
