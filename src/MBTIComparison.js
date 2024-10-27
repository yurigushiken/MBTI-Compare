import React, { useState, useMemo } from 'react';
import {
  MdOutlineMemory,
  MdVisibility,
  MdPsychology,
  MdLightbulb,
  MdManageAccounts,
  MdTrendingUp,
  MdFavorite,
  MdFavoriteBorder,
} from 'react-icons/md';

// MBTI Types
const MBTI_TYPES_I = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP'
];

const MBTI_TYPES_E = [
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Cognitive Functions Mapping
const COGNITIVE_FUNCTIONS = {
  ISTJ: {
    Dominant: { name: 'Introverted Sensing (Si)', description: 'Focuses on internal memories, experiences, and sensations to make decisions.', icon: <MdOutlineMemory size={20} /> },
    Auxiliary: { name: 'Extraverted Thinking (Te)', description: 'Seeks external structure, efficiency, and objective logic in decision-making.', icon: <MdTrendingUp size={20} /> },
    Tertiary: { name: 'Introverted Feeling (Fi)', description: 'Uses internal values and emotions as a compass for decisions and actions.', icon: <MdFavorite size={20} /> },
    Inferior: { name: 'Extraverted Intuition (Ne)', description: 'Explores possibilities and abstract ideas externally, often in imaginative ways.', icon: <MdLightbulb size={20} /> },
  },
  ISFJ: {
    Dominant: { name: 'Introverted Sensing (Si)', description: 'Focuses on internalized sensory experiences and dependable past events.', icon: <MdOutlineMemory size={20} /> },
    Auxiliary: { name: 'Extraverted Feeling (Fe)', description: 'Prioritizes harmony in relationships and seeks to meet others’ emotional needs.', icon: <MdFavoriteBorder size={20} /> },
    Tertiary: { name: 'Introverted Thinking (Ti)', description: 'Analyzes and categorizes information based on internal logical principles.', icon: <MdManageAccounts size={20} /> },
    Inferior: { name: 'Extraverted Intuition (Ne)', description: 'Explores possibilities and different perspectives externally.', icon: <MdLightbulb size={20} /> },
  },
  INFJ: {
    Dominant: { name: 'Introverted Intuition (Ni)', description: 'Processes abstract ideas deeply to develop insights about the future.', icon: <MdPsychology size={20} /> },
    Auxiliary: { name: 'Extraverted Feeling (Fe)', description: 'Seeks to understand others’ emotions and foster harmony in social settings.', icon: <MdFavoriteBorder size={20} /> },
    Tertiary: { name: 'Introverted Thinking (Ti)', description: 'Evaluates information critically, using internal logical systems.', icon: <MdManageAccounts size={20} /> },
    Inferior: { name: 'Extraverted Sensing (Se)', description: 'Engages with the external world in a direct, physical manner.', icon: <MdVisibility size={20} /> },
  },
  INTJ: {
    Dominant: { name: 'Introverted Intuition (Ni)', description: 'Focuses on synthesizing complex ideas to create a vision of the future.', icon: <MdPsychology size={20} /> },
    Auxiliary: { name: 'Extraverted Thinking (Te)', description: 'Organizes and structures the external world logically for efficiency.', icon: <MdTrendingUp size={20} /> },
    Tertiary: { name: 'Introverted Feeling (Fi)', description: 'Draws upon inner values and personal beliefs to make decisions.', icon: <MdFavorite size={20} /> },
    Inferior: { name: 'Extraverted Sensing (Se)', description: 'Focuses on experiencing the physical environment in a direct way.', icon: <MdVisibility size={20} /> },
  },
  ISTP: {
    Dominant: { name: 'Introverted Thinking (Ti)', description: 'Uses logical analysis internally to make sense of situations.', icon: <MdManageAccounts size={20} /> },
    Auxiliary: { name: 'Extraverted Sensing (Se)', description: 'Acts quickly on sensory information from the environment.', icon: <MdVisibility size={20} /> },
    Tertiary: { name: 'Introverted Intuition (Ni)', description: 'Generates insights and anticipates future outcomes.', icon: <MdPsychology size={20} /> },
    Inferior: { name: 'Extraverted Feeling (Fe)', description: 'Seeks to create harmony and connect with others externally.', icon: <MdFavoriteBorder size={20} /> },
  },
  ISFP: {
    Dominant: { name: 'Introverted Feeling (Fi)', description: 'Values personal feelings and experiences deeply, guiding decisions.', icon: <MdFavorite size={20} /> },
    Auxiliary: { name: 'Extraverted Sensing (Se)', description: 'Engages actively with the immediate sensory environment.', icon: <MdVisibility size={20} /> },
    Tertiary: { name: 'Introverted Intuition (Ni)', description: 'Reflects on abstract ideas to understand the future.', icon: <MdPsychology size={20} /> },
    Inferior: { name: 'Extraverted Thinking (Te)', description: 'Uses external logic to structure decisions when needed.', icon: <MdTrendingUp size={20} /> },
  },
  INFP: {
    Dominant: { name: 'Introverted Feeling (Fi)', description: 'Uses personal feelings and values as a guide for decision-making.', icon: <MdFavorite size={20} /> },
    Auxiliary: { name: 'Extraverted Intuition (Ne)', description: 'Explores abstract ideas and possibilities in the external world.', icon: <MdLightbulb size={20} /> },
    Tertiary: { name: 'Introverted Sensing (Si)', description: 'Relies on past experiences and internal sensations to understand the present.', icon: <MdOutlineMemory size={20} /> },
    Inferior: { name: 'Extraverted Thinking (Te)', description: 'Structures external environments and makes objective decisions when needed.', icon: <MdTrendingUp size={20} /> },
  },
  INTP: {
    Dominant: { name: 'Introverted Thinking (Ti)', description: 'Analyzes situations logically and thoroughly, focusing on internal consistency.', icon: <MdManageAccounts size={20} /> },
    Auxiliary: { name: 'Extraverted Intuition (Ne)', description: 'Generates possibilities and seeks abstract connections.', icon: <MdLightbulb size={20} /> },
    Tertiary: { name: 'Introverted Sensing (Si)', description: 'Relates to previous experiences to navigate the present.', icon: <MdOutlineMemory size={20} /> },
    Inferior: { name: 'Extraverted Feeling (Fe)', description: 'Attempts to create harmony in social contexts.', icon: <MdFavoriteBorder size={20} /> },
  },
  ESTP: {
    Dominant: { name: 'Extraverted Sensing (Se)', description: 'Lives in the moment and takes direct action based on immediate sensory input.', icon: <MdVisibility size={20} /> },
    Auxiliary: { name: 'Introverted Thinking (Ti)', description: 'Analyzes information logically, focusing on practical problem-solving.', icon: <MdManageAccounts size={20} /> },
    Tertiary: { name: 'Extraverted Feeling (Fe)', description: 'Attempts to understand others and maintain harmonious relationships.', icon: <MdFavoriteBorder size={20} /> },
    Inferior: { name: 'Introverted Intuition (Ni)', description: 'Seeks deeper understanding and future insights.', icon: <MdPsychology size={20} /> },
  },
  ESFP: {
    Dominant: { name: 'Extraverted Sensing (Se)', description: 'Engages actively with the physical environment, enjoying sensory experiences.', icon: <MdVisibility size={20} /> },
    Auxiliary: { name: 'Introverted Feeling (Fi)', description: 'Uses internal values and personal feelings as a guide.', icon: <MdFavorite size={20} /> },
    Tertiary: { name: 'Extraverted Thinking (Te)', description: 'Structures tasks and takes action efficiently when needed.', icon: <MdTrendingUp size={20} /> },
    Inferior: { name: 'Introverted Intuition (Ni)', description: 'Seeks deeper insights and understanding in rare moments.', icon: <MdPsychology size={20} /> },
  },
  ENFP: {
    Dominant: { name: 'Extraverted Intuition (Ne)', description: 'Explores possibilities and connects abstract ideas in the external world.', icon: <MdLightbulb size={20} /> },
    Auxiliary: { name: 'Introverted Feeling (Fi)', description: 'Uses personal values to navigate decisions.', icon: <MdFavorite size={20} /> },
    Tertiary: { name: 'Extraverted Thinking (Te)', description: 'Organizes thoughts and actions efficiently when needed.', icon: <MdTrendingUp size={20} /> },
    Inferior: { name: 'Introverted Sensing (Si)', description: 'References past experiences to make sense of the present.', icon: <MdOutlineMemory size={20} /> },
  },
  ENTP: {
    Dominant: { name: 'Extraverted Intuition (Ne)', description: 'Generates new ideas and sees possibilities in every situation.', icon: <MdLightbulb size={20} /> },
    Auxiliary: { name: 'Introverted Thinking (Ti)', description: 'Analyzes concepts internally for logical consistency.', icon: <MdManageAccounts size={20} /> },
    Tertiary: { name: 'Extraverted Feeling (Fe)', description: 'Seeks to create harmony in interactions with others.', icon: <MdFavoriteBorder size={20} /> },
    Inferior: { name: 'Introverted Sensing (Si)', description: 'Uses past experiences to understand the current context.', icon: <MdOutlineMemory size={20} /> },
  },
  ESTJ: {
    Dominant: { name: 'Extraverted Thinking (Te)', description: 'Takes charge and organizes external environments effectively.', icon: <MdTrendingUp size={20} /> },
    Auxiliary: { name: 'Introverted Sensing (Si)', description: 'Uses dependable past experiences to make decisions.', icon: <MdOutlineMemory size={20} /> },
    Tertiary: { name: 'Extraverted Intuition (Ne)', description: 'Explores new possibilities and ideas.', icon: <MdLightbulb size={20} /> },
    Inferior: { name: 'Introverted Feeling (Fi)', description: 'Relies on personal values occasionally, especially under stress.', icon: <MdFavorite size={20} /> },
  },
  ESFJ: {
    Dominant: { name: 'Extraverted Feeling (Fe)', description: 'Prioritizes others’ needs and maintains social harmony.', icon: <MdFavoriteBorder size={20} /> },
    Auxiliary: { name: 'Introverted Sensing (Si)', description: 'Uses past experiences to guide present behavior.', icon: <MdOutlineMemory size={20} /> },
    Tertiary: { name: 'Extraverted Intuition (Ne)', description: 'Explores new possibilities and potential ideas.', icon: <MdLightbulb size={20} /> },
    Inferior: { name: 'Introverted Thinking (Ti)', description: 'Evaluates situations internally through logic, usually under stress.', icon: <MdManageAccounts size={20} /> },
  },
  ENFJ: {
    Dominant: { name: 'Extraverted Feeling (Fe)', description: 'Focuses on understanding others’ needs and maintaining harmony.', icon: <MdFavoriteBorder size={20} /> },
    Auxiliary: { name: 'Introverted Intuition (Ni)', description: 'Processes abstract ideas to generate future insights.', icon: <MdPsychology size={20} /> },
    Tertiary: { name: 'Extraverted Sensing (Se)', description: 'Engages directly with the external world.', icon: <MdVisibility size={20} /> },
    Inferior: { name: 'Introverted Thinking (Ti)', description: 'Analyzes concepts logically in moments of stress.', icon: <MdManageAccounts size={20} /> },
  },
  ENTJ: {
    Dominant: { name: 'Extraverted Thinking (Te)', description: 'Organizes and structures external environments for efficiency.', icon: <MdTrendingUp size={20} /> },
    Auxiliary: { name: 'Introverted Intuition (Ni)', description: 'Synthesizes information to create strategic visions.', icon: <MdPsychology size={20} /> },
    Tertiary: { name: 'Extraverted Sensing (Se)', description: 'Engages actively with the present moment.', icon: <MdVisibility size={20} /> },
    Inferior: { name: 'Introverted Feeling (Fi)', description: 'Occasionally draws upon personal values for decision-making.', icon: <MdFavorite size={20} /> },
  },
};

const COMPATIBILITY_PARAGRAPHS = {
  "ISFJ-INFJ": "The ISFJ relies on Introverted Sensing to recall past experiences, while the INFJ uses Introverted Intuition to synthesize insights about the future. Both types share a focus on harmony, with ISFJ prioritizing group needs through Extraverted Feeling, similar to INFJ.",
  "ISFJ-INTJ": "ISFJ focuses on tradition and practicality through Sensing, while INTJ uses Intuition to look toward future possibilities. The ISFJ values maintaining harmony in the present, whereas the INTJ is more strategic and future-oriented.",
  "ISFJ-ESFP": "The ISFJ values stability and draws on past experiences, while the ESFP lives fully in the present moment. ISFJs are more structured and practical, whereas ESFPs are adaptable and driven by the excitement of the moment.",
  "INFJ-INTJ": "INFJ and INTJ both rely on Introverted Intuition, but the INFJ focuses more on harmony and people, whereas the INTJ uses logic to achieve strategic goals. INFJs tend to guide others emotionally, while INTJs lead by implementing efficient structures.",
  "INFJ-ENFP": "INFJ and ENFP both enjoy exploring possibilities, but the INFJ tends to keep insights internal while focusing on future outcomes. ENFPs explore outwardly, engaging with new ideas and possibilities while guided by their inner values.",
  "INTJ-ENTJ": "INTJs are focused on strategic vision through Introverted Intuition, whereas ENTJs are more action-oriented, focusing on organizing people and resources effectively. Both types are goal-driven but differ in how they execute their visions.",
  "ESFP-ENTJ": "ESFPs live in the present and adapt quickly, while ENTJs are driven to organize and achieve future goals. ESFPs focus on sensory experiences and immediate joy, whereas ENTJs emphasize efficiency and strategic actions.",
  "ENTJ-ENTP": "ENTJs and ENTPs are both extroverted thinkers but differ in their approaches. ENTJs are structured and methodical in executing plans, while ENTPs are flexible, brainstorming possibilities and enjoying debates.",
  "ENTP-ENFP": "ENTPs and ENFPs are both enthusiastic and love exploring new possibilities. However, ENTPs are more logical, enjoying debate and solving problems, while ENFPs prioritize staying true to their values and helping others grow.",
  "ESTJ-ISTJ": "Both ESTJ and ISTJ value traditions and reliability, but ESTJ is more extroverted, leading by organizing their environment. ISTJs prefer working behind the scenes and rely heavily on their past experiences for decisions.",
  "ISTJ-INFP": "ISTJs rely on tradition and consistency, while INFPs are driven by their values and emotions. ISTJs are practical and grounded, whereas INFPs focus on authenticity and exploring their inner ideals.",
  "ISFP-ISTP": "ISFPs are deeply connected to their values and enjoy living in the present, whereas ISTPs are problem solvers who analyze situations logically. ISFPs are driven by emotions, while ISTPs emphasize understanding how things work.",
  "ISFP-ENFJ": "ISFPs value authenticity and have a strong sense of identity, whereas ENFJs are driven to help others achieve growth. ISFPs prefer taking a personal approach, while ENFJs are natural leaders who consider the group’s well-being.",
  "ENFJ-ESFJ": "ENFJs and ESFJs both prioritize the well-being of others, but ENFJs are more visionary, seeing how to help people grow. ESFJs focus on maintaining harmony and stability, often relying on traditions and structured environments.",
  "ENTP-INTP": "ENTPs and INTPs share a love for logical analysis and possibilities. ENTPs are more outgoing and enjoy engaging with others through debate, while INTPs are more reserved, preferring deep theoretical exploration.",
  "ENFJ-INTJ": "ENFJs use their empathy to lead and inspire others, while INTJs are more focused on achieving long-term goals through strategic thinking. ENFJs guide others towards growth, whereas INTJs focus on creating and following efficient plans.",
  "ISFJ-ESTJ": "ISFJs and ESTJs both value tradition and stability. ISFJs are nurturing and focus on personal relationships, while ESTJs are natural leaders who organize their environment to achieve efficiency.",
  "ISTP-ESTP": "ISTPs and ESTPs both prefer hands-on experiences, but ISTPs are more analytical, understanding systems deeply. ESTPs are more outgoing and thrive on action, quickly adapting to opportunities in their environment.",
  "ESTJ-ENFJ": "ESTJs focus on efficiency and organization, while ENFJs prioritize the emotional well-being and growth of others. ESTJs often lead through structured plans, whereas ENFJs lead by inspiring and understanding people.",
  "INFP-INFJ": "INFPs and INFJs both seek meaning, but INFPs are more focused on their inner values, whereas INFJs look for patterns and insights to help others. INFJs often have a future-oriented vision, while INFPs value personal authenticity above all.",
  "ISFP-ENTP": "ISFPs are deeply in tune with their personal values and prefer to live in the moment, whereas ENTPs thrive on debate and exploring ideas. ISFPs focus on authenticity, while ENTPs are driven by curiosity and logical analysis.",
  "ISTJ-ENFP": "ISTJs rely on structure and predictability, while ENFPs thrive on spontaneity and creativity. ISTJs are practical and focused on details, whereas ENFPs explore possibilities and focus on connecting ideas in new ways."
};

const MBTIComparison = () => {
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // Generate a sorted key to ensure consistency in TYPE_COMPARISONS
  const comparisonKey = useMemo(() => {
    if (!type1 || !type2) return null;
    const sortedTypes = [type1, type2].sort();
    return `${sortedTypes[0]}-${sortedTypes[1]}`;
  }, [type1, type2]);

  const comparison = comparisonKey ? COMPATIBILITY_PARAGRAPHS[comparisonKey] : null;

  const getTypeColor = (type) => {
    // Color coding based on type preferences
    if (type.startsWith('E')) return 'bg-red-800';
    return 'bg-purple-800';
  };

  // Handle type selection and toggle info display
  const handleTypeSelection = (selectedType) => {
    if (!type1) {
      setType1(selectedType);
    } else if (!type2 && selectedType !== type1) {
      setType2(selectedType);
      setShowInfo(true);
    } else {
      // Reset selections if both types are already selected
      setType1(selectedType);
      setType2('');
      setShowInfo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-gray-900 text-gray-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 p-6">
          <h1 className="text-4xl font-bold text-center text-white">
            MBTI Type Comparison
          </h1>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Type Selection */}
            <div className="flex flex-col items-center">
              {/* Introvert Types Row */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {MBTI_TYPES_I.map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    className={`px-4 py-2 rounded-full text-lg font-semibold flex items-center gap-2
                      ${'bg-purple-700 hover:bg-purple-600'}
                      ${type1 === type || type2 === type ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={type1 === type || type2 === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {/* Extrovert Types Row */}
              <div className="flex flex-wrap justify-center gap-4">
                {MBTI_TYPES_E.map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    className={`px-4 py-2 rounded-full text-lg font-semibold flex items-center gap-2
                      ${'bg-red-700 hover:bg-red-600'}
                      ${type1 === type || type2 === type ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={type1 === type || type2 === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {type1 && type2 && (
                <button
                  onClick={() => { setType1(''); setType2(''); setShowInfo(false); }}
                  className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-white font-semibold"
                >
                  Reset Selection
                </button>
              )}
            </div>

            {/* Type Display */}
            {type1 && type2 && (
              <div className="flex justify-center gap-8 text-center">
                <div className={`p-4 rounded-lg ${getTypeColor(type1)} w-32`}>
                  <div className="text-2xl font-bold">{type1}</div>
                </div>
                <div className={`p-4 rounded-lg ${getTypeColor(type2)} w-32`}>
                  <div className="text-2xl font-bold">{type2}</div>
                </div>
              </div>
            )}

            {/* Comparison Display */}
            {comparison ? (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-lg leading-relaxed">{comparison}</p>
              </div>
            ) : (
              type1 && type2 && (
                <div className="text-center text-gray-400">
                  Select two different personality types to see their compatibility
                </div>
              )
            )}

            {/* Advanced Information: Cognitive Functions Table */}
            {type1 && type2 && (
              <div className="mt-8 overflow-auto">
                <table className="min-w-full bg-gray-700 rounded-lg table-fixed">
                  <thead>
                    <tr>
                      <th className="w-1/4 py-4 px-6 bg-gray-800 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Cognitive Functions
                      </th>
                      <th className="w-1/4 py-4 px-6 bg-gray-800 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        {type1 || ""}
                      </th>
                      <th className="w-1/4 py-4 px-6 bg-gray-800 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        {type2 || ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Dominant', 'Auxiliary', 'Tertiary', 'Inferior'].map(func => (
                      <tr key={func} className="border-t border-gray-600">
                        <td className="w-1/4 py-4 px-6 text-base font-medium text-gray-200 flex items-center">
                          {COGNITIVE_FUNCTIONS[type1]?.[func]?.icon}
                          <span className="ml-2">{func}</span>
                        </td>
                        <td className="w-1/4 py-4 px-6 text-base text-gray-300">
                          {COGNITIVE_FUNCTIONS[type1]?.[func] ? (
                            <div>
                              <div className="flex items-center">
                                {COGNITIVE_FUNCTIONS[type1][func].icon}
                                <span className="ml-2 font-bold">{COGNITIVE_FUNCTIONS[type1][func].name}</span>
                              </div>
                              <p className="mt-1 text-sm text-gray-400">{COGNITIVE_FUNCTIONS[type1][func].description}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">Not applicable</p>
                          )}
                        </td>
                        <td className="w-1/4 py-4 px-6 text-base text-gray-300">
                          {COGNITIVE_FUNCTIONS[type2]?.[func] ? (
                            <div>
                              <div className="flex items-center">
                                {COGNITIVE_FUNCTIONS[type2][func].icon}
                                <span className="ml-2 font-bold">{COGNITIVE_FUNCTIONS[type2][func].name}</span>
                              </div>
                              <p className="mt-1 text-sm text-gray-400">{COGNITIVE_FUNCTIONS[type2][func].description}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">Not applicable</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Compatibility Information */}
        {type1 && type2 && comparison && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Compatibility Information</h2>
            <p className="text-lg leading-relaxed text-gray-300">{comparison}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIComparison;
