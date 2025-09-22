import React from 'react';
import { Quote, CompanyProfile } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface TemplateProps {
  quote: Quote;
  company: CompanyProfile;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ quote, company }) => {
  const subtotal = quote.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const vatAmount = subtotal * (quote.vatRate / 100);
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="bg-white text-xs font-sans text-gray-800">
        <style>{`
            .creative-header { background-color: ${company.primaryColor}; }
            .creative-footer { background-color: ${company.primaryColor}; }
            .total-box { background-color: ${company.primaryColor}20; } /* 20 is hex for 12.5% opacity */
            .total-box-grand { background-color: ${company.primaryColor}; }
        `}</style>

        {/* Header */}
        <header className="creative-header text-white p-8 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold">{company.name}</h1>
                <p className="text-lg opacity-90">{company.tagline}</p>
            </div>
            <div>
                {company.logoBase64 && <img src={company.logoBase64} alt="Company Logo" className="max-h-20 max-w-full object-contain bg-white p-2 rounded-md" />}
            </div>
        </header>

        <main className="p-8 grid grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <section className="col-span-1 space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-2" style={{color: company.primaryColor}}>QUOTATION</h2>
                    <p className="font-mono bg-gray-100 p-2 rounded inline-block">{quote.quoteNumber}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-2">Billed To</h3>
                    <p className="text-base font-semibold">{quote.customerName}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-2">Details</h3>
                    <p><strong>Date:</strong> {quote.date}</p>
                    <p><strong>Validity:</strong> {quote.validity}</p>
                </div>
                 <div>
                    <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</h3>
                    <p>{quote.subject}</p>
                </div>
            </section>

            {/* Right Column: Line Items & Totals */}
            <section className="col-span-2 space-y-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2" style={{borderColor: company.primaryColor}}>
                            <th className="p-2 text-left font-bold uppercase text-gray-600 tracking-wider">Description</th>
                            <th className="p-2 w-20 text-center font-bold uppercase text-gray-600 tracking-wider">Qty</th>
                            <th className="p-2 w-28 text-right font-bold uppercase text-gray-600 tracking-wider">Unit Price</th>
                            <th className="p-2 w-28 text-right font-bold uppercase text-gray-600 tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quote.lineItems.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="p-3 align-top">{item.description}</td>
                            <td className="p-3 text-center align-top">{item.quantity}</td>
                            <td className="p-3 text-right align-top">{formatCurrency(item.unitPrice, quote.currency)}</td>
                            <td className="p-3 text-right align-top">{formatCurrency(item.quantity * item.unitPrice, quote.currency)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="flex justify-end">
                    <div className="w-3/4 sm:w-2/3 lg:w-1/2 space-y-2 text-sm rounded-lg overflow-hidden total-box">
                        <div className="flex justify-between p-3">
                            <span className="font-semibold">Subtotal:</span>
                            <span>{formatCurrency(subtotal, quote.currency)}</span>
                        </div>
                        <div className="flex justify-between p-3">
                            <span className="font-semibold">VAT ({quote.vatRate}%):</span>
                            <span>{formatCurrency(vatAmount, quote.currency)}</span>
                        </div>
                        <div className="flex justify-between p-4 font-bold text-lg text-white total-box-grand">
                            <span>Grand Total:</span>
                            <span>{formatCurrency(grandTotal, quote.currency)}</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        {/* Footer */}
        <footer className="creative-footer text-white p-8 mt-8 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-bold text-base mb-2">Contact Us</h4>
                    <p>{company.contactPerson}</p>
                    <p className="whitespace-pre-wrap">{company.address}</p>
                </div>
                <div>
                    <h4 className="font-bold text-base mb-2">Bank Details</h4>
                    <p className="whitespace-pre-wrap">{company.bankDetails}</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-2xl font-semibold">Thank You!</p>
                </div>
            </div>
        </footer>
    </div>
  );
};
