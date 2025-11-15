import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFeedback } from '../firebase/firebaseHelpers';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';

const SubmitFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const MAX_COMMENT_LENGTH = 2000;
  const MAX_SUGGESTIONS_LENGTH = 2000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please provide a comment');
      return;
    }
    
    if (comment.length > MAX_COMMENT_LENGTH) {
      setError(`Comment must be less than ${MAX_COMMENT_LENGTH} characters`);
      return;
    }
    
    if (suggestions.length > MAX_SUGGESTIONS_LENGTH) {
      setError(`Suggestions must be less than ${MAX_SUGGESTIONS_LENGTH} characters`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createFeedback({
        authorUid: currentUser.uid,
        authorName: currentUser.displayName,
        authorEmail: currentUser.email,
        rating,
        comment: comment.trim(),
        suggestions: suggestions.trim() || null,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
      setLoading(false);
    }
  };

  const renderStarInput = () => {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <svg
              className={`w-10 h-10 ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {rating}/5
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ErrorMessage message={error} onClose={() => setError('')} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Submit Your Feedback
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Share your thoughts about the session
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Rating <span className="text-red-500">*</span>
              </label>
              {renderStarInput()}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Select a rating from 1 to 5 stars
              </p>
            </div>

            {/* Comment Input */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Feedback <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={MAX_COMMENT_LENGTH}
                placeholder="Share your thoughts about the session..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                {comment.length} / {MAX_COMMENT_LENGTH}
              </p>
            </div>

            {/* Suggestions Input */}
            <div>
              <label
                htmlFor="suggestions"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Suggestions (Optional)
              </label>
              <textarea
                id="suggestions"
                rows={4}
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                maxLength={MAX_SUGGESTIONS_LENGTH}
                placeholder="Any suggestions for improvement?"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                {suggestions.length} / {MAX_SUGGESTIONS_LENGTH}
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0 || !comment.trim()}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitFeedback;
