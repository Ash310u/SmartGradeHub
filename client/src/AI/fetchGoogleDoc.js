async function fetchPublicGoogleDoc(docId) {
    const url = `https://docs.google.com/document/d/${docId}/export?format=pdf`;
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log("Google Doc Content:", text);
    } catch (error) {
        console.error("Error fetching document:", error);
    }
}


export default fetchPublicGoogleDoc;