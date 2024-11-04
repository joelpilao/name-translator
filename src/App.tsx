import React, { useState, useMemo } from 'react';

// Types
interface NameData {
  englishName: string;
  filipinoName: string;
  meaning: {
    english: string;
    filipino: string;
  };
  gender: 'male' | 'female' | 'neutral';
  alternativeTranslations: string[];
  relatedNames: string[];
}

// Sample database
const nameDatabase: NameData[] = [
  {
    englishName: "John",
    filipinoName: "Juan",
    meaning: {
      english: "God is gracious",
      filipino: "Ang Diyos ay mapagbiyaya"
    },
    gender: "male",
    alternativeTranslations: ["Juanito", "Jhon"],
    relatedNames: ["Johannes", "Ivan", "Sean"]
  },
  {
    englishName: "Mary",
    filipinoName: "Maria",
    meaning: {
      english: "Beloved, bitter",
      filipino: "Minamahal, mapait"
    },
    gender: "female",
    alternativeTranslations: ["Mae", "Mari"],
    relatedNames: ["Marie", "Miriam", "Maya"]
  },
  {
    englishName: "Michael",
    filipinoName: "Miguel",
    meaning: {
      english: "Who is like God?",
      filipino: "Sino ang tulad ng Diyos?"
    },
    gender: "male",
    alternativeTranslations: ["Mikael", "Miguelito"],
    relatedNames: ["Michel", "Mikhail", "Mikko"]
  },
  // Add more names as needed
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedName, setSelectedName] = useState<NameData | null>(null);

  const filteredNames = useMemo(() => {
    if (!searchQuery) return [];
    return nameDatabase.filter(name =>
      name.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Name Translator 🔄
        </h1>
        
        {/* Search Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter an English name..."
            className="w-full px-6 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {filteredNames.map((name) => (
            <div
              key={name.englishName}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedName(name)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {name.englishName} → {name.filipinoName}
                  </h2>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    name.gender === 'male' ? 'bg-blue-100 text-blue-800' :
                    name.gender === 'female' ? 'bg-pink-100 text-pink-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {name.gender}
                  </span>
                </div>
              </div>

              {/* Meaning Section */}
              <div className="space-y-2 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-semibold">English Meaning:</span> {name.meaning.english}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Filipino Meaning:</span> {name.meaning.filipino}
                  </p>
                </div>
              </div>

              {/* Alternative Translations */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Alternative Translations:</h3>
                <div className="flex flex-wrap gap-2">
                  {name.alternativeTranslations.map((alt, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Names */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Related Names:</h3>
                <div className="flex flex-wrap gap-2">
                  {name.relatedNames.map((related, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {related}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {searchQuery && filteredNames.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No names found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App; 