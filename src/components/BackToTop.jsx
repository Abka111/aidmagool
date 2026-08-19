'use client';

import { ChevronUp } from 'lucide-react';

const BackToTop = () => (
  <button
    type="button"
    className="back-to-top"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    Back to top
    <ChevronUp aria-hidden="true" />
  </button>
);

export default BackToTop;
