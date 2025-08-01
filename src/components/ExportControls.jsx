import React, { useRef } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportControls = ({ transactions, exportRef }) => {
  const handlePDFExport = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
    pdf.save('expenses.pdf');
  };

  return (
    <div className="d-flex gap-3 mt-4 flex-wrap">
      <CSVLink
        data={transactions}
        filename="expenses.csv"
        className="btn btn-success"
      >
        Export CSV
      </CSVLink>
      <button onClick={handlePDFExport} className="btn btn-danger">
        Export PDF
      </button>
    </div>
  );
};

export default ExportControls;
