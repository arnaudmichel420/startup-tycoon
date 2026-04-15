export default function ClickButton({ clickValue, onClick }) {
  return (
    <div className="flex items-center gap-2 ">
      <div className="btn-primary" onClick={onClick}>
        Développer
      </div>
      <span>+{clickValue}$ / clic”</span>
    </div>
  );
}
