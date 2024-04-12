import React, { useEffect } from "react";
import pdfjs from "pdfjs-dist/build/pdf";

const PdfViewer = ({ url }) => {
  useEffect(() => {
    const renderPDF = async () => {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        document.body.appendChild(canvas);
      }
    };

    renderPDF();

    return () => {
      // Nettoyer les éléments créés lors du démontage du composant
      const canvasElements = document.querySelectorAll("canvas");
      canvasElements.forEach((canvas) => canvas.remove());
    };
  }, [url]);

  return null; // Le composant n'affiche rien directement, il utilise le DOM pour afficher le PDF
};

export default PdfViewer;
