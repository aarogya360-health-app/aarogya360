import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-teal-900 via-navy-900 to-teal-950 text-white py-3 px-4 sm:px-6 border-b border-emerald-500/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <span>
            <strong className="font-semibold text-emerald-300">Medical Safety Notice:</strong> Aarogya360 is an informational and health organization platform. It does not provide medical diagnosis, treatment, or drug prescriptions.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/disclaimer"
            className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2 transition-colors font-medium text-xs"
          >
            Read Medical Policy
          </Link>
          <span className="text-emerald-500/40">•</span>
          <span className="flex items-center gap-1 text-mint-200 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Emergency? Dial 112 / 911
          </span>
        </div>
      </div>
    </div>
  );
};
