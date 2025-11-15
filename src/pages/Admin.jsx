import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFeedbacks } from '../firebase/firebaseHelpers';
import { exportToCSV } from '../utils/csvExport';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userRole } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (userRole !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  const handleExport = async () => {
    setLoading(true);
    setError('');

    try {
      const feedbacks = await getAllFeedbacks();
      
      if (feedbacks.length === 0) {
        setError('No feedback data to export');
        setLoading(false);
        return;
      }

      exportToCSV(feedbacks);
      setLoading(false);
    } catch (error) {
      console.error('Error exporting data:', error);
      setError('Failed to export data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ErrorMessage message={error} onClose={() => setError('')} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Panel
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and export feedback data
            </p>
          </div>

          {/* Export Section */}
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Export All Feedback
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Download all feedback and comments as a CSV file for analysis and record-keeping.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    <li>• Includes all feedback submissions</li>
                    <li>• Includes all comments on each feedback</li>
                    <li>• Includes author information and timestamps</li>
                    <li>• Compatible with Excel and Google Sheets</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={handleExport}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export to CSV
                  </>
                )}
              </button>
            </div>

            {/* Admin Info */}
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Admin Information
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p>
                  <strong>Role Management:</strong> To grant admin access to other users, update their role 
                  to "admin" in the Firestore users collection or use Firebase Cloud Functions.
                </p>
                <p>
                  <strong>Data Management:</strong> All data is stored securely in Firestore and follows 
                  the security rules defined in firestore.rules.
                </p>
                <p>
                  <strong>CSV Export:</strong> The export includes all feedback with their associated comments. 
                  Each row represents either a feedback entry or a comment, making it easy to analyze relationships.
                </p>
              </div>
            </div>

            {/* Quick Stats (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                  </div>
                  <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                  </div>
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Comments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                  </div>
                  <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
