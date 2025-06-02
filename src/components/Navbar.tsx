'use client';
import { useState } from 'react';
import { Dialog, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useAuth, logout } from '../lib/useAuth';
import { useRouter } from 'next/navigation';
import React from "react";
import { motion } from "framer-motion";

const navigation = [
  { name: 'Generator', href: '/generate' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Testimonials', href: '#' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
    >
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">ColdReach AI</span>
            <img
              alt="ColdReach AI Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg text-blue-700">ColdReach AI</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-base font-bold text-gray-900 hover:text-blue-700 transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!loading && !user && (
            <Link href="/login" className="text-base font-bold text-gray-900 hover:text-blue-700 transition-colors">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {!loading && user && (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="h-9 w-9 rounded-full object-cover border border-gray-300" />
                ) : (
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg">
                    {user.displayName ? user.displayName[0] : <UserCircleIcon className="h-8 w-8 text-indigo-400" />}
                  </span>
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/account')}
                        className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                      >
                        Account
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/pricing')}
                        className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                      >
                        Manage Plan
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm font-semibold text-red-600 ${active ? 'bg-red-50' : ''}`}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </motion.nav>
      {/* Mobile menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">ColdReach AI</span>
              <img
                alt="ColdReach AI Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg text-blue-700">ColdReach AI</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {!loading && !user && (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
                {!loading && user && (
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="avatar" className="h-9 w-9 rounded-full object-cover border border-gray-300" />
                      ) : (
                        <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg">
                          {user.displayName ? user.displayName[0] : <UserCircleIcon className="h-8 w-8 text-indigo-400" />}
                        </span>
                      )}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push('/account')}
                              className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                            >
                              Account
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => router.push('/pricing')}
                              className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                            >
                              Manage Plan
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`w-full text-left px-4 py-2 text-sm font-semibold text-red-600 ${active ? 'bg-red-50' : ''}`}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </motion.header>
  );
};

export default Navbar; 