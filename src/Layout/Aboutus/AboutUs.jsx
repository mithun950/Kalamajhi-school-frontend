import React, { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("history");

  const stats = [
    { label: "প্রতিষ্ঠা", value: "1985", icon: "🏫" },
    { label: "শিক্ষার্থী", value: "1200+", icon: "👨‍🎓" },
    { label: "শিক্ষক", value: "50+", icon: "👨‍🏫" },
    { label: "সফলতার হার", value: "98%", icon: "🏆" }
  ];

  const tabs = [
    { id: "history", label: "ইতিহাস", icon: "📜" },
    { id: "vision", label: "আমাদের লক্ষ্য", icon: "🎯" },
    { id: "mission", label: "আমাদের উদ্দেশ্য", icon: "🚀" },
    { id: "values", label: "মূল্যবোধ", icon: "💎" }
  ];

  const content = {
    history: {
      title: "আমাদের ইতিহাস",
      text: " কালামাঝি উচ্চ বিদ্যালয় ১৯৮৫ সালে প্রতিষ্ঠিত হয়। গত চার দশক ধরে আমরা গ্রামীণ শিক্ষার মান উন্নয়নে কাজ করে যাচ্ছি। আমাদের প্রতিষ্ঠানটি শুরু থেকেই মানসম্পন্ন শিক্ষা প্রদানের লক্ষ্যে নিবেদিত। অসংখ্য মেধাবী শিক্ষার্থী এই প্রতিষ্ঠান থেকে শিক্ষা লাভ করে দেশ ও জাতির সেবায় নিয়োজিত আছেন।"
    },
    vision: {
      title: "আমাদের দৃষ্টিভঙ্গি",
      text: "আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থীর মধ্যে অসীম সম্ভাবনা রয়েছে। আমাদের লক্ষ্য হলো একটি আধুনিক, প্রযুক্তিনির্ভর এবং মানবিক মূল্যবোধ সম্পন্ন শিক্ষা প্রতিষ্ঠান গড়ে তোলা। যেখানে প্রতিটি শিক্ষার্থী তার সর্বোচ্চ সম্ভাবনা বিকশিত করতে পারে এবং দেশের উন্নয়নে অবদান রাখতে পারে।"
    },
    mission: {
      title: "আমাদের মিশন",
      text: "মানসম্পন্ন শিক্ষা প্রদান, নৈতিক মূল্যবোধ সৃষ্টি, এবং শিক্ষার্থীদের সার্বিক উন্নয়ন নিশ্চিত করা আমাদের মূল উদ্দেশ্য। আমরা শিক্ষার্থীদের বই পড়ার পাশাপাশি ব্যবহারিক জ্ঞান, সৃজনশীলতা এবং নেতৃত্বের গুণাবলী বিকাশে সহায়তা করি। প্রতিটি শিক্ষার্থীকে আগামীর যোগ্য নাগরিক হিসেবে গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।"
    },
    values: {
      title: "আমাদের মূল্যবোধ",
      text: "সততা, শৃঙ্খলা, শ্রদ্ধাবোধ এবং কঠোর পরিশ্রম - এই চারটি মূল্যবোধ আমাদের প্রতিষ্ঠানের ভিত্তি। আমরা বিশ্বাস করি এই মূল্যবোধগুলো শিক্ষার্থীদের জীবনে সফল হতে সাহায্য করবে। আমরা শিক্ষার্থীদের মধ্যে সামাজিক দায়বদ্ধতা, পরিবেশ সচেতনতা এবং মানবিক গুণাবলী বিকাশে উৎসাহিত করি।"
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-11/12 mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="text-xl">🏫</span>
            <span>About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
             কালামাঝি উচ্চ বিদ্যালয় সম্পর্কে
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            শিক্ষা, মূল্যবোধ এবং উৎকর্ষতার প্রতি আমাদের অঙ্গীকার
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="absolute inset-[2px] bg-white rounded-2xl"></div>

              <div className="relative text-center">
                {/* Icon */}
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                {/* Value */}
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-sm text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Tabs Navigation */}
          <div className="space-y-3">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 animate-fadeInLeft ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100 shadow-md"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                  <svg
                    className={`ml-auto w-5 h-5 transition-transform duration-300 ${
                      activeTab === tab.id ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            <div className="relative bg-white rounded-2xl p-8 shadow-xl overflow-hidden animate-fadeIn">
              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full filter blur-3xl opacity-30"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6">
                  {content[activeTab].title}
                </h3>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full mb-6"></div>

                {/* Text Content */}
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  {content[activeTab].text}
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">মানসম্পন্ন শিক্ষা</p>
                      <p className="text-xs text-gray-600">উন্নত শিক্ষা ব্যবস্থা</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">অভিজ্ঞ শিক্ষক</p>
                      <p className="text-xs text-gray-600">দক্ষ শিক্ষকমণ্ডলী</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">আধুনিক সুবিধা</p>
                      <p className="text-xs text-gray-600">প্রযুক্তি নির্ভর</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">সাফল্যের রেকর্ড</p>
                      <p className="text-xs text-gray-600">৯৮% পাসের হার</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-8xl font-serif opacity-10 leading-none">
                    "
                  </div>
                  <p className="relative z-10 italic text-lg">
                    "শিক্ষাই জাতির মেরুদণ্ড - আমরা প্রতিটি শিক্ষার্থীকে শক্তিশালী করে গড়ে তুলি"
                  </p>
                </div>
              </div>
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;