
import React from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PurchasePdf from './purchase-pdf';


export default function FlightTicketPurchasePdfView({ m }) {
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
      <div style={{ textAlign: 'left', }} >
        {title && <div>{title}</div>}
      </div>
      <PDFDownloadLink document={pdf} fileName="e-ticket.pdf">
        {({ blob, url, loading, error }) => loading ? 'Loading e-ticket...' : 'Download e-ticket'}
      </PDFDownloadLink>
    </>
  );
}
