import React from 'react';
import { Quote, CompanyProfile } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import Barcode from 'react-barcode';

interface TemplateProps {
  quote: Quote;
  company: CompanyProfile;
}

export const StandardTemplate: React.FC<TemplateProps> = ({ quote, company }) => {
  const subtotal = quote.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const vatAmount = subtotal * (quote.vatRate / 100);
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="p-4 bg-white text-xs font-sans text-gray-900">
      <style>{`
        .header-company-name { color: ${company.primaryColor}; }
        .table-header { background-color: ${company.primaryColor}; color: white; }
      `}</style>
      
      {/* Header */}
      <header className="flex justify-between items-start pb-4 border-b-2" style={{borderColor: company.primaryColor}}>
        <div className="w-2/3">
          <h1 className="text-3xl font-bold header-company-name">{company.name}</h1>
          <p className="text-gray-600">{company.tagline}</p>
          <div className="mt-2 text-gray-700">
            <p>{company.address}</p>
            <p>VAT: {company.vatNumber} | CR: {company.crNumber}</p>
            <p>Contact: {company.contactPerson}</p>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          {company.logoBase64 && <img src={company.logoBase64} alt="Company Logo" className="max-h-20 max-w-full object-contain" />}
        </div>
      </header>

      {/* Quote Details */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-2">QUOTATION</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 bg-gray-50 p-2 rounded-md">
          <div><strong>Quote No:</strong> {quote.quoteNumber}</div>
          <div><strong>Date:</strong> {quote.date}</div>
          <div><strong>Customer:</strong> {quote.customerName}</div>
          <div><strong>Validity:</strong> {quote.validity}</div>
          <div className="col-span-2"><strong>Subject:</strong> {quote.subject}</div>
        </div>
      </section>

      {/* Line Items Table */}
      <section className="mt-6">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="p-2 text-left font-semibold">Description</th>
              <th className="p-2 text-center font-semibold">Quantity</th>
              <th className="p-2 text-right font-semibold">Unit Price</th>
              <th className="p-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-2 align-top">{item.description}</td>
                <td className="p-2 text-center align-top">{item.quantity}</td>
                <td className="p-2 text-right align-top">{formatCurrency(item.unitPrice, quote.currency)}</td>
                <td className="p-2 text-right align-top">{formatCurrency(item.quantity * item.unitPrice, quote.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Summary */}
      <section className="mt-4 flex justify-end">
        <div className="w-1/2 sm:w-1/3">
          <div className="flex justify-between p-1">
            <span className="font-semibold">Subtotal:</span>
            <span>{formatCurrency(subtotal, quote.currency)}</span>
          </div>
          <div className="flex justify-between p-1">
            <span className="font-semibold">VAT ({quote.vatRate}%):</span>
            <span>{formatCurrency(vatAmount, quote.currency)}</span>
          </div>
          <div className="flex justify-between p-2 mt-1 font-bold text-base rounded-md" style={{backgroundColor: company.primaryColor, color: 'white'}}>
            <span>Grand Total:</span>
            <span>{formatCurrency(grandTotal, quote.currency)}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pt-4 border-t text-gray-700">
        <div className="grid grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold mb-1">Bank Details</h4>
                <p className="whitespace-pre-wrap">{company.bankDetails}</p>
            </div>
            <div>
                <h4 className="font-bold mb-1">Terms & Conditions</h4>
                <p>Payment should be made within {quote.validity}. All prices are inclusive of VAT.</p>
            </div>
        </div>
        <div className="mt-8 flex flex-col items-center">
            <Barcode value={quote.id || 'N/A'} height={40} width={1.5} fontSize={10} />
        </div>
      </footer>
    </div>
  );
};
