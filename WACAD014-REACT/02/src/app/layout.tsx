"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "./components/BootstrapClient";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []); 

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Navbar />
          {children}
          <BootstrapClient />
        </QueryClientProvider>
      </body>
    </html>
  );
}
