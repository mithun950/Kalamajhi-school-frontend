import React, { useEffect, useState, useRef, useCallback } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Routines = () => {
  const [className, setClassName] = useState("Class-6");
  const [section, setSection] = useState("A");
  const [routines, setRoutines] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const routineRef = useRef();

  // Fetch routines from backend
  const fetchRoutines = useCallback(async () => {
    try {
      const res = await fetch(
        `https://kalamajhi-high-school-backend.vercel.app/routines/${className}/${section}`
      );
      const data = await res.json();
      setRoutines(data);

      // Get unique periods dynamically
      const uniquePeriods = [...new Set(data.map((r) => r.period))];
      setPeriods(uniquePeriods);
    } catch (err) {
      console.error(err);
      setRoutines([]);
      setPeriods([]);
    }
  }, [className, section]);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  // Prepare table data
  const tableData = days.map((day) => ({
    day,
    periods: periods.map((p, index) => {
      const routine = routines.find(
        (r) => r.day === day && r.period === p
      );
      if (routine?.subject.toLowerCase().includes("break"))
        return { subject: "Break", teacher: "", key: `break-${index}` };
      return routine || { subject: "", teacher: "", key: `period-${index}` };
    }),
  }));

  // PDF Download functionality
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Load jsPDF with autoTable plugin
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js');

      const pdf = new window.jspdf.jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(249, 115, 22); // Orange color
      pdf.text(`Class Routine - ${className} Section ${section}`, 148, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Kalamajhi High School', 148, 28, { align: 'center' });

      // Prepare table data
      const headers = ['Day / Period', ...periods];
      const rows = tableData.map(row => {
        return [
          row.day,
          ...row.periods.map(p => {
            if (p.subject.toLowerCase() === 'break') {
              return 'Break Time';
            }
            return p.subject ? `${p.subject}${p.teacher ? '\n(' + p.teacher + ')' : ''}` : '-';
          })
        ];
      });

      // Create table
      pdf.autoTable({
        startY: 35,
        head: [headers],
        body: rows,
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 4,
          valign: 'middle',
          halign: 'center',
          lineColor: [251, 191, 36],
          lineWidth: 0.5
        },
        headStyles: {
          fillColor: [249, 115, 22],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          textColor: [0, 0, 0]
        },
        columnStyles: {
          0: { 
            fillColor: [255, 237, 213],
            fontStyle: 'bold',
            textColor: [234, 88, 12]
          }
        },
        didParseCell: function(data) {
          // Highlight break cells
          if (data.section === 'body' && data.column.index > 0) {
            const cellText = data.cell.text[0];
            if (cellText && cellText.includes('Break')) {
              data.cell.styles.fillColor = [254, 243, 199];
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.textColor = [234, 88, 12];
            }
          }
        },
        margin: { top: 35, left: 10, right: 10 }
      });

      // Add footer info
      const finalY = pdf.lastAutoTable.finalY + 10;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Important Information:', 15, finalY);
      pdf.setFontSize(9);
      pdf.text('• Each period is 45 minutes', 15, finalY + 6);
      pdf.text('• Break time is 20 minutes', 15, finalY + 12);
      pdf.text('• Sunday is weekly holiday', 15, finalY + 18);

      // Save the PDF
      pdf.save(`Routine_${className}_Section_${section}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF download e somossa hoyeche. Please abar try korun.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Helper function to load external scripts
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const dayIcons = {
    Sunday: "🌅",
    Monday: "💼",
    Tuesday: "📚",
    Wednesday: "⚡",
    Thursday: "🎯",
    Friday: "🌟"
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-11/12 max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Class Schedule</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            📅 ক্লাস রুটিন
          </h1>
          <p className="text-gray-700 text-lg">
            আপনার ক্লাসের সাপ্তাহিক রুটিন দেখুন
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center items-center animate-fadeInUp">
          {/* Class Selection */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="relative bg-white px-6 py-3 rounded-xl border-2 border-orange-300 font-bold text-lg text-gray-800 focus:outline-none focus:border-orange-500 shadow-lg hover:shadow-xl transition-all cursor-pointer appearance-none pr-10"
            >
              <option>Class-6</option>
              <option>Class-7</option>
              <option>Class-8</option>
              <option>Class-9</option>
              <option>Class-10</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Section Selection */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="relative bg-white px-6 py-3 rounded-xl border-2 border-orange-300 font-bold text-lg text-gray-800 focus:outline-none focus:border-orange-500 shadow-lg hover:shadow-xl transition-all cursor-pointer appearance-none pr-10"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isGeneratingPDF ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </span>
            {!isGeneratingPDF && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            )}
          </button>
        </div>

        {/* Current Selection Display */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-xl border-2 border-orange-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600 font-semibold">Selected Class</p>
              <p className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {className} - Section {section}
              </p>
            </div>
          </div>
        </div>

        {/* Routine Table */}
        <div ref={routineRef} className="overflow-x-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-orange-200">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                  <th className="border-2 border-orange-300 p-4 text-white font-bold text-lg sticky left-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 z-10">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Day / Period
                    </div>
                  </th>
                  {periods.map((p, index) => (
                    <th
                      key={index}
                      className="border-2 border-orange-300 p-4 text-white font-bold text-base min-w-[150px]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {p}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr
                    key={row.day}
                    className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-orange-50/30'
                    }`}
                  >
                    <td className="border-2 border-orange-200 p-4 font-bold text-orange-600 sticky left-0 bg-white z-10">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">{dayIcons[row.day]}</span>
                        <span className="text-lg">{row.day}</span>
                      </div>
                    </td>
                    {row.periods.map((r, periodIndex) => (
                      <td
                        key={`${row.day}-${periodIndex}`}
                        className={`border-2 border-orange-200 p-4 transition-all duration-300 ${
                          r.subject.toLowerCase() === 'break'
                            ? 'bg-gradient-to-br from-yellow-100 to-amber-100'
                            : ''
                        }`}
                      >
                        {r.subject ? (
                          <div className="space-y-2">
                            {r.subject.toLowerCase() === 'break' ? (
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div className="font-bold text-orange-600 text-lg">☕ Break Time</div>
                              </div>
                            ) : (
                              <>
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1.5 rounded-lg border border-orange-200">
                                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                  <span className="font-bold text-gray-800">{r.subject}</span>
                                </div>
                                {r.teacher && (
                                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-semibold">{r.teacher}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">—</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                গুরুত্বপূর্ণ তথ্য
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  প্রতিটি পিরিয়ড ৪৫ মিনিটের
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  ব্রেক টাইম ২০ মিনিট
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  রবিবার সাপ্তাহিক ছুটি
                </li>
              </ul>
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
    </section>
  );
};

export default Routines;