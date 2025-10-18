import { useEffect, useState } from "react";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function AdmissionForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    fatherName: "",
    motherName: "",
    village: "",
    union: "",
    upozila: "",
    zila: "",
    guardianPhone: "",
  });

  const [status, setStatus] = useState(null); // pending / done / null
  const [admissionOpen, setAdmissionOpen] = useState(true);

  // Admission status check
  const fetchStatus = () => {
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/admission-status")
      .then((res) => res.json())
      .then((data) => setAdmissionOpen(data.isOpen))
      .catch((err) => console.error(err));
  };

  // Student info check
  const fetchStudent = () => {
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/admissions")
      .then((res) => res.json())
      .then((data) => {
        const student = data[0];
        if (student) {
          setForm(student);
          setStatus(student.status); // status set করলাম
        } else {
          setStatus(null); // কোনো student নাই
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStatus();
    fetchStudent();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://kalamajhi-high-school-backend.vercel.app/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setStatus("pending"); // form submit হলে pending হবে
    } catch (err) {
      console.error(err);
    }
  };

  // Admission বন্ধ থাকলে
  if (!admissionOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-lg w-full relative z-10 animate-fadeInUp">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Admission Closed</h2>
              <p className="text-red-100">ভর্তি বর্তমানে বন্ধ রয়েছে</p>
            </div>

            {/* Body */}
            <div className="p-8 text-center">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
                <p className="text-red-700 text-xl font-semibold mb-2">
                  ❌ Online admission is currently closed!
                </p>
                <p className="text-red-600 text-sm">
                  অনলাইন ভর্তি বর্তমানে বন্ধ রয়েছে
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Please check back later for updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-10 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Student Admission Portal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            📝 ভর্তি ফরম
          </h2>
          <p className="text-gray-700 text-lg">
            Admission Form - Online Application
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200 animate-fadeInUp">
          {/* Pending Message */}
          {status === "pending" && (
            <div className="p-8">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-8 border-yellow-500 rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <FaHourglassHalf className="text-white text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-700 mb-2">
                      ⏳ Pending Approval
                    </h3>
                    <p className="text-yellow-700 text-lg font-semibold mb-1">
                      Your admission is pending.
                    </p>
                    <p className="text-yellow-600">
                      আপনার ভর্তি অপেক্ষমান অবস্থায় রয়েছে
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-yellow-700 font-semibold">Please wait for confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmed Message */}
          {status === "done" && (
            <div className="p-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-500 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center gap-4 text-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <FaCheckCircle className="relative text-green-500 text-8xl drop-shadow-2xl" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                      🎉 Congratulations!
                    </h3>
                    <p className="text-green-700 text-xl font-semibold mb-1">
                      Your admission is confirmed!
                    </p>
                    <p className="text-green-600 text-lg">
                      আপনার ভর্তি নিশ্চিত হয়েছে
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-100 px-6 py-2 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-700 font-semibold">Admission Approved</span>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        ⚠️ বিশেষ দ্রষ্টব্য (Important Notice)
                      </h4>
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                        <p className="text-gray-800 leading-relaxed">
                          <strong className="text-orange-700">প্রথম ক্লাসের দিন</strong> আপনার পাসপোর্ট সাইজের <strong className="text-amber-700">২ কপি ছবি</strong>, বাবা-মায়ের <strong className="text-amber-700">জাতীয় পরিচয়পত্রের ফটোকপি</strong>, <strong className="text-amber-700">পিএসসি মার্কশিটের ফটোকপি</strong> অথবা আগের স্কুলের <strong className="text-amber-700">অনুমতিপত্র</strong> নিয়ে এসে অফিসে জমা দিতে হবে।
                        </p>
                        <div className="mt-3 bg-red-100 border-l-4 border-red-500 p-3 rounded">
                          <p className="text-red-700 font-bold text-sm">
                            ⚠️ না হলে ভর্তি বাতিল বলে গণ্য করা হবে।
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Required Documents List */}
                  <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h5 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Required Documents:
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold mt-1">✓</span>
                        <span>২ কপি পাসপোর্ট সাইজ ছবি (2 passport size photos)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold mt-1">✓</span>
                        <span>বাবা-মায়ের জাতীয় পরিচয়পত্রের ফটোকপি (Parents' NID photocopy)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold mt-1">✓</span>
                        <span>পিএসসি মার্কশিট / আগের স্কুলের অনুমতিপত্র (PSC marksheet / Previous school certificate)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form - শুধুমাত্র তখনই দেখাবে যখন status null হবে */}
          {status === null && (
            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                  Fill in Your Details
                </h3>
                <p className="text-gray-600">আপনার তথ্য পূরণ করুন</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(form).map((key, index) => (
                  <div key={key} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
                    <label className="flex text-sm font-semibold text-gray-700 mb-2  items-center gap-2">
                      <span className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </span>
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    </label>
                    <input
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                      className="w-full border-2 border-orange-200 p-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                ))}
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mt-6"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg">Submit Application</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">
                Need Help?
              </h3>
              <p className="text-gray-600 text-sm">
                সাহায্যের প্রয়োজন হলে স্কুল অফিসে যোগাযোগ করুন
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}