import React, { useState, useEffect } from "react";

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("newsletterDismissed");

      // Only show if NOT dismissed
      if (!dismissed) {
        setShowPopup(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("newsletterDismissed", "true");
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-8 w-11/12 max-w-md relative shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-2 right-1 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Subscribe to Our Newsletter
            </h2>

            <p className="text-gray-700 text-center mb-6">
              Get exclusive offers, product updates, and more!
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <button
                type="submit"
                className="bg-black text-white rounded px-4 py-2 hover:bg-red-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;
