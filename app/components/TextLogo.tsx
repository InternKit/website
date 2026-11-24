export function Logo() {
  return (
    <div className="flex flex-row items-center gap-3">
      {/* logo.svg is an opaque raster square; swap for a vector version when design ships one */}
      <img src="/logo.svg" alt="" className="size-9 rounded-sm" />
      <span className="text-h2 font-semibold text-fg-1">InternKit</span>
    </div>
  );
}
