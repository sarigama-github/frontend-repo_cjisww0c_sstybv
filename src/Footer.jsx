export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rose-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="text-rose-900 font-semibold mb-2">Brahmin Samaj</h3>
          <p className="text-gray-600">A community-first matrimonial platform celebrating culture, values, and lasting relationships.</p>
        </div>
        <div>
          <h3 className="text-rose-900 font-semibold mb-2">Contact</h3>
          <p className="text-gray-600">Email: support@brahminsamaj.org</p>
          <p className="text-gray-600">Phone: +91-80000-12345</p>
          <p className="text-gray-600">Address: Community Center, Pune, India</p>
        </div>
        <div>
          <h3 className="text-rose-900 font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-600 space-y-1">
            <li>Trust & Safety</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 bg-rose-50">© {new Date().getFullYear()} Brahmin Samaj Matrimonial. All rights reserved.</div>
    </footer>
  )
}
