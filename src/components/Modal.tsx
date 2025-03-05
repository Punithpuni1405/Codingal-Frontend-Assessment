import React, { useState } from 'react';

interface ModalProps {
  closeModal: () => void;
  stopTimer: () => void;
}

export const Modal: React.FC<ModalProps> = ({ closeModal, stopTimer }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // Track the selected option
  const [showOtherOptions, setShowOtherOptions] = useState(false);  // Toggle the other options

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'interrupted') {
      setShowOtherOptions(true);  // Show other options if "Class interrupted/aborted" is selected
    } else {
      setShowOtherOptions(false); // Hide other options if "Class completed" is selected
    }
  };

  const handleEndClass = () => {
    stopTimer();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Select a reason to end class</h2>

        {/* Class Completed Option */}
        <div className="mb-2">
          <input
            type="radio"
            id="classCompleted"
            name="endClassReason"
            value="completed"
            checked={selectedOption === 'completed'}
            onChange={() => handleOptionChange('completed')}
            className="mr-2"
          />
          <label htmlFor="classCompleted">Class completed</label>
        </div>

        {/* Class Interrupted/Aborted Option */}
        <div className="mb-2">
          <input
            type="radio"
            id="classInterrupted"
            name="endClassReason"
            value="interrupted"
            checked={selectedOption === 'interrupted'}
            onChange={() => handleOptionChange('interrupted')}
            className="mr-2"
          />
          <label htmlFor="classInterrupted">Class interrupted/aborted</label>
        </div>

        {/* Show these options only if "Class interrupted/aborted" is selected */}
        {showOtherOptions && (
          <>
            <div className="mb-2">
              <input
                type="radio"
                id="studentNoShow"
                name="endClassReason"
                value="noShow"
                checked={selectedOption === 'noShow'}
                onChange={() => setSelectedOption('noShow')}
                className="mr-2"
              />
              <label htmlFor="studentNoShow">Student didn't show up for the class.</label>
            </div>

            <div className="mb-2">
              <input
                type="radio"
                id="studentNoInterest"
                name="endClassReason"
                value="noInterest"
                checked={selectedOption === 'noInterest'}
                onChange={() => setSelectedOption('noInterest')}
                className="mr-2"
              />
              <label htmlFor="studentNoInterest">Student didn't show any interest.</label>
            </div>

            <div className="mb-2">
              <input
                type="radio"
                id="studentDisconnected"
                name="endClassReason"
                value="disconnected"
                checked={selectedOption === 'disconnected'}
                onChange={() => setSelectedOption('disconnected')}
                className="mr-2"
              />
              <label htmlFor="studentDisconnected">Student got disconnected.</label>
            </div>

            <div className="mb-2">
              <input
                type="radio"
                id="iDisconnected"
                name="endClassReason"
                value="iDisconnected"
                checked={selectedOption === 'iDisconnected'}
                onChange={() => setSelectedOption('iDisconnected')}
                className="mr-2"
              />
              <label htmlFor="iDisconnected">I got disconnected.</label>
            </div>

            <div className="mb-2">
              <input
                type="radio"
                id="otherReason"
                name="endClassReason"
                value="other"
                checked={selectedOption === 'other'}
                onChange={() => setSelectedOption('other')}
                className="mr-2"
              />
              <label htmlFor="otherReason">Other reason</label>
              {selectedOption === 'other' && (
                <textarea
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                  placeholder="Type your reason here..."
                />
              )}
            </div>
          </>
        )}

        {/* Buttons section (End Class and Cancel) */}
        <div className="flex justify-start space-x-4 mt-4">
          <button
            onClick={handleEndClass}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            End Class
          </button>

          <button
            onClick={closeModal}
            className="text-gray-600 px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
