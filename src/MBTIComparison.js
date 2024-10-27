import React, { useState } from 'react';
import { Brain, Heart, Settings, Lightbulb } from 'lucide-react';

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
    INTJ: [
      { fullName: "Introverted Intuition (Ni)", description: "Synthesizes complex information into strategic insights. Creates long-term visions and systematic plans." },
      { fullName: "Extroverted Thinking (Te)", description: "Implements efficient systems and logical structures. Makes decisions based on objective analysis." },
      { fullName: "Introverted Feeling (Fi)", description: "Develops strong personal values and ethical frameworks. Guides decisions with internal moral compass." },
      { fullName: "Extroverted Sensing (Se)", description: "May overlook immediate physical environment. Gradually develops better practical implementation skills." },
    ],
    ESFP: [
      { fullName: "Extroverted Sensing (Se)", description: "Lives fully in the present moment. Adapts quickly to immediate surroundings and opportunities." },
      { fullName: "Introverted Feeling (Fi)", description: "Makes decisions based on personal values. Strong sense of individual identity and authenticity." },
      { fullName: "Extroverted Thinking (Te)", description: "Organizes external environment. Takes action to achieve immediate, practical results." },
      { fullName: "Introverted Intuition (Ni)", description: "Gradually develops insights about future implications. May struggle with long-term planning." },
    ],
    ESTJ: [
      { fullName: "Extroverted Thinking (Te)", description: "Organizes and implements efficient systems. Makes decisions based on logical analysis and established procedures." },
      { fullName: "Introverted Sensing (Si)", description: "Values tradition and experience. Relies on proven methods and detailed observations." },
      { fullName: "Extroverted Intuition (Ne)", description: "Develops ability to consider new possibilities. Gradually becomes more open to alternative approaches." },
      { fullName: "Introverted Feeling (Fi)", description: "Grows awareness of personal values. Develops deeper understanding of individual needs and ethics." },
    ],
    ISTJ: [
      { fullName: "Introverted Sensing (Si)", description: "Relies on past experiences and concrete details. Values traditions and structured environments." },
      { fullName: "Extroverted Thinking (Te)", description: "Focuses on efficiency and organization. Implements logical, practical solutions." },
      { fullName: "Introverted Feeling (Fi)", description: "Values personal beliefs and maintains a strong sense of integrity." },
      { fullName: "Extroverted Intuition (Ne)", description: "Gradually becomes more open to new ideas and possibilities." },
    ],
    ENFJ: [
      { fullName: "Extroverted Feeling (Fe)", description: "Skilled at understanding and meeting others' emotional needs. Naturally takes on leadership roles." },
      { fullName: "Introverted Intuition (Ni)", description: "Synthesizes insights and foresees future outcomes. Guides others with a clear vision." },
      { fullName: "Extroverted Sensing (Se)", description: "Enjoys being present and engaging actively with the environment." },
      { fullName: "Introverted Thinking (Ti)", description: "Uses analysis and logical reasoning to understand concepts deeply." },
    ],
    ENFP: [
      { fullName: "Extroverted Intuition (Ne)", description: "Constantly explores new ideas and possibilities. Loves brainstorming and generating creative solutions." },
      { fullName: "Introverted Feeling (Fi)", description: "Guided by personal values and authenticity. Makes decisions that align with internal beliefs." },
      { fullName: "Extroverted Thinking (Te)", description: "Organizes ideas into actionable plans. Takes steps to bring creative visions to life." },
      { fullName: "Introverted Sensing (Si)", description: "May struggle with consistency but gradually learns to use past experiences as a guide." },
    ],
    INFP: [
      { fullName: "Introverted Feeling (Fi)", description: "Deeply in tune with personal values. Seeks authenticity and harmony in decisions." },
      { fullName: "Extroverted Intuition (Ne)", description: "Explores possibilities and connections. Enjoys contemplating potential future paths." },
      { fullName: "Introverted Sensing (Si)", description: "Reflects on past experiences for insights and personal growth." },
      { fullName: "Extroverted Thinking (Te)", description: "Gradually develops practical skills for organizing and implementing plans." },
    ],
    ISTP: [
      { fullName: "Introverted Thinking (Ti)", description: "Analyzes systems logically. Enjoys problem-solving and understanding how things work." },
      { fullName: "Extroverted Sensing (Se)", description: "Engages actively with the physical environment. Acts quickly to respond to immediate needs." },
      { fullName: "Introverted Intuition (Ni)", description: "Occasionally reflects on abstract insights and future possibilities." },
      { fullName: "Extroverted Feeling (Fe)", description: "Gradually develops sensitivity to others' emotions and group harmony." },
    ],
    ISFP: [
      { fullName: "Introverted Feeling (Fi)", description: "Values authenticity and personal beliefs. Makes decisions based on internal moral compass." },
      { fullName: "Extroverted Sensing (Se)", description: "Lives in the present moment and enjoys sensory experiences." },
      { fullName: "Introverted Intuition (Ni)", description: "Gradually develops deeper insights into connections and possibilities." },
      { fullName: "Extroverted Thinking (Te)", description: "May struggle with organization but learns to implement practical solutions over time." },
    ],
    ESTP: [
      { fullName: "Extroverted Sensing (Se)", description: "Lives fully in the present. Responds quickly to immediate opportunities and challenges." },
      { fullName: "Introverted Thinking (Ti)", description: "Analyzes situations logically. Enjoys hands-on problem-solving." },
      { fullName: "Extroverted Feeling (Fe)", description: "Engages others socially and adapts to group needs." },
      { fullName: "Introverted Intuition (Ni)", description: "Gradually develops insight into long-term implications." },
    ],
    ENTJ: [
      { fullName: "Extroverted Thinking (Te)", description: "Focuses on efficiency and achieving goals. Implements strategic plans effectively." },
      { fullName: "Introverted Intuition (Ni)", description: "Synthesizes information to create a vision for the future." },
      { fullName: "Extroverted Sensing (Se)", description: "Engages actively with the environment to achieve immediate objectives." },
      { fullName: "Introverted Feeling (Fi)", description: "Gradually develops personal values and internal moral guidelines." },
    ],
    ENTP: [
      { fullName: "Extroverted Intuition (Ne)", description: "Constantly explores new ideas and possibilities. Loves debating and considering multiple perspectives." },
      { fullName: "Introverted Thinking (Ti)", description: "Analyzes ideas logically and enjoys solving complex problems." },
      { fullName: "Extroverted Feeling (Fe)", description: "Enjoys engaging with others and fostering connections." },
      { fullName: "Introverted Sensing (Si)", description: "Gradually learns to use past experiences as a valuable reference." },
    ],
    ESFJ: [
      { fullName: "Extroverted Feeling (Fe)", description: "Prioritizes group harmony and others' needs. Naturally takes care of others." },
      { fullName: "Introverted Sensing (Si)", description: "Values tradition and uses past experiences as a guide." },
      { fullName: "Extroverted Intuition (Ne)", description: "Gradually becomes more open to exploring new ideas and possibilities." },
      { fullName: "Introverted Thinking (Ti)", description: "Occasionally uses logic to analyze and solve problems." },
    ],
    ISFP: [
      { fullName: "Introverted Feeling (Fi)", description: "Deeply in tune with personal values and authenticity." },
      { fullName: "Extroverted Sensing (Se)", description: "Lives fully in the present moment. Enjoys rich sensory experiences." },
      { fullName: "Introverted Intuition (Ni)", description: "Gradually develops insights about future possibilities." },
      { fullName: "Extroverted Thinking (Te)", description: "May struggle with structure but learns to implement practical solutions when needed." },
    ],
  };

  const functionLabels = [
    {
      title: "Dominant",
      description: "Primary mode of processing",
      icon: Brain,
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
  const [selectedTypes, setSelectedTypes] = useState(Object.keys(types));

  const handleTypeSelection = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
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
      </div>
    </div>
  );
};

export default MBTIComparison;
