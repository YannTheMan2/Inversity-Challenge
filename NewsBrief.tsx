import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Headphones, Video, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';

const NewsApp = () => {
  const [selectedFormat, setSelectedFormat] = useState('read');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const newsItems = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement",
      shortSummary: "195 countries agree to accelerate renewable energy adoption and phase out fossil fuels by 2050.",
      readTime: "2 min read",
      category: "environment",
      fullText: "In a landmark decision, 195 countries have committed to accelerating renewable energy adoption and completely phasing out fossil fuels by 2050. The agreement includes strict enforcement mechanisms and financial support for developing nations.",
      quiz: [
        {
          question: "How many countries agreed to the climate agreement?",
          options: ["150", "175", "195", "200"],
          correct: "195"
        },
        {
          question: "What is the target year for phasing out fossil fuels?",
          options: ["2040", "2045", "2050", "2055"],
          correct: "2050"
        }
      ]
    },
    {
      id: 2,
      title: "Breakthrough in Quantum Computing",
      shortSummary: "Scientists achieve quantum supremacy with new 1000-qubit processor.",
      readTime: "3 min read",
      category: "technology",
      fullText: "Researchers have achieved a major breakthrough in quantum computing with the development of a 1000-qubit processor. This advancement enables complex calculations that would take classical computers millions of years to complete.",
      quiz: [
        {
          question: "How many qubits does the new processor have?",
          options: ["500", "750", "1000", "1250"],
          correct: "1000"
        },
        {
          question: "What is the main advantage of this quantum processor?",
          options: ["Lower cost", "Faster calculations", "Smaller size", "Less energy use"],
          correct: "Faster calculations"
        }
      ]
    },
    {
      id: 3,
      title: "Major Economic Policy Shift",
      shortSummary: "Central banks announce coordinated approach to tackle inflation.",
      readTime: "2 min read",
      category: "economics",
      fullText: "Global central banks have announced a coordinated approach to combat rising inflation rates. The strategy includes synchronized interest rate adjustments and new monetary policy tools.",
      quiz: [
        {
          question: "What is the main goal of the policy shift?",
          options: ["Boost employment", "Tackle inflation", "Increase trade", "Reduce debt"],
          correct: "Tackle inflation"
        },
        {
          question: "What tools are being used in this approach?",
          options: ["Interest rates only", "Interest rates and monetary policy", "Trade policies", "Fiscal policies"],
          correct: "Interest rates and monetary policy"
        }
      ]
    },
    {
      id: 4,
      title: "Revolutionary AI Healthcare System Launched",
      shortSummary: "New AI system demonstrates 99% accuracy in early disease detection.",
      readTime: "4 min read",
      category: "technology",
      fullText: "A groundbreaking AI healthcare system has been launched, capable of detecting early signs of various diseases with 99% accuracy. The system uses advanced machine learning algorithms and processes medical imaging data in real-time.",
      quiz: [
        {
          question: "What is the accuracy rate of the new AI system?",
          options: ["95%", "97%", "98%", "99%"],
          correct: "99%"
        },
        {
          question: "What type of data does the system process?",
          options: ["Text only", "Medical imaging", "Patient records", "Blood tests"],
          correct: "Medical imaging"
        }
      ]
    },
    {
      id: 5,
      title: "Space Tourism Milestone Achieved",
      shortSummary: "First commercial space hotel successfully completes orbital test.",
      readTime: "3 min read",
      category: "technology",
      fullText: "The world's first commercial space hotel has successfully completed its orbital test, marking a major milestone in space tourism. The facility can accommodate up to 400 guests and features artificial gravity sections.",
      quiz: [
        {
          question: "What is the capacity of the space hotel?",
          options: ["200 guests", "300 guests", "400 guests", "500 guests"],
          correct: "400 guests"
        },
        {
          question: "What special feature does the hotel include?",
          options: ["Swimming pool", "Artificial gravity", "Tennis court", "Garden"],
          correct: "Artificial gravity"
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'technology', label: 'Tech' },
    { id: 'environment', label: 'Environment' },
    { id: 'economics', label: 'Economics' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
    setShowQuiz(false);
    setShowResults(false);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateScore = () => {
    if (!selectedArticle) return 0;
    let correct = 0;
    selectedArticle.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">News Brief</h1>
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
                ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article View */}
      {selectedArticle && !showQuiz && (
        <div className="p-4">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="text-blue-600 mb-4"
          >
            ← Back to news
          </button>
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">{selectedArticle.title}</h2>
              <p className="mb-4">{selectedArticle.fullText}</p>
              <button 
                onClick={() => setShowQuiz(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Take Quiz
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quiz View */}
      {selectedArticle && showQuiz && (
        <div className="p-4">
          <button 
            onClick={() => setShowQuiz(false)}
            className="text-blue-600 mb-4"
          >
            ← Back to article
          </button>
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Quick Quiz</h2>
              {selectedArticle.quiz.map((q, index) => (
                <div key={index} className="mb-6">
                  <p className="font-medium mb-2">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleQuizAnswer(index, option)}
                        className={`w-full p-2 rounded-lg text-left ${
                          quizAnswers[index] === option
                            ? 'bg-blue-100 border-blue-600'
                            : 'bg-gray-50 border-gray-200'
                        } border`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {showResults && (
                    <div className="mt-2 flex items-center">
                      {quizAnswers[index] === q.correct ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Correct!
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Incorrect. Correct answer: {q.correct}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {!showResults && (
                <button 
                  onClick={() => setShowResults(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Submit Answers
                </button>
              )}
              {showResults && (
                <div className="text-center mt-4">
                  <h3 className="text-lg font-bold">
                    Your Score: {calculateScore()} / {selectedArticle.quiz.length}
                  </h3>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="text-blue-600 mt-4"
                  >
                    Back to News Feed
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* News Feed */}
      {!selectedArticle && (
        <div className="p-4">
          {filteredNews.map(news => (
            <Card key={news.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {news.readTime}
                  </span>
                  <span className="text-sm text-blue-600 capitalize">
                    {news.category}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{news.shortSummary}</p>

                <Tabs defaultValue="read" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger value="read">
                      <Book className="w-4 h-4 mr-1" />
                      Read
                    </TabsTrigger>
                    <TabsTrigger value="listen">
                      <Headphones className="w-4 h-4 mr-1" />
                      Listen
                    </TabsTrigger>
                    <TabsTrigger value="watch">
                      <Video className="w-4 h-4 mr-1" />
                      Watch
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="read">
                    <button 
                      onClick={() => handleReadArticle(news)}
                      className="text-blue-600 text-sm flex items-center"
                    >
                      Read full story
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </TabsContent>
                  <TabsContent value="listen">
                    <button className="text-blue-600 text-sm flex items-center">
                      Play audio version
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </TabsContent>
                  <TabsContent value="watch">
                    <button className="text-blue-600 text-sm flex items-center">
                      Watch video summary
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsApp;
