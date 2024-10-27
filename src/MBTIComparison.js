import React, { useState } from 'react';
import { Heart, Settings, Lightbulb } from 'lucide-react'; // Removed 'Brain' import as it's not part of 'lucide-react'

// Softer, HSP-friendly color scheme for cognitive functions
const functionColors = {
  'Se': 'text-teal-400/80',
  'Si': 'text-teal-300/80',
  'Ne': 'text-violet-400/80',
  'Ni': 'text-violet-300/80',
  'Te': 'text-amber-300/80',
  'Ti': 'text-amber-200/80',
  'Fe': 'text-rose-300/80',
  'Fi': 'text-rose-200/80',
};

// Creating a simple Card component to replace the missing dependency
const Card = ({ children, className }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${className} transition-transform transform hover:scale-105 duration-200 ease-in-out`}> {/* Added hover effect for subtle interactivity */}
      {children}
    </div>
  );
};

const FunctionCard = ({ fullName, description }) => {
  const functionCode = fullName.match(/\((.*?)\)/)[1];
  
  return (
    <Card className="w-72 shrink-0 bg-gray-800/70 border-gray-600/50 backdrop-blur-md">
      <div className="p-4">
        <div className={`font-medium mb-2 text-sm ${functionColors[functionCode]}`}> 
          {fullName}
        </div>
        <p className="text-gray-300/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

const RowLabel = ({ title, description, icon: Icon }) => (
  <div className="w-48 shrink-0 flex items-center gap-3 pr-4 sticky left-0 bg-slate-900/90 z-10 backdrop-blur-md">
    <div className="bg-gray-700/40 p-2 rounded-lg">
      <Icon className="w-5 h-5 text-sky-300/80" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-200/90 text-sm">{title}</h3>
      <p className="text-xs text-gray-400/80 italic">{description}</p>
    </div>
  </div>
);

const TypeHeader = ({ type }) => (
  <div className="w-72 shrink-0 text-lg font-semibold text-center p-4 bg-gray-700/40 rounded-lg backdrop-blur-md text-gray-200/90">
    {type}
  </div>
);

const MBTIComparison = () => {
  const types = {
    ISFJ: [
      { fullName: "Introverted Sensing (Si)", description: "Focuses on concrete details and past experiences. Creates reliable systems based on proven methods." },
      { fullName: "Extroverted Feeling (Fe)", description: "Prioritizes group harmony and others' emotional needs. Naturally adapts behavior to social situations." },
      { fullName: "Introverted Thinking (Ti)", description: "Analyzes information for practical problem-solving. Develops systematic approaches to tasks." },
      { fullName: "Extroverted Intuition (Ne)", description: "May struggle with change and multiple possibilities. Gradually develops ability to see new perspectives." },
    ],
    INFJ: [
      { fullName: "Introverted Intuition (Ni)", description: "Recognizes complex patterns and predicts future implications. Synthesizes scattered information into insights." },
      { fullName: "Extroverted Feeling (Fe)", description: "Understands emotional undercurrents in groups. Uses empathy to guide others toward growth." },
      { fullName: "Introverted Thinking (Ti)", description: "Combines logic with intuitive insights. Develops theoretical frameworks for understanding." },
      { fullName: "Extroverted Sensing (Se)", description: "May miss immediate physical details. Gradually develops better awareness of surroundings." },
    ],
  };

  const functionLabels = [
    {
      title: "Dominant",
      description: "Primary mode of processing",
      icon: Lightbulb, // Changed icon from 'Brain' to 'Lightbulb'
    },
    {
      title: "Auxiliary",
      description: "Supporting function",
      icon: Heart,
    },
    {
      title: "Tertiary",
      description: "Emerging capability",
      icon: Settings,
    },
    {
      title: "Inferior",
      description: "Growth potential",
      icon: Lightbulb,
    },
  ];

  // State to track selected types
  const [selectedTypes, setSelectedTypes] = useState(["ISFJ", "INFJ"]);
  const [comparisonText, setComparisonText] = useState("");

  const handleTypeSelection = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleGenerateComparison = async () => {
    if (selectedTypes.length === 2) {
      const [type1, type2] = selectedTypes;
      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

      if (!apiKey) {
        console.error("API key is missing. Please set the REACT_APP_ANTHROPIC_API_KEY environment variable.");
        return;
      }

      try {
        const response = await fetch("https://api.anthropic.com/v1/claude-3-haiku/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: `Compare the cognitive functions of ${type1} and ${type2}. Provide a brief and insightful paragraph.`,
            model: "claude-3-haiku-20240307",
            max_tokens: 150,
          }),
        });

        const data = await response.json();
        setComparisonText(data.text);
      } catch (error) {
        console.error("Error generating comparison:", error);
      }
    }
  };

  return (
    <div className="w-full bg-slate-900 text-gray-100/90 font-sans">
      <h1 className="text-2xl font-bold text-center py-4 px-4 bg-gray-800/80 border-b border-gray-600/30 sticky top-0 z-20 backdrop-blur-md text-gray-200/90">
        MBTI Cognitive Functions Comparison
      </h1>
      
      <div className="p-4">
        {/* Filter Selection */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.keys(types).map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeSelection(type)}
                className="form-checkbox h-5 w-5 text-teal-400 focus:ring-teal-600 rounded-md"
              />
              <span className="text-gray-300/90 text-lg font-medium">{type}</span>
            </label>
          ))}
        </div>
        
        <div className="text-sm text-gray-400/80 mb-4">Scroll right to see more types →</div>
        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header Row */}
            <div className="flex gap-4 mb-4">
              <div className="w-48 shrink-0 sticky left-0 bg-slate-900"></div>
              {selectedTypes.map((type) => (
                <TypeHeader key={type} type={type} />
              ))}
            </div>

            {/* Function Rows */}
            {functionLabels.map((label, rowIndex) => (
              <div key={label.title} className="flex gap-4 mb-4">
                <RowLabel {...label} />
                {selectedTypes.map((type) => (
                  <FunctionCard 
                    key={`${rowIndex}-${type}`} 
                    {...types[type][rowIndex]} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Generate Comparison Button */}
        {selectedTypes.length === 2 && (
          <div className="mt-8">
            <button
              onClick={handleGenerateComparison}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            >
              Generate Comparison
            </button>
          </div>
        )}

        {/* Display Generated Comparison */}
        {comparisonText && (
          <div className="mt-4 p-4 bg-gray-800/70 border-gray-600/50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-200/90 mb-2">Generated Comparison:</h2>
            <p className="text-gray-300/90">{comparisonText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIComparison;
