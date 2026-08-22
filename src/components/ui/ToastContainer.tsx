'use client';

import { useToastStore } from '@/store/useToastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 min-w-[300px] max-w-md p-4 rounded-xl shadow-lg border animate-fade-in-up
              ${isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : ''}
              ${isError ? 'bg-red-50 border-red-200 text-red-900' : ''}
              ${!isSuccess && !isError ? 'bg-surface border-border text-heading' : ''}
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-accent" />}
            </div>
            
            <div className="flex-1 text-sm font-medium leading-tight">
              {toast.message}
            </div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 -mr-1 -mt-1 opacity-50 hover:opacity-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
