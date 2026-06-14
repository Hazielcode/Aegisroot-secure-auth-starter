export default function AuthCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div 
      className={`relative w-full max-w-[420px] mx-auto p-10 rounded-[24px] animate-fadeInUp transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid var(--ag-border)',
        boxShadow: 'var(--ag-card-shadow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.12), 0 1px 0 rgba(255, 255, 255, 0.9) inset';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--ag-card-shadow)';
      }}
    >
      {children}
    </div>
  );
}
