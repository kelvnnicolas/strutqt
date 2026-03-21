import React from 'react';
import QuizCard from './QuizCard';

export default function QuizGallery({ quizzes }) {
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-12 bg-white/50 backdrop-blur">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No quizzes</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new quiz funnel.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}
