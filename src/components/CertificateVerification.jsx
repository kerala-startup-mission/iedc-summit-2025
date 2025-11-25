import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CertificateVerification = () => {
  const [certId, setCertId] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState('');

  // --- CONFIGURATION ---
  // Same sheet URL as WebinarCertificates
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEswpw8QlytBSRXdc1et31tW01qrrY6QcjiGbSZQbZuNE-odIyG4n8I9CKuMRZI7ZfS0_zu_JFuBuO/pub?gid=0&single=true&output=csv"; 
  // ---------------------

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId) return;

    setStatus('loading');
    setMessage('');
    setCertificate(null);

    try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch data.");
        const csvText = await response.text();
        
        if (csvText.trim().startsWith("<!DOCTYPE html") || csvText.includes("<html")) {
             throw new Error("Data source error.");
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
        if (rows.length < 2) throw new Error("No data found.");

        const header = rows[0].map(c => c.trim().toLowerCase());
        
        // Find columns
        const certIdIndex = header.findIndex(h => h.includes('id') || h.includes('cert id') || h.includes('id'));
        const nameIndex = header.findIndex(h => h.includes('name'));
        const webinarNoIndex = header.findIndex(h => h.includes('webinarno'));
        const topicIndex = header.findIndex(h => h.includes('topic'));
        const speakerIndex = header.findIndex(h => h.includes('speaker'));
        const designationIndex = header.findIndex(h => h.includes('designation'));

        if (certIdIndex === -1) {
            throw new Error("Verification is not available at this time (Certificate ID column missing).");
        }

        let foundCert = null;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length <= certIdIndex) continue;

            const rowCertId = row[certIdIndex]?.trim();
            
            if (rowCertId && rowCertId.toLowerCase() === certId.trim().toLowerCase()) {
                foundCert = {
                    id: rowCertId,
                    name: nameIndex !== -1 ? row[nameIndex]?.trim() : 'Participant',
                    webinarNo: webinarNoIndex !== -1 ? row[webinarNoIndex]?.trim() : '',
                    topic: topicIndex !== -1 ? row[topicIndex]?.trim() : '',
                    speaker: speakerIndex !== -1 ? row[speakerIndex]?.trim() : '',
                    designation: designationIndex !== -1 ? row[designationIndex]?.trim() : ''
                };
                break;
            }
        }

        if (foundCert) {
            setCertificate(foundCert);
            setStatus('success');
            setMessage('Certificate Verified Successfully');
        } else {
            setStatus('error');
            setMessage('Invalid Certificate ID. Please check and try again.');
        }

    } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage(err.message || 'An error occurred during verification.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-clash-display font-bold text-blue-600">
            Verify Certificate
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-gilroy-regular">
            Enter the Certificate ID to verify its authenticity.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="cert-id" className="sr-only">
                Certificate ID
              </label>
              <input
                id="cert-id"
                name="certId"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm font-gilroy-regular"
                placeholder="Certificate ID"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
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
              {status === 'loading' ? 'Verifying...' : 'Verify Certificate'}
            </button>
          </div>
        </form>

        {message && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-md p-4 ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
            >
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {status === 'success' ? (
                            <FaCheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                            <FaTimesCircle className="h-5 w-5 text-red-400" />
                        )}
                    </div>
                    <div className="ml-3">
                        <p className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'} font-gilroy-medium`}>
                            {message}
                        </p>
                    </div>
                </div>
            </motion.div>
        )}

        {status === 'success' && certificate && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 w-full bg-white shadow rounded-lg overflow-hidden border border-gray-200"
            >
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 font-clash-display">
                        Certificate Details
                    </h3>
                    <div className="mt-5 border-t border-gray-200">
                        <dl className="divide-y divide-gray-200">
                            <div className="py-3 flex justify-between text-sm font-medium">
                                <dt className="text-gray-500">Issued To</dt>
                                <dd className="text-gray-900">{certificate.name}</dd>
                            </div>
                            {certificate.webinarNo && (
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Webinar</dt>
                                    <dd className="text-gray-900">#{certificate.webinarNo}</dd>
                                </div>
                            )}
                            {certificate.topic && (
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Topic</dt>
                                    <dd className="text-gray-900 text-right max-w-[60%]">{certificate.topic}</dd>
                                </div>
                            )}
                            {certificate.speaker && (
                                <div className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-gray-500">Speaker</dt>
                                    <dd className="text-gray-900 text-right">
                                        {certificate.speaker}
                                        {certificate.designation && <span className="block text-xs text-gray-500">{certificate.designation}</span>}
                                    </dd>
                                </div>
                            )}
                            <div className="py-3 flex justify-between text-sm font-medium">
                                <dt className="text-gray-500">Certificate ID</dt>
                                <dd className="text-gray-900">{certificate.id}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="bg-green-50 px-4 py-4 sm:px-6">
                    <div className="text-sm text-green-700 font-gilroy-medium text-center">
                        This is a valid certificate issued by IEDC Summit 2025.
                    </div>
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default CertificateVerification;
