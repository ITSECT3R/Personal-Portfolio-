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
      // TODO: Replace with actual PDF path once uploaded
      // For now, create a placeholder download
      // const pdfUrl = '/data/cv/luis-marin-cv.pdf'; // If in public/data/cv/
      // const pdfUrl = '../components/common/data/luis-marin-cv.pdf'; // If in src/components/common/data/

      // Placeholder: Create a simple text file for now
      const cvContent = `
LUIS A. MARIN - CV
Full-Stack Developer

TODO: Replace this placeholder with actual PDF download
Place your CV PDF at: src/components/common/data/luis-marin-cv.pdf
Or in public/data/cv/luis-marin-cv.pdf for direct access
      `.trim();

      const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Luis_Marin_CV.txt';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
