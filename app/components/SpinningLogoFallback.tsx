export function SpinningLogoFallback() {
  return (
    <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
      <img
        src="/logo.svg"
        alt="Internkit"
        className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain"
      />
    </div>
  );
}

export function LoadingFallback() {
  return null;
}
