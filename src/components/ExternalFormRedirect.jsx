import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ExternalFormRedirect = () => {
  const { formName } = useParams();

  const overrides = {
    "LBS-Participants":
      "https://docs.google.com/spreadsheets/d/1bGirCbs-ZU7TK6-dPJb_BEGLzCoz0tqoGGFQGX2dxOw/edit?gid=0#gid=0",
  };

  const externalUrl = overrides[formName] ?? `https://tickets.startupmission.in/iedcsummit25-${formName}`;

  useEffect(() => {
    // Redirect to the external form URL
    window.location.href = externalUrl;
  }, [externalUrl]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <p className="text-blue-600 font-clash-display text-lg mb-2">
          Redirecting to form...
        </p>
        <p className="text-blue-400 font-gilroy-medium">
          If you are not redirected, click <a href={externalUrl} className="text-blue-600 underline">here</a>
        </p>
      </div>
    </div>
  );
};

export default ExternalFormRedirect;
