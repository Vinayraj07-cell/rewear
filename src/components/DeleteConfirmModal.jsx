import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, t }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-red-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1">
            {t.deleteConfirmTitle}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xs">
            {t.deleteConfirmDesc}
          </p>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition"
          >
            {t.keepPiece}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.confirmDelete}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
