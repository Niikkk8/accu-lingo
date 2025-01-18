'use client'

import React, { useState } from "react";

export default function Page() {
    const [inputText, setInputText] = useState("");
    const [translations, setTranslations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTranslate = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setError("");
        setTranslations(null);

        try {
            const response = await fetch(
                "https://translator-api-key.onrender.com/translate_all",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: inputText }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data?.translations) {
                throw new Error("Invalid response format");
            }

            setTranslations(data.translations);
        } catch (err) {
            setError(err.message || "Failed to fetch translations");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Text Translator</h1>

                <div className="w-full mb-6">
                    <textarea
                        className="w-full h-32 border border-blue-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        placeholder="Enter text in English..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={loading}
                    />

                    <div className="flex justify-center">
                        <button
                            onClick={handleTranslate}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || !inputText.trim()}
                        >
                            {loading ? "Translating..." : "Translate"}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="w-full bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {translations && (
                    <div className="w-full bg-white border border-blue-300 rounded-md p-6 shadow-md">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">Translations</h2>
                        <ul className="space-y-6">
                            {Object.entries(translations).map(([key, value]) => (
                                <li key={key} className="border-b border-blue-100 pb-4 last:border-b-0">
                                    <h3 className="font-bold text-blue-500 text-lg">
                                        {value.language} ({key})
                                    </h3>
                                    <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                                        {value.translated_text}
                                    </p>
                                    <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-3">
                                        <span><strong>BLEU:</strong> {value.metrics?.bleu?.toFixed(2) ?? 'N/A'}</span>
                                        <span><strong>ROUGE-1:</strong> {value.metrics?.["rouge-1"]?.toFixed(2) ?? 'N/A'}</span>
                                        <span><strong>ROUGE-2:</strong> {value.metrics?.["rouge-2"]?.toFixed(2) ?? 'N/A'}</span>
                                        <span><strong>ROUGE-L:</strong> {value.metrics?.["rouge-l"]?.toFixed(2) ?? 'N/A'}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}