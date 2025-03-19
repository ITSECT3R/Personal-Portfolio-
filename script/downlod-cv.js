const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = '/resources/CV-Luis-Angel-Marin-Rodriguez-2025_compressed.pdf';
  link.download = 'CV-Luis-Angel-Marin-Rodriguez-2025_compressed';
  link.click();
});