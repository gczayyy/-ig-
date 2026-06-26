import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-brand-dark mb-3">404</h1>
      <p className="text-muted mb-6">找不到這個頁面</p>
      <Link href="/" className="rounded-full bg-red-flag text-white px-6 py-2.5 text-sm font-semibold hover:bg-red-dark transition">
        返回首頁
      </Link>
    </div>
  );
}
