export const downloadFileFromUrl = async (url: string, filename?: string): Promise<void> => {
    try {
        if (!url || url.trim() === '') {
            console.warn('No download URL provided');
            return;
        }

        let downloadUrl = url;

        // For Firebase Storage URLs, modify to force download
        if (url.includes('firebasestorage.googleapis.com')) {
            const urlObj = new URL(url);
            // Add response-content-disposition parameter to force download
            urlObj.searchParams.set('response-content-disposition', `attachment; filename="${filename || 'cv-document.pdf'}"`);
            downloadUrl = urlObj.toString();
        }

        // Create a temporary anchor element for download
        const anchor = document.createElement('a');

        // Set the download attributes
        anchor.href = downloadUrl;
        anchor.download = filename || 'cv-document.pdf';
        anchor.target = '_blank'; // Open in new tab as fallback
        anchor.rel = 'noopener noreferrer';

        // Add some styles to make it invisible
        anchor.style.display = 'none';

        // Append to body, click, and remove
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        console.log('File download initiated successfully');
    } catch (error) {
        console.error('Error downloading file:', error);
        // Fallback: open URL in new tab
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (fallbackError) {
            console.error('Fallback download also failed:', fallbackError);
        }
    }
};

export const getFilenameFromUrl = (url: string): string => {
    try {
        // Extract filename from Firebase URL
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1];

        // Remove query parameters if any
        const cleanFilename = filename.split('?')[0];

        // Decode URI component in case of encoded characters
        return decodeURIComponent(cleanFilename);
    } catch (error) {
        console.error('Error extracting filename from URL:', error);
        return 'cv-document.pdf';
    }
}; 