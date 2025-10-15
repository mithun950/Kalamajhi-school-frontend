import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Auto update year

  return (
    <footer className="bg-gradient-to-br from-orange-500 via-orange-400 to-orange-500 text-white pt-12 shadow-2xl">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">কালামাঝি উচ্চ বিদ্যালয়</h2>
          <p className="text-sm md:text-base text-center md:text-left leading-relaxed text-orange-50">
            আমাদের প্রতিষ্ঠান মানসম্পন্ন শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ। শিক্ষার্থীদের সেরা সহায়তা দেওয়াই আমাদের লক্ষ্য।
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-md">Quick Links</h3>
          <ul className="text-sm md:text-base space-y-3">
            <li>
              <a href="/" className="hover:underline hover:text-orange-100 transition-all duration-300 flex items-center justify-center md:justify-start gap-2">
                <span className="text-lg">🏠</span> Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline hover:text-orange-100 transition-all duration-300 flex items-center justify-center md:justify-start gap-2">
                <span className="text-lg">ℹ️</span> About Us
              </a>
            </li>
            <li>
              <a href="/admissions" className="hover:underline hover:text-orange-100 transition-all duration-300 flex items-center justify-center md:justify-start gap-2">
                <span className="text-lg">📝</span> Admissions
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-orange-100 transition-all duration-300 flex items-center justify-center md:justify-start gap-2">
                <span className="text-lg">✉️</span> Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-md">Contact Us</h3>
          <div className="space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-2 hover:text-orange-100 transition-colors duration-300">
              <span className="text-xl">📍</span> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2 hover:text-orange-100 transition-colors duration-300">
              <span className="text-xl">📧</span> info@kalamajhi.edu.bd
            </p>
            <p className="flex items-center gap-2 hover:text-orange-100 transition-colors duration-300">
              <span className="text-xl">📞</span> +880 1234 567890
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex mt-6 space-x-4">
            <a 
              href="#" 
              className="text-2xl hover:text-orange-100 hover:scale-125 transition-all duration-300 transform hover:-translate-y-1"
              title="Website"
            >
              🌐
            </a>
            <a 
              href="#" 
              className="text-2xl hover:text-orange-100 hover:scale-125 transition-all duration-300 transform hover:-translate-y-1"
              title="Twitter"
            >
              🐦
            </a>
            <a 
              href="#" 
              className="text-2xl hover:text-orange-100 hover:scale-125 transition-all duration-300 transform hover:-translate-y-1"
              title="Facebook"
            >
              📘
            </a>
            <a 
              href="#" 
              className="text-2xl hover:text-orange-100 hover:scale-125 transition-all duration-300 transform hover:-translate-y-1"
              title="Instagram"
            >
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t-2 border-orange-300 bg-gradient-to-r from-orange-600 to-orange-500 pt-6 pb-6 text-center text-sm md:text-base">
        <p className="mb-2 font-medium">
          Developed by <span className="font-bold text-orange-100 drop-shadow">Methunur Rashid Rony</span> <span className="text-orange-200">(Alumnus)</span>
        </p>
        <p className="text-orange-50 font-medium">
          © {currentYear} কালামাঝি উচ্চ বিদ্যালয়. সকল অধিকার সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;