'use client';

import { useState } from 'react';
//Updated
export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Success! Form submitted successfully.');
      } else {
        setMessage(`Error: ${result.error || 'Failed to submit form'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Failed to submit form'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
        <h1 className="text-2xl font-semibold text-gray-800">Content Agent Automation</h1>
        <p className="text-sm text-gray-800">
          Paste the video URL, fill the details and submit.
        </p>

        {message && (
          <div
            className={`p-3 rounded ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : message.includes('Success')
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* VIDEO URL */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="video_url">
              Video URL <span className="text-red-500">*</span>
            </label>
            <input
              id="video_url"
              name="video_url"
              type="text"
              className="block w-full text-sm border rounded px-2 py-1"
              required
            />
          </div>

          {/* VIDEO TITLE */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="video_title">
              Video title <span className="text-red-500">*</span>
            </label>
            <input
              id="video_title"
              name="video_title"
              type="text"
              className="block w-full text-sm border rounded px-2 py-1"
              required
            />
          </div>

          {/* EVENT DATE */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="event_date">
              Event date <span className="text-red-500">*</span>
            </label>
            <input
              id="event_date"
              name="event_date"
              type="date"
              className="block w-full text-sm border rounded px-2 py-1"
              required
            />
          </div>

          {/* HOST NAME */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="host_name">
              Host name <span className="text-red-500">*</span>
            </label>
            <input
              id="host_name"
              name="host_name"
              type="text"
              className="block w-full text-sm border rounded px-2 py-1"
              required
            />
          </div>

          {/* GUEST NAME */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="guest_name">
              Guest name <span className="text-red-500">*</span>
            </label>
            <input
              id="guest_name"
              name="guest_name"
              type="text"
              className="block w-full text-sm border rounded px-2 py-1"
              required
            />
          </div> */}

          {/* GUEST COMPANY NAME */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="guest_company_name">
              Guest company name
            </label>
            <input
              id="guest_company_name"
              name="guest_company_name"
              type="text"
              className="block w-full text-sm border rounded px-2 py-1"
            />
          </div>

          {/* GUEST WEBSITE */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="guest_company_website">
              Guest company website
            </label>
            <input
              id="guest_company_website"
              name="guest_company_website"
              type="url"
              className="block w-full text-sm border rounded px-2 py-1"
            />
          </div> */}

          {/* SOCIAL HANDLES */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="social_handles">
              Social handles
            </label>
            <textarea
              id="social_handles"
              name="social_handles"
              className="block w-full text-sm border rounded px-2 py-1"
              rows={2}
              placeholder="@twitter, @linkedin, etc."
            />
          </div> */}

          {/* KEYWORDS */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="main_topic_keywords">
              Main topic keywords
            </label>
            <textarea
              id="main_topic_keywords"
              name="main_topic_keywords"
              className="block w-full text-sm border rounded px-2 py-1"
              rows={2}
              placeholder="keyword1, keyword2, ..."
            />
          </div> */}

          {/* NOTES */}
          {/* <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="optional_notes">
              Optional notes
            </label>
            <textarea
              id="optional_notes"
              name="optional_notes"
              className="block w-full text-sm border rounded px-2 py-1"
              rows={3}
            />
          </div> */}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit to n8n'}
          </button>
        </form>
      </main>
    </div>
  );
}
