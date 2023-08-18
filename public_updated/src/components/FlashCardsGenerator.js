import React, { useState, useEffect } from "react";

const FlashcardGenerator = () => {

    const [topic, setTopic] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [selectedDataCard, setSelectedDataCard] = useState('');

    const handleChange = (event) => {
        setTopic(event.target.value);
    };

    useEffect(async () => {
        try {
            console.log('wefwaekfbhj');
            // Use OpenAI API to generate questions
            // Replace 'YOUR_API_KEY' with your actual OpenAI API key
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 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',
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: `You are a researcher studying Web}.` },
                        { role: 'system', content: 'Q: What are some common questions asked about this topic?' },
                    ],
                    max_tokens: 30,
                    n: 1,
                    stop: ['\n'],
                }),
            });

            const data = await response.json();
            const questions = data.choices.map((choice) => choice.message.content);
            const uniqueQuestions = [...new Set(questions)]; // Filter out duplicate questions

            const newFlashcards = uniqueQuestions.map((question, index) => ({
                id: index,
                question: question,
                answer: '',
                showAnswer: true,
            }));

            setFlashcards(newFlashcards);
            setSelectedDataCard('');
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!topic) {
            return;
        }

     
        
    };

    const handleShowAnswer = (id) => {
        setFlashcards((prevFlashcards) =>
            prevFlashcards.map((flashcard) =>
                flashcard.id === id ? { ...flashcard, showAnswer: true } : flashcard
            )
        );
    };

    const handleDataCardClick = (title) => {
        setSelectedDataCard(title);
        setTopic(title);
    };
    return (
        <div className="container">
            <h1 className="text-center mt-5 mb-3">Flashcards</h1>
        
            <div id="flashcards-container">
                {flashcards.map((flashcard) => (
                    <div className={` flip-card ${flashcard.showAnswer ? 'flip' : ''}`} key={flashcard.id}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h5 className="card-title">Question</h5>
                                <p className="card-text">{flashcard.question}</p>
                            </div>
                            {flashcard.showAnswer && (
                                    <div className="flip-card-back">
                                        <h5 className="card-title">Answer</h5>
                                        <p className="card-text">{flashcard.answer}</p>
                                    </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FlashcardGenerator;