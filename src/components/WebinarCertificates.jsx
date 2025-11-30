import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaDownload } from 'react-icons/fa';

const WebinarCertificates = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [certificates, setCertificates] = useState([]);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  // --- CONFIGURATION ---
  // 1. Publish your Google Sheet to the web as CSV (File > Share > Publish to web > CSV)
  // 2. Paste the link here:
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEswpw8QlytBSRXdc1et31tW01qrrY6QcjiGbSZQbZuNE-odIyG4n8I9CKuMRZI7ZfS0_zu_JFuBuO/pub?gid=0&single=true&output=csv"; 
  // ---------------------

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');
    setCertificates([]);
    setUserName('');

    try {
        if (SHEET_URL.includes("REPLACE")) {
            throw new Error("Configuration missing: Please set the SHEET_URL in the code.");
        }

        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch data.");
        const csvText = await response.text();
        
        if (csvText.trim().startsWith("<!DOCTYPE html") || csvText.includes("<html")) {
             throw new Error("The URL returned HTML instead of CSV. Make sure you published the sheet to the web as CSV (File > Share > Publish to web > CSV).");
        }

        // Robust CSV parser
        const parseCSV = (text) => {
            const result = [];
            let cell = '';
            let row = [];
            let inQuotes = false;
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === '"') {
                    if (inQuotes && text[i + 1] === '"') {
                        cell += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    row.push(cell);
                    cell = '';
                } else if ((char === '\r' || char === '\n') && !inQuotes) {
                    if (char === '\r' && text[i + 1] === '\n') i++;
                    row.push(cell);
                    result.push(row);
                    row = [];
                    cell = '';
                } else {
                    cell += char;
                }
            }
            if (cell || row.length > 0) {
                row.push(cell);
                result.push(row);
            }
            return result;
        };

        const rows = parseCSV(csvText);
        if (rows.length < 2) throw new Error("Sheet is empty or invalid.");

        const header = rows[0].map(c => c.trim().toLowerCase());
        console.log("Detected headers:", header);

        const emailIndex = header.findIndex(h => h.includes('email'));
        const webinarNoIndex = header.findIndex(h => h.includes('webinarno'));
        const topicIndex = header.findIndex(h => h.includes('topic'));
        const speakerIndex = header.findIndex(h => h.includes('speaker'));
        const designationIndex = header.findIndex(h => h.includes('designation'));
        // Look for the URL column
        const linkIndex = header.findIndex(h => h.includes('merged doc url') || h.includes('link to merged doc'));
        const nameIndex = header.findIndex(h => h.includes('name'));

        if (emailIndex === -1 || linkIndex === -1) {
            throw new Error(`Invalid sheet format. Found headers: ${header.join(', ')}. Expected 'Email' and 'Merged Doc URL' columns.`);
        }

        const foundCertificates = [];
        let foundName = '';

        // Iterate through all rows to find matches
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length <= emailIndex) continue;

            const rowEmail = row[emailIndex]?.trim().toLowerCase();
            
            if (rowEmail === email.trim().toLowerCase()) {
                const link = row[linkIndex]?.trim();
                // Only add if we have a valid link
                if (link && link.startsWith('http')) {
                    foundCertificates.push({
                        webinarNo: webinarNoIndex !== -1 ? row[webinarNoIndex]?.trim() : '',
                        topic: topicIndex !== -1 ? row[topicIndex]?.trim() : '',
                        speaker: speakerIndex !== -1 ? row[speakerIndex]?.trim() : '',
                        designation: designationIndex !== -1 ? row[designationIndex]?.trim() : '',
                        link: link
                    });
                    
                    // Capture name from the first match
                    if (!foundName && nameIndex !== -1) {
                        foundName = row[nameIndex]?.trim();
                    }
                }
            }
        }

        if (foundCertificates.length > 0) {
            setCertificates(foundCertificates);
            setUserName(foundName || 'Participant');
            setStatus('success');
            setMessage('');
        } else {
            setStatus('error');
            setMessage('Certificate with that email not found.');
        }

    } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage(err.message || 'An error occurred. Please try again later.');
    }
  };

  const handleShare = async (cert) => {
    const shareText = `I’m happy to share that I attended the session on “${cert.topic || 'Webinar'}” held as part of the 45-Day Webinar Series – IEDC Summit 2025.

The session was led by ${cert.speaker ? (cert.designation ? `${cert.speaker}, ${cert.designation}` : cert.speaker) : 'industry experts'}, and it was a great learning opportunity.

Thank you to IEDC LBS College of Engineering Kasaragod for organizing this.

#IEDCSummit2025 #WebinarSeries #DareToDisrupt #StartupShowcase #KeralaStartupMission #Entrepreneurship #Innovation #LBSCEK #CUK #Kasaragod`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: 'Webinar Certificate',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
      window.open(linkedinUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-clash-display font-bold text-blue-600">
            Download Certificate
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-gilroy-regular">
            Enter your registered email address to download your webinar certificate.
          </p>
          <div className="mt-4">
            <Link to="/webinars/verify" className="text-sm text-blue-600 hover:text-blue-800 font-gilroy-medium underline">
                Verify a Certificate
            </Link>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSearch}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm font-gilroy-regular"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                status === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-gilroy-medium transition-colors duration-200`}
            >
              {status === 'loading' ? 'Searching...' : 'Get Certificate'}
            </button>
          </div>
        </form>

        {message && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-md p-4 ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
            >
                <div className="flex">
                    <div className="ml-3">
                        <div className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'} font-gilroy-medium`}>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        {status === 'success' && certificates.length > 0 && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-center w-full"
            >
                <p className="mb-6 text-gray-700 font-gilroy-medium text-lg">
                    Hello <strong>{userName}</strong>, your certificate{certificates.length > 1 ? 's are' : ' is'} ready!
                </p>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {certificates.map((cert, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-left">
                                <p className="font-clash-display font-semibold text-blue-600">
                                    {cert.webinarNo ? `Webinar #${cert.webinarNo}` : (certificates.length > 1 ? `Certificate #${index + 1}` : 'Webinar Certificate')}
                                </p>
                                {cert.topic && (
                                    <p className="text-sm text-gray-600 font-gilroy-regular mt-1">
                                        {cert.topic}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleShare(cert)}
                                    className="inline-flex items-center justify-center p-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0077b5] hover:bg-[#006396] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b5] transition-colors duration-200"
                                    title="Share on LinkedIn"
                                >
                                    <FaLinkedin size={20} />
                                </button>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                    title="Download PDF"
                                >
                                    <FaDownload size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebinarCertificates;
