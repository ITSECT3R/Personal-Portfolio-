import { useState } from 'react';

export interface UseDownloadCVReturn {
  downloadCV: () => Promise<void>;
  isDownloading: boolean;
}

export function useDownloadCV(): UseDownloadCVReturn {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCV = async (): Promise<void> => {
    setIsDownloading(true);

    try {
      const pdfUrl = '/CV-Luis-Angel-Marin-Rodriguez_compressed.pdf';

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'CV-Luis-Angel-Marin-Rodriguez_compressed.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadCV,
    isDownloading,
  };
}
