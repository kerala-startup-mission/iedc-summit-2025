import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ExternalFormRedirect = () => {
  const { formName } = useParams();

  useEffect(() => {
    // Redirect to the external form URL
    const externalUrl = `https://tickets.startupmission.in/iedcsummit25-${formName}`;
    window.location.href = externalUrl;
  }, [formName]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <p className="text-blue-600 font-clash-display text-lg mb-2">
          Redirecting to form...
        </p>
        <p className="text-blue-400 font-gilroy-medium">
          If you are not redirected, click <a href={`https://tickets.startupmission.in/iedcsummit25-${formName}`} className="text-blue-600 underline">here</a>
        </p>
      </div>
    </div>
  );
};

export default ExternalFormRedirect;
