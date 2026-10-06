import React, { useState, useEffect } from 'react';
import { X, KeyRound, CheckCircle2, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import { getStoredApiKey, saveStoredApiKey } from '../services/youtubeApi';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotaUsed: number;
  quotaBudget: number;
  quotaSaved: number;
  onKeyUpdated: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  quotaUsed,
  quotaBudget,
  quotaSaved,
  onKeyUpdated
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getStoredApiKey());
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveStoredApiKey(apiKeyInput);
    onKeyUpdated(apiKeyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleClear = () => {
    saveStoredApiKey('');
    setApiKeyInput('');
    onKeyUpdated('');
    setSaveSuccess(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-semibold text-slate-100">YouTube Data API v3 Engine</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quota Stats Box */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-lg">
            <div>
              <div className="text-xs text-slate-400">Daily Quota Used</div>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-100">
                {quotaUsed.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {quotaBudget.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Units Preserved</div>
              <div className="text-lg font-bold font-mono tabular-nums text-emerald-400">
                +{quotaSaved.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Search Bypass</div>
              <div className="text-lg font-bold font-mono tabular-nums text-amber-400">
                99% Saved
              </div>
            </div>
          </div>

          {/* Architectural Note */}
          <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-rose-300">Quota Efficiency Architecture: </span>
            YouTube Data API v3 charges <strong className="text-rose-200">100 quota units</strong> per <code className="text-rose-300">search.list</code> call. PulseV3 transforms channel IDs (<code className="text-rose-300">UC...</code> &rarr; <code className="text-rose-300">UU...</code>) into upload playlist calls costing only <strong className="text-emerald-400">1 unit</strong> per batch.
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Optional: YouTube Data API v3 Key
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
            />
            <p className="text-xs text-slate-400">
              If left blank, PulseV3 operates smoothly on our pre-indexed, verified production dataset (Warner, Apple, Prada, emerging artists).
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-2 p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Configuration successfully saved to local session.</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Reset to Verified Dataset
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-sm"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
