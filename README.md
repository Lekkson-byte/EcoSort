# EcoSort: AI-Powered Home Waste Sorter

Building AI course project

## Summary

EcoSort is a mobile application that uses machine vision to instantly identify different types of household waste (plastic, paper, glass, compost) and provides location-specific instructions for proper local disposal and recycling. Its goal is to maximize recycling rates and minimize household contamination.


## Background

### What problem does your idea solve?

The biggest challenge in home recycling is contamination and confusion. Residents often "wish-cycle," throwing items into the recycling bin hoping they belong, even if they don't (e.g., greasy pizza boxes, dirty plastics, non-recyclable films). This contamination can cause entire loads of genuinely recyclable material to be sent to landfills or incinerators.

### How common is this problem?

* This is a daily problem faced by nearly every household that attempts to recycle
* Contamination rates in municipal recycling streams often exceed 20-25% in many regions
* The EPA reports that only 32% of U.S. waste gets recycled, partly due to sorting confusion
* An estimated 25% of recycling is contaminated and ends up in landfills anyway

### Personal motivation

Inspired by the complexity of local recycling rules (e.g., "plastic clamshells OK, but plastic films NOT OK"), and the high volume of material that still ends up in landfills due to contamination, I want to create a simple, intuitive tool that removes guesswork from the process. Watching neighbors struggle with what goes where every trash day highlighted this universal need.

### Why is this important?

Improving recycling purity is crucial for environmental sustainability. By providing instantaneous, accurate guidance, EcoSort increases the volume of waste that truly gets recycled, supporting the goals of a circular economy and reducing landfill burden. Every correctly sorted item contributes to reduced carbon emissions and resource conservation.


## How is it used?

EcoSort is used by individuals (homeowners and renters) in their kitchen or disposal area when sorting their waste. The workflow is simple:

1. **Open the EcoSort app** on your smartphone
2. **Point your phone camera** at the waste item
3. **The app identifies** the material type and condition in real-time
4. **Receive instant instructions** specific to your ZIP code

### Example Scenario

**Sarah in Portland** finds a yogurt container after lunch. She's not sure if it's recyclable. She opens EcoSort, points her phone at it, and the app identifies it as "#5 polypropylene." It checks Portland's recycling rules and tells her: 

> ✓ **Recyclable in Portland**  
> Rinse thoroughly, remove foil lid, place in blue recycling bin

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Recycling_symbol.svg/300px-Recycling_symbol.svg.png" width="200">

### Who benefits?

* **Direct Users**: Individuals whose recycling efforts become faster and more accurate
* **Municipalities/Recycling Centers**: Reduced contamination rates lower processing costs and increase material value
* **The Environment**: More high-purity material successfully routed back into manufacturing cycles
* **Future Generations**: Reduced landfill burden and carbon footprint


## Data sources and AI methods

### Primary Data Sources

