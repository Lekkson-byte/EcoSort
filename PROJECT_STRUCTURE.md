# EcoSort AI - Project Structure

Complete overview of the project file organization and what each file does.

## 📁 Root Directory Structure

```
ecosort/
├── README.md                    # Main project documentation
├── LICENSE                      # MIT License
├── SETUP.md                     # Installation & setup guide
├── CONTRIBUTING.md              # Contribution guidelines
├── PROJECT_STRUCTURE.md         # This file
├── requirements.txt             # Python dependencies
├── .gitignore                   # Git ignore rules
│
├── ecosort_model.py            # Core ML model implementation
├── ecosort_demo.py             # Interactive demo script
├── data_preparation.py         # Dataset download & setup
│
├── data/                        # Dataset directory (gitignored)
│   ├── train/                   # Training images
│   ├── validation/              # Validation images
│   ├── test/                    # Test images
│   ├── dataset_info.json        # Dataset metadata
│   └── .gitkeep                 # Keep directory in Git
│
├── models/                      # Saved models (gitignored)
│   ├── ecosort_best_model.h5    # Best trained model
│   ├── mobilenet_v1.h5          # MobileNet variant
│   └── .gitkeep                 # Keep directory in Git
│
├── notebooks/                   # Jupyter notebooks (optional)
│   ├── 01_data_exploration.ipynb
│   ├── 02_model_training.ipynb
│   └── 03_evaluation.ipynb
│
├── tests/                       # Unit tests
│   ├── __init__.py
│   ├── test_model.py
│   ├── test_preprocessing.py
│   └── test_predictions.py
│
├── docs/                        # Additional documentation
│   ├── api_documentation.md
│   ├── model_architecture.md
│   └── deployment_guide.md
│
└── assets/                      # Project assets
    ├── images/
    │   ├── logo.png
    │   ├── banner.jpg
    │   └── screenshots/
    └── diagrams/
        ├── architecture.png
        └── workflow.png
```

---

## 📄 File Descriptions

### Core Python Files

#### `ecosort_model.py`
**Purpose**: Main model implementation  
**Key Classes**: 
- `EcoSortModel` - CNN model class with training/prediction
**Functions**:
- `build_custom_cnn()` - Custom CNN architecture
- `build_mobilenet()` - Transfer learning with MobileNetV2
- `train()` - Model training pipeline
- `predict()` - Image classification
- `evaluate()` - Model evaluation

**Usage**:
```bash
python ecosort_model.py                    # Initialize model
python ecosort_model.py --train            # Train model
python ecosort_model.py --evaluate         # Evaluate model
```

#### `ecosort_demo.py`
**Purpose**: Interactive command-line demo  
**Key Functions**:
- `simulate_prediction()` - Demo prediction (replace with real model)
- `get_recycling_instructions()` - Location-based rules
- `print_results()` - Formatted output display

**Usage**:
```bash
python ecosort_demo.py --image waste.jpg
python ecosort_demo.py --image can.jpg --location "Portland, OR"
python ecosort_demo.py --image bottle.jpg --save-results
```

#### `data_preparation.py`
**Purpose**: Dataset downloading and organization  
**Key Classes**:
- `DatasetDownloader` - Handles dataset downloads
**Functions**:
- `download_trashnet()` - Download TrashNet dataset
- `download_taco()` - Instructions for TACO dataset
- `setup_kaggle_dataset()` - Kaggle dataset setup
- `organize_dataset_structure()` - Create folder structure

**Usage**:
```bash
python data_preparation.py --download-trashnet
python data_preparation.py --setup-structure
```

---

### Configuration Files

#### `requirements.txt`
**Purpose**: Python package dependencies  
**Contains**:
- TensorFlow/Keras for ML
- OpenCV for image processing
- NumPy, Pandas for data handling
- Flask for API (future deployment)

#### `.gitignore`
**Purpose**: Exclude files from Git  
**Ignores**:
- Large model files (*.h5)
- Dataset images
- Python cache files
- Environment variables

---

### Documentation Files

#### `README.md`
**Purpose**: Main project documentation  
**Sections**:
- Project summary
- Background and motivation
- How to use
- Data sources and AI methods
- Challenges and limitations
- Future roadmap
- Acknowledgments

#### `SETUP.md`
**Purpose**: Detailed installation guide  
**Sections**:
- Prerequisites
- Installation steps
- Dataset setup
- Training instructions
- Demo usage
- Troubleshooting

#### `CONTRIBUTING.md`
**Purpose**: Contribution guidelines  
**Sections**:
- How to contribute
- Code style guide
- Pull request process
- Community guidelines

#### `LICENSE`
**Purpose**: MIT License terms  
**Includes**: Third-party dataset licenses

---

## 📊 Data Directory Structure

