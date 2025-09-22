
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (element: HTMLElement, fileName: string): Promise<void> => {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 dimensions in points: 595.28 x 841.89
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ratio = canvasWidth / canvasHeight;

  let imgWidth = pdfWidth;
  let imgHeight = imgWidth / ratio;
  
  // If the image height is greater than the PDF height, scale it down.
  if (imgHeight > pdfHeight) {
    imgHeight = pdfHeight;
    imgWidth = imgHeight * ratio;
  }
  
  // Center the image on the page
  const x = (pdfWidth - imgWidth) / 2;
  const y = 0; // Start from top

  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(fileName);
};
