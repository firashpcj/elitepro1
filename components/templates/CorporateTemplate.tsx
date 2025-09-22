import React from 'react';
import { Quote, CompanyProfile } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface TemplateProps {
  quote: Quote;
  company: CompanyProfile;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ quote, company }) => {
  const subtotal = quote.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const vatAmount = subtotal * (quote.vatRate / 100);
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="p-6 bg-white text-xs font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-start pb-4 mb-8 border-b">
        <div className="w-1/2">
          {company.logoBase64 && <img src={company.logoBase64} alt="Company Logo" className="max-h-16 mb-4 max-w-full object-contain" />}
          <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
          <p className="text-gray-600 whitespace-pre-wrap">{company.address}</p>
        </div>
        <div className="w-1/2 text-right">
          <h2 className="text-3xl font-light uppercase text-gray-500 tracking-widest">Quotation</h2>
        </div>
      </header>

      {/* Quote Details */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-500 font-semibold text-xs mb-1">BILLED TO</p>
          <p className="font-bold text-gray-800">{quote.customerName}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-500 font-semibold text-xs mb-1">QUOTE NUMBER</p>
          <p className="font-bold text-gray-800">{quote.quoteNumber}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-500 font-semibold text-xs mb-1">DATE OF ISSUE</p>
          <p className="font-bold text-gray-800">{quote.date}</p>
        </div>
      </section>
      
      <p className="mb-8 p-3 bg-gray-50 rounded-md"><strong>Subject:</strong> {quote.subject}</p>

      {/* Line Items Table */}
      <section className="mb-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-[0.65rem]">
              <th className="p-3 font-semibold">Description</th>
              <th className="p-3 w-24 text-center font-semibold">Qty</th>
              <th className="p-3 w-32 text-right font-semibold">Unit Price</th>
              <th className="p-3 w-32 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map(item => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">{formatCurrency(item.unitPrice, quote.currency)}</td>
                <td className="p-3 text-right">{formatCurrency(item.quantity * item.unitPrice, quote.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Summary */}
      <section className="flex justify-end mb-8">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal, quote.currency)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>VAT ({quote.vatRate}%)</span>
            <span>{formatCurrency(vatAmount, quote.currency)}</span>
          </div>
          <div className="flex justify-between py-3 font-bold text-base" style={{ color: company.primaryColor }}>
            <span>Grand Total</span>
            <span>{formatCurrency(grandTotal, quote.currency)}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t text-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Terms & Conditions</h4>
            <p>Payment is due within {quote.validity}.</p>
            <p className="mt-1">Thank you for your business.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Bank Details</h4>
            <p className="whitespace-pre-wrap">{company.bankDetails}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
