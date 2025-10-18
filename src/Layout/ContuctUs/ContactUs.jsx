import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "ফোন",
      details: "+৮৮০ ১৭১২-৩৪৫৬৭৮",
      subdetails: "সোম - শুক্র, ৮:০০ - ৪:০০"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "ইমেইল",
      details: "info@kalamajhischool.edu.bd",
      subdetails: "২৪ ঘন্টা সাপোর্ট"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "ঠিকানা",
      details: "কালামাঝি, রংপুর",
      subdetails: "বাংলাদেশ - ৫৪০০"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "কর্ম সময়",
      details: "সকাল ৮:০০ - বিকাল ৪:০০",
      subdetails: "রবিবার বন্ধ"
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f", color: "from-blue-600 to-blue-700" },
    { name: "YouTube", icon: "▶", color: "from-red-600 to-red-700" },
    { name: "WhatsApp", icon: "W", color: "from-green-500 to-green-600" },
    { name: "Email", icon: "@", color: "from-orange-500 to-amber-500" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            যোগাযোগ করুন
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            আমাদের সাথে যোগাযোগ করতে নিচের তথ্য ব্যবহার করুন
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">{info.details}</p>
                <p className="text-xs text-gray-500">{info.subdetails}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-white rounded-2xl p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full filter blur-3xl opacity-30"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">বার্তা পাঠান</h3>
              {submitted && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-700 font-semibold">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</p>
                </div>
              )}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">নাম *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" placeholder="আপনার নাম লিখুন" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" placeholder="example@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ফোন *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" placeholder="০১৭১২৩৪৫৬৭৮" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">বিষয় *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors" placeholder="বিষয় লিখুন" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">বার্তা *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none" placeholder="আপনার বার্তা লিখুন..."></textarea>
                </div>
                <button onClick={handleSubmit} className="w-full relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    বার্তা পাঠান
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl h-64">
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-700 font-semibold">Map Location</p>
                  <p className="text-sm text-gray-500">কালামাঝি, রংপুর</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full filter blur-3xl opacity-30"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">সোশ্যাল মিডিয়া</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className={`group relative p-4 bg-gradient-to-r ${social.color} text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl font-bold">{social.icon}</div>
                        <span className="font-semibold">{social.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-white">
                  <p className="text-sm font-semibold mb-2">জরুরী যোগাযোগ</p>
                  <p className="text-2xl font-bold">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;