| Data Type | Source | Purpose | License |
| --------- | ------ | ------- | ------- |
| Waste Images | [TACO Dataset](http://tacodataset.org/) | Training CNN for object recognition | CC BY 4.0 |
| Waste Images | [TrashNet](https://github.com/garythung/trashnet) | Classification model training | MIT License |
| Waste Images | [Kaggle Waste Classification](https://www.kaggle.com/datasets/techsash/waste-classification-data) | Additional training data | Database License |
| Municipal Rules | City Open Data Portals | Location-specific recycling guidelines | Public APIs |
| Material Stats | [EPA MSW Data](https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling) | Understanding waste composition | Public Domain |

### AI Techniques

#### 1. Convolutional Neural Network (CNN) for Image Classification

The core of EcoSort uses a deep learning CNN architecture to classify waste items:

```python
import tensorflow as tf
from tensorflow.keras import layers, models

def create_ecosort_model():
    """
    EcoSort CNN Model Architecture
    Input: 224x224 RGB images
    Output: 6 waste categories (plastic, paper, glass, metal, cardboard, organic)
    """
    model = models.Sequential([
        # Convolutional Block 1
        layers.Conv2D(32, (3,3), activation='relu', input_shape=(224, 224, 3)),
        layers.MaxPooling2D(2, 2),
        
        # Convolutional Block 2
        layers.Conv2D(64, (3,3), activation='relu'),
        layers.MaxPooling2D(2, 2),
        
        # Convolutional Block 3
        layers.Conv2D(128, (3,3), activation='relu'),
        layers.MaxPooling2D(2, 2),
        
        # Dense Layers
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(6, activation='softmax')  # 6 waste categories
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model
```

#### 2. Transfer Learning with MobileNetV2

For production deployment on mobile devices:

```python
from tensorflow.keras.applications import MobileNetV2

# Load pre-trained MobileNetV2
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)

# Freeze base model layers
base_model.trainable = False

# Add custom classification head
model = tf.keras.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(6, activation='softmax')
])
```

**Benefits:**
- Inference time < 100ms on mobile devices
- Model size < 10MB for app download
- 85%+ accuracy on real-world images

#### 3. Location-Based Rule Engine

```python
def get_recycling_instructions(material_type, zip_code):
    """
    Query municipal database for location-specific rules
    """
    rules = query_database(zip_code)
    
    if material_type in rules['accepted_materials']:
        return {
            'recyclable': True,
            'bin_type': rules['bin_type'],
            'preparation': rules['preparation_steps'],
            'special_notes': rules.get('notes', '')
        }
    else:
        return {
            'recyclable': False,
            'disposal': 'regular_trash',
            'reason': rules.get('rejection_reason', 'Not accepted locally')
        }
```


## Challenges

### What the project does NOT solve:

* **Policy and Infrastructure**: Cannot fix limited local recycling infrastructure or policy inconsistencies between municipalities
* **Chemical Purity**: Cannot reliably determine exact chemical composition or degree of contamination in plastics that affects true recyclability
* **User Compliance**: Provides accurate guidance but cannot enforce proper disposal behavior
* **Global Coverage**: Initial version focuses on U.S. municipalities with open data portals
* **Complex Items**: Multi-material items (e.g., juice boxes with plastic spouts) require manual judgment

### Technical hurdles:

* **Real-World Variety**: Accurately classifying objects regardless of lighting conditions, camera angles, partial crushing, or visible dirt is challenging
* **Data Imbalance**: Some waste types (e.g., compostables, hazardous materials) have fewer training images in public datasets
* **Municipal Data Updates**: Keeping location-specific rules current requires ongoing manual verification and updates
* **Edge Cases**: Unusual packaging formats or regional variations may not be in training data

### Ethical considerations:

* **False Confidence**: Must ensure the app doesn't create false confidence in "recyclability" when local facilities can't actually process certain materials
* **Privacy**: Image capture should not store personal information; all processing done locally or with secure, privacy-preserving methods
* **Accessibility**: Must work for users with limited vision through audio feedback
* **Economic Impact**: Should not disadvantage waste workers by promoting automation of sorting jobs


## What next?

### Short-term enhancements (3-6 months):

* **Expand Dataset**: Collect 10,000+ additional real-world images through community crowdsourcing campaigns
* **Multilingual Support**: Translate instructions into Spanish, Mandarin, and 10+ other languages
* **Offline Mode**: Download local rules for use without internet connection
* **Voice Assistant**: Integrate with Alexa/Google Home for hands-free operation
* **Barcode Scanner**: Scan product barcodes for manufacturer-specific recycling info

### Long-term vision (1-2 years):

* **Gamification Platform**: 
  - Track user's recycling success with personalized dashboards
  - Community leaderboards and challenges
  - Environmental impact metrics: "You've saved 15kg of CO₂ this month!"
  - Virtual rewards and badges for consistent proper sorting

* **Commercial Partnerships**: 
  - Partner with major brands (Coca-Cola, Unilever, P&G) to identify their specific packaging
  - Direct links to manufacturer recycling programs
  - QR code integration for instant product identification

* **Industrial Scaling**: 
  - Adapt the CNN model for use by robotic arms in municipal recycling facilities (similar to ZenRobotics)
  - Real-time quality control checks during automated sorting
  - Reduce human exposure to hazardous materials

* **Policy Integration**:
  - Partner with municipalities to provide recycling data analytics
  - Help cities identify which materials have highest contamination rates
  - Inform policy decisions on which materials to accept

### Skills/assistance needed:

* **Mobile App Developers**: React Native or Flutter experience for iOS/Android deployment
* **Data Scientists**: To improve model accuracy and reduce bias
* **Municipal Partnerships**: At least one city waste management department for pilot testing and data access
* **Community Volunteers**: For data labeling and expanding training datasets
* **UX Designers**: To ensure app is intuitive for all age groups and technical abilities
* **Funding**: Initial estimate $50,000-$100,000 for development and pilot program


## Acknowledgments

### Data Sources
* **[TACO Dataset](http://tacodataset.org/)** by Pedro F. Proença and Pedro Simões / CC BY 4.0 - Primary image dataset with 1,500+ annotated waste images
* **[TrashNet](https://github.com/garythung/trashnet)** by Gary Thung and Mindy Yang / MIT License - 2,527 images across 6 waste categories
* **[Kaggle Waste Classification Data](https://www.kaggle.com/datasets/techsash/waste-classification-data)** / Database License - 25,000+ waste images for training
* **EPA Municipal Solid Waste Data** - Statistical context and problem validation

### Inspiration & Technical Resources
* **Zen Robotics Case Study** - Inspiration for high-purity recycling systems using AI-powered robotic sorting
* **Elements of AI Course** by University of Helsinki & Reaktor - Foundational knowledge in CNNs and classification techniques
* **MobileNetV2** by Google Research - Model architecture for efficient on-device inference
* **TensorFlow & Keras Documentation** - Deep learning framework for model development

### Images & Graphics
* Recycling symbol image from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Recycling_symbol.svg) / Public Domain

### Special Thanks
* **Building AI Course Community** - For feedback and encouragement
* **Open Source Contributors** - For maintaining the datasets and tools that make this project possible