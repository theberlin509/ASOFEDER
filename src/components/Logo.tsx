import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-10 sm:h-12 w-auto max-w-[220px]",
  showText = false,
  lightMode = false
}) => {
  // Try custom user logo paths in order:
  // 1. /logo/logo asofeder.png
  // 2. /logo/logo%20asofeder.png
  // 3. /logo/logo.png
  // 4. /logo/logo.svg
  // 5. /logo.png
  // 6. /logo.svg
  const logoCandidates = [
    '/logo/logo asofeder.png',
    '/logo/logo%20asofeder.png',
    '/logo/logo.png',
    '/logo/logo.svg',
    '/logo.png',
    '/logo.svg',
  ];

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImgError = () => {
    if (candidateIndex < logoCandidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const currentLogoSrc = logoCandidates[candidateIndex];

  return (
    <div className="flex items-center gap-3 group">
      {!hasError ? (
        <img
          src={currentLogoSrc}
          alt="ASOFEDER Logo"
          onError={handleImgError}
          className={`${className} object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform`}
        />
      ) : (
        <div className={`${className} rounded-xl bg-gradient-to-br from-[#006b2d] to-[#1e3aa1] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
          AS
        </div>
      )}

      {showText && (
        <div>
          <span className={`font-heading font-black text-lg sm:text-xl tracking-tight block transition ${
            lightMode ? 'text-white' : 'text-slate-900 group-hover:text-[#006b2d]'
          }`}>
            ASOFEDER
          </span>
          <span className={`text-[10px] font-medium block leading-none ${
            lightMode ? 'text-slate-300' : 'text-slate-500'
          }`}>
            Port-de-Paix • Nord-Ouest, Haïti
          </span>
        </div>
      )}
    </div>
  );
};
