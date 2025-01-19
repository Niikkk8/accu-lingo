'use client'

import React, { useState } from "react";

export default function Page() {
    const [inputText, setInputText] = useState("");
    const [translations, setTranslations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTranslate = async () => {
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
                throw new Error("Failed to fetch translations");
            }

            const data = await response.json();
            setTranslations(data.translations);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Text Translator</h1>
            <textarea
                className="w-full max-w-lg h-32 border border-blue-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text in English..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            <button
                onClick={handleTranslate}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                disabled={loading || !inputText.trim()}
            >
                {loading ? "Translating..." : "Translate"}
            </button>
            {error && (
                <p className="text-red-500 mt-4 text-sm">{error}</p>
            )}
            {translations && (
                <div className="w-full max-w-3xl bg-white border border-blue-300 rounded-md mt-6 p-4 shadow">
                    <h2 className="text-lg font-semibold text-blue-600 mb-4">Translations:</h2>
                    <ul className="space-y-4">
                        {Object.entries(translations).map(([key, value]) => (
                            <li key={key} className="border-b pb-2">
                                <h3 className="font-bold text-blue-500">
                                    {value.language} ({key})
                                </h3>
                                <p className="text-gray-700 mt-2">{value.translated_text}</p>
                                <div className="text-sm text-gray-500 mt-2">
                                    <strong>BLEU:</strong> {value.metrics.bleu.toFixed(2)} |{" "}
                                    <strong>ROUGE-1:</strong> {value.metrics["rouge-1"].toFixed(2)} |{" "}
                                    <strong>ROUGE-2:</strong> {value.metrics["rouge-2"].toFixed(2)} |{" "}
                                    <strong>ROUGE-L:</strong> {value.metrics["rouge-l"].toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
