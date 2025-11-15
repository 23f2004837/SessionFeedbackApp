// Utility function to export feedbacks and comments to CSV
export const exportToCSV = (feedbacks) => {
  // Create CSV content
  let csvContent = 'data:text/csv;charset=utf-8,';
  
  // Header row
  csvContent += 'Feedback ID,Author Name,Author Email,Rating,Comment,Suggestions,Created At,Likes,Comment ID,Commenter Name,Comment Text,Comment Created At\n';
  
  // Data rows
  feedbacks.forEach((feedback) => {
    if (feedback.comments && feedback.comments.length > 0) {
      feedback.comments.forEach((comment) => {
        const row = [
          feedback.id,
          escapeCSV(feedback.authorName || ''),
          escapeCSV(feedback.authorEmail || ''),
          feedback.rating || '',
          escapeCSV(feedback.comment || ''),
          escapeCSV(feedback.suggestions || ''),
          formatDate(feedback.createdAt),
          feedback.likes || 0,
          comment.id,
          escapeCSV(comment.commenterName || ''),
          escapeCSV(comment.text || ''),
          formatDate(comment.createdAt),
        ];
        csvContent += row.join(',') + '\n';
      });
    } else {
      // Feedback without comments
      const row = [
        feedback.id,
        escapeCSV(feedback.authorName || ''),
        escapeCSV(feedback.authorEmail || ''),
        feedback.rating || '',
        escapeCSV(feedback.comment || ''),
        escapeCSV(feedback.suggestions || ''),
        formatDate(feedback.createdAt),
        feedback.likes || 0,
        '', '', '', '',
      ];
      csvContent += row.join(',') + '\n';
    }
  });
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `feedback_export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Escape CSV fields
const escapeCSV = (field) => {
  if (field == null) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Format Firestore timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      return '';
    }
    return date.toISOString();
  } catch {
    return '';
  }
};
