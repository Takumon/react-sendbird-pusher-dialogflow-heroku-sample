
import React from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PurchasePdf from './purchase-pdf';


export default function FlightTicketPurchasePdfView({ m, registerFunc }) {
  const {
    title,
    contents,
  } = m.customMessage;

  const pdf = (
    <PurchasePdf
      {...contents.order}
    />
  );

  return (
    <>
      {title && <div>{title}</div>}
      <PDFDownloadLink document={pdf} fileName="e-ticket.pdf">
        {({ blob, url, loading, error }) => loading ? 'Loading e-ticket...' : 'Download e-ticket'}
      </PDFDownloadLink>
    </>
  );
}
