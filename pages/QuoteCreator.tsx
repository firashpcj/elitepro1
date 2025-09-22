import React, { useState, useRef } from 'react';
import { QuoteForm } from '../components/QuoteForm';
import { Quote, CompanyProfile, QuoteTemplate } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_PROFILES_KEY } from '../constants';
import { QuotePreview } from '../components/QuotePreview';
import { generatePdf } from '../utils/pdfGenerator';
import { Button } from '../components/Button';
import { DownloadIcon } from '../components/icons/Icons';

const initialQuoteState: Quote = {
  id: '',
  quoteNumber: `Q-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
  date: new Date().toISOString().split('T')[0],
  validity: '30 Days',
  customerName: '',
  subject: '',
  companyProfileId: '',
  lineItems: [{ id: new Date().toISOString(), description: '', quantity: 1, unitPrice: 0 }],
  vatRate: 15,
  currency: 'USD',
  template: QuoteTemplate.STANDARD,
};

export const QuoteCreator: React.FC = () => {
  const [profiles] = useLocalStorage<CompanyProfile[]>(LOCAL_STORAGE_PROFILES_KEY, []);
  const [currentQuote, setCurrentQuote] = useState<Quote>(initialQuoteState);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!previewRef.current || !currentQuote) return;
    setIsLoading(true);
    try {
        await generatePdf(previewRef.current, `Quotation_${currentQuote.quoteNumber}.pdf`);
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error generating the PDF.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleNextDesign = () => {
    const templates = Object.values(QuoteTemplate);
    const currentIndex = templates.indexOf(currentQuote.template);
    const nextIndex = (currentIndex + 1) % templates.length;
    const nextTemplate = templates[nextIndex];
    setCurrentQuote(prevQuote => ({ ...prevQuote, template: nextTemplate }));
  };
  
  const selectedProfile = profiles.find(p => p.id === currentQuote?.companyProfileId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <QuoteForm 
        profiles={profiles} 
        quote={currentQuote}
        onQuoteChange={setCurrentQuote}
      />
      
      <div>
        <div className="sticky top-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
                <div className="flex items-center space-x-2">
                    {selectedProfile && (
                        <>
                            <Button onClick={handleNextDesign} variant="secondary">
                                Next Design
                            </Button>
                            <Button onClick={handleDownloadPdf} isLoading={isLoading}>
                                <DownloadIcon className="h-5 w-5 mr-2"/>
                                Download PDF
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md aspect-[8.5/11] overflow-auto">
                {selectedProfile ? (
                    <div ref={previewRef}>
                        <QuotePreview quote={currentQuote} company={selectedProfile} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-center p-4">
                        <p>
                            {profiles.length > 0
                                ? "Complete the form to see a preview."
                                : "Please create a Company Profile in the Profile Manager to begin."}
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>
      
    </div>
  );
};