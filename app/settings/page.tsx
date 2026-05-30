'use client';

import Sidebar from '@/components/dashboard/sidebar';
import { Bell, Shield, Eye, Lock, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-xl">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your account and preferences</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-w-2xl space-y-6">
          {/* Profile Section */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Morgan"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="alex@company.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company</label>
                <input
                  type="text"
                  defaultValue="Internet Intelligence Inc"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <span>Notifications</span>
            </h2>

            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    emailNotifications ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Slack Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Slack Notifications</p>
                  <p className="text-sm text-gray-400">Send alerts to Slack</p>
                </div>
                <button
                  onClick={() => setSlackNotifications(!slackNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    slackNotifications ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      slackNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing Emails */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-medium text-white">Marketing Emails</p>
                  <p className="text-sm text-gray-400">Receive product updates and promotions</p>
                </div>
                <button
                  onClick={() => setMarketingEmails(!marketingEmails)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    marketingEmails ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      marketingEmails ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Privacy & Security</span>
            </h2>

            <div className="space-y-3">
              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 text-left transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">Change Password</p>
                      <p className="text-xs text-gray-400">Update your password</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              <button className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 text-left transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-400">Enhance your account security</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/50">
            <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center space-x-2">
              <LogOut className="w-5 h-5" />
              <span>Danger Zone</span>
            </h2>

            <button className="px-6 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-medium hover:bg-red-500/30 transition">
              Logout
            </button>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-6">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
              Save Changes
            </button>
            <button className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition duration-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
