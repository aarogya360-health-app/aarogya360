import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-teal-800 text-mint-100 flex items-center justify-center shadow-lg">
        <Activity className="w-8 h-8 text-emerald-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-navy-800 font-display">404</h1>
        <h2 className="text-xl font-bold text-navy-700">Page Not Found</h2>
        <p className="text-sm text-navy-600 max-w-sm mx-auto">
          The requested health space path does not exist or may have been relocated.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Return to Aarogya360 Home
        </Button>
      </Link>
    </div>
  );
};
