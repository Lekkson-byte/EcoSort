import React, { useState, useRef } from 'react';
import { Camera, Upload, MapPin, Recycle, Info, AlertCircle } from 'lucide-react';

const EcoSortDemo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('Portland, OR 97201');
  const fileInputRef = useRef(null);

  // Simulated waste categories with recycling rules
  const wasteCategories = {
    plastic: {
      name: 'Plastic Bottle',
      material: 'PET #1 Plastic',
      recyclable: true,
      instructions: 'Rinse thoroughly, remove cap, place in blue recycling bin',
      confidence: 0.94,
      color: 'blue',
      icon: '♻️'
    },
    cardboard: {
      name: 'Cardboard Box',
      material: 'Corrugated Cardboard',
      recyclable: true,
      instructions: 'Flatten box, remove tape/labels, place in blue recycling bin',
      confidence: 0.91,
      color: 'blue',
      icon: '📦'
    },
    glass: {
      name: 'Glass Bottle',
      material: 'Clear Glass',
      recyclable: true,
      instructions: 'Rinse clean, remove cap, place in glass recycling bin',
      confidence: 0.88,
      color: 'green',
      icon: '🍾'
    },
    metal: {
      name: 'Aluminum Can',
      material: 'Aluminum',
      recyclable: true,
      instructions: 'Rinse can, crush if possible, place in blue recycling bin',
      confidence: 0.96,
      color: 'blue',
      icon: '🥫'
    },
    paper: {
      name: 'Paper/Magazine',
      material: 'Mixed Paper',
      recyclable: true,
      instructions: 'Keep dry and clean, place in paper recycling bin',
      confidence: 0.89,
      color: 'blue',
      icon: '📄'
    },
    organic: {
      name: 'Food Waste',
      material: 'Organic Material',
      recyclable: false,
      instructions: 'Place in green compost bin or regular trash',
      confidence: 0.87,
      color: 'green',
      icon: '🍎'
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        simulateAIClassification();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIClassification = () => {
    setLoading(true);
    setPrediction(null);
    
    // Simulate AI processing time
    setTimeout(() => {
      const categories = Object.keys(wasteCategories);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setPrediction(wasteCategories[randomCategory]);
      setLoading(false);
    }, 1500);
  };

  const getRecyclingBinColor = () => {
    if (!prediction) return 'gray';
    return prediction.recyclable ? prediction.color : 'red';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Recycle className="w-10 h-10 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">EcoSort AI</h1>
                <p className="text-gray-600">Intelligent Waste Classification System</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Upload Waste Item
            </h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt="Uploaded waste" 
                  className="max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                  <p className="text-gray-600">Click to upload an image</p>
                  <p className="text-sm text-gray-400">or drag and drop</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {selectedImage && (
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setPrediction(null);
                }}
                className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear & Upload New
              </button>
            )}

            {/* Demo Images */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Try demo images:</p>
              <div className="grid grid-cols-3 gap-2">
                {['plastic', 'cardboard', 'glass'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedImage(`/demo-${type}.jpg`);
                      setTimeout(() => {
                        setPrediction(wasteCategories[type]);
                      }, 1500);
                      setLoading(true);
                      setTimeout(() => setLoading(false), 1500);
                    }}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors capitalize"
                  >
                    {wasteCategories[type].icon} {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Classification Results
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                <p className="text-gray-600">Analyzing image...</p>
              </div>
            ) : prediction ? (
              <div className="space-y-4">
                {/* Classification Result */}
                <div className={`p-4 rounded-lg ${prediction.recyclable ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{prediction.name}</h3>
                    <span className="text-3xl">{prediction.icon}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Material: {prediction.material}</p>
                  <p className="text-sm text-gray-600">Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                </div>

                {/* Recyclability Status */}
                <div className={`p-4 rounded-lg ${prediction.recyclable ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {prediction.recyclable ? (
                      <Recycle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    )}
                    <h4 className="font-bold text-gray-800">
                      {prediction.recyclable ? 'Recyclable ✓' : 'Not Recyclable ✗'}
                    </h4>
                  </div>
                </div>

                {/* Disposal Instructions */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Disposal Instructions:</h4>
                  <p className="text-gray-700">{prediction.instructions}</p>
                </div>

                {/* Location-Specific Info */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Local Guidelines for {location}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Based on Portland Metro recycling rules. Guidelines may vary by location.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Environmental Impact</h4>
                  <p className="text-sm text-gray-700">
                    {prediction.recyclable 
                      ? 'By recycling this item correctly, you help reduce landfill waste and conserve natural resources!'
                      : 'Proper disposal prevents contamination of recyclable materials.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Recycle className="w-16 h-16 mb-4" />
                <p>Upload an image to start classification</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">How EcoSort Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800 mb-1">1. Image Capture</p>
              <p>Take a photo or upload an image of your waste item</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">2. AI Classification</p>
              <p>Our CNN model identifies the material type and condition</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">3. Local Instructions</p>
              <p>Get disposal guidelines specific to your location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoSortDemo;