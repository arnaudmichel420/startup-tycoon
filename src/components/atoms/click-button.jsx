export default function ClickButton({ clickValue, onClick }) {
  return (
    <div className="flex items-center gap-2 ">
      <div
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-95"
        onClick={onClick}
      >
        Développer
      </div>
      <span>+{clickValue}$ / clic”</span>
    </div>
  );
}