```
data/
├── train/                       # 70% of data
│   ├── cardboard/               # ~1,750 images
│   ├── glass/                   # ~1,750 images
│   ├── metal/                   # ~1,750 images
│   ├── paper/                   # ~1,750 images
│   ├── plastic/                 # ~1,750 images
│   └── organic/                 # ~1,750 images
│
├── validation/                  # 15% of data
│   ├── cardboard/               # ~375 images
│   ├── glass/                   # ~375 images
│   ├── metal/                   # ~375 images
│   ├── paper/                   # ~375 images
│   ├── plastic/                 # ~375 images
│   └── organic/                 # ~375 images
│
├── test/                        # 15% of data
│   └── (same structure)
│
├── raw/                         # Original downloaded datasets
│   ├── trashnet/
│   ├── taco/
│   └── kaggle_waste/
│
└── dataset_info.json            # Metadata and statistics
```

---

## 🧪 Tests Directory Structure

```
tests/
├── __init__.py
├── conftest.py                  # Pytest configuration
├── test_model.py                # Model unit tests
├── test_preprocessing.py        # Image preprocessing tests
├── test_predictions.py          # Prediction accuracy tests
├── test_data_loading.py         # Data pipeline tests
└── fixtures/                    # Test data
    ├── sample_plastic.jpg
    ├── sample_glass.jpg
    └── sample_metal.jpg
```

---

## 📓 Notebooks Directory (Optional)

```
notebooks/
├── 01_data_exploration.ipynb    # EDA and visualization
├── 02_model_training.ipynb      # Interactive training
├── 03_evaluation.ipynb          # Model performance analysis
├── 04_error_analysis.ipynb      # Misclassification study
└── 05_experiments.ipynb         # Model experiments
```

---

## 🎨 Assets Directory

```
assets/
├── images/
│   ├── logo.png                 # EcoSort logo
│   ├── banner.jpg               # Repository banner
│   ├── icon.png                 # App icon
│   └── screenshots/
│       ├── demo_1.png
│       ├── demo_2.png
│       └── results.png
│
├── diagrams/
│   ├── architecture.png         # Model architecture diagram
│   ├── workflow.png             # Project workflow
│   └── data_flow.png            # Data pipeline
│
└── presentations/
    └── ecosort_pitch.pdf        # Project presentation
```

---

## 🚀 Deployment Files (Future)

```
deployment/                      # Future deployment configs
├── Dockerfile                   # Docker container
├── docker-compose.yml           # Multi-container setup
├── app.py                       # Flask/FastAPI web app
├── mobile/
│   ├── android/                 # Android app
│   └── ios/                     # iOS app
└── cloud/
    ├── aws_lambda.py            # AWS Lambda function
    └── gcp_function.py          # Google Cloud Function
```

---

## 📦 File Size Guidelines

To keep the repository clean and manageable:

| File Type | Max Size | Location | Git Tracking |
|-----------|----------|----------|--------------|
| Python code | < 100 KB | Root/tests | ✅ Tracked |
| Documentation | < 500 KB | docs/ | ✅ Tracked |
| Model files | < 50 MB | models/ | ❌ Ignored |
| Dataset images | Any | data/ | ❌ Ignored |
| Notebooks | < 5 MB | notebooks/ | ⚠️ Optional |

---

## 🔄 Typical Development Workflow

1. **Setup**: Clone repo → Install dependencies → Download datasets
2. **Development**: Create branch → Make changes → Test locally
3. **Training**: Organize data → Train model → Evaluate performance
4. **Testing**: Run unit tests → Test with real images → Fix issues
5. **Documentation**: Update README → Add comments → Create examples
6. **Contribution**: Commit changes → Push to fork → Create PR

---

## 📋 Checklist for New Contributors

- [ ] Clone repository
- [ ] Read README.md and SETUP.md
- [ ] Install dependencies from requirements.txt
- [ ] Download at least one dataset
- [ ] Run data_preparation.py to setup structure
- [ ] Run ecosort_model.py to verify installation
- [ ] Try ecosort_demo.py with sample images
- [ ] Read CONTRIBUTING.md
- [ ] Choose an issue or feature to work on

---

## 🔗 Related Files

| If you need... | Look at... |
|----------------|------------|
| Installation help | SETUP.md |
| Usage examples | README.md |
| Code guidelines | CONTRIBUTING.md |
| Model details | ecosort_model.py |
| Demo usage | ecosort_demo.py |
| Dataset info | data_preparation.py |

---

## 📞 Maintenance

**Regular Updates Needed**:
- Dataset links (if broken)
- Package versions in requirements.txt
- Model performance metrics
- Documentation accuracy
- Screenshot updates

**Version Control**:
- Use semantic versioning (v1.0.0)
- Tag releases on GitHub
- Maintain CHANGELOG.md

---

**Last Updated**: December 2025  
**Project Version**: 1.0.0