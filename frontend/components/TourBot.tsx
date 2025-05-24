import React, { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  isBot: boolean;
  timestamp?: Date;
}

const TourBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your Trakify assistant. Would you like a tour of the dashboard?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startTour = () => {
    setIsTyping(true);
    const tourSteps = [
      "Let's start with the basics! The sidebar on the left contains all your navigation options.",
      "You can manage your organization settings, orders, and employees from here.",
      "The main dashboard shows your key metrics and recent activities.",
      "Need help with anything specific? Just ask me!",
    ];

    // Simulate typing effect
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Yes, please show me around!",
          isBot: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);

      // Add bot messages with delay
      tourSteps.forEach((text, index) => {
        setTimeout(
          () => {
            setMessages((prev) => [
              ...prev,
              { text, isBot: true, timestamp: new Date() },
            ]);
          },
          (index + 1) * 1000,
        );
      });
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-800">
          <div className="from-brand-500 to-brand-400 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black">
                  Trakify Assistant
                </h3>
                <p className="text-sm text-black/80">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div className="flex flex-col">
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm transition-all duration-300 ${
                      message.isBot
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                        : "from-brand-500 to-brand-400 bg-gradient-to-r text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.timestamp && (
                    <span
                      className={`mt-1 text-xs text-gray-500 ${
                        message.isBot ? "ml-2" : "mr-2 self-end"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="flex space-x-2 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-300"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-300"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-300"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <button
              onClick={startTour}
              className="group from-brand-500 to-brand-400 hover:shadow-brand-500/20 relative w-full overflow-hidden rounded-xl bg-gradient-to-r px-6 py-3 text-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-2 text-black">
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Start Tour
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:bg-gray-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        <div className="from-brand-500 to-brand-400 absolute inset-0 rounded-full bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex flex-col items-center gap-1">
          <svg
            className="text-brand-500 h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="text-brand-500 text-xs font-medium group-hover:text-white">
            Trak
          </span>
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            1
          </div>
        )}
      </button>
    </div>
  );
};

export default TourBot;
