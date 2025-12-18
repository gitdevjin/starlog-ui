import logo from "@/assets/logo.png";
export default function GlobalLoading() {
  return (
    <div className="bg-muted flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-15 flex animate-bounce items-center gap-4">
        <img src={logo} alt="Logo" className="w-10" />
        <div className="text-2xl font-bold">Daily Log</div>
      </div>
    </div>
  );
}
