# EcoSort AI - Setup Guide

Complete installation and setup instructions for the EcoSort project.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Dataset Setup](#dataset-setup)
4. [Training the Model](#training-the-model)
5. [Running the Demo](#running-the-demo)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **Python**: 3.8 or higher
- **RAM**: Minimum 8GB (16GB recommended for training)
- **Storage**: 5GB free space for datasets
- **GPU**: Optional but recommended for training (CUDA-compatible)

### Software Dependencies
- Python 3.8+
- pip (Python package manager)
- Git
- Virtual environment tool (venv or conda)

---

## Installation

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/lekkson-byte/ecosort.git
cd ecosort
```

### Step 2: Create Virtual Environment

**Using venv (recommended):**
```bash
# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate
```

**Using conda:**
```bash
conda create -n ecosort python=3.9
conda activate ecosort
```

### Step 3: Install Dependencies

```bash
# Install all required packages
pip install -r requirements.txt

# Verify installation
python -c "import tensorflow as tf; print(f'TensorFlow {tf.__version__} installed')"
```

### Step 4: Verify Installation

```bash
# Run quick test
python ecosort_model.py
```

Expected output:
```
Initializing EcoSort Model...
Model Architecture:
...
Model initialized successfully!
```

---

## Dataset Setup

### Option 1: Automated Setup (Recommended)

```bash
# Create dataset structure and download TrashNet
python data_preparation.py --download-trashnet --setup-structure
```

### Option 2: Manual Setup

#### 1. Download TrashNet
```bash
# Download from GitHub
git clone https://github.com/garythung/trashnet.git data/trashnet
```

#### 2. Download TACO Dataset
```bash
# Visit and download from
# http://tacodataset.org/
# Extract to: data/taco/
```

#### 3. Download Kaggle Dataset

First, setup Kaggle API:
```bash
# Install Kaggle CLI
pip install kaggle

# Get API credentials from https://www.kaggle.com/account
# Place kaggle.json in:
# - Linux/Mac: ~/.kaggle/kaggle.json
# - Windows: C:\Users\YourUsername\.kaggle\kaggle.json

# Download dataset
kaggle datasets download -d techsash/waste-classification-data
unzip waste-classification-data.zip -d data/kaggle_waste/
```

### Dataset Structure

After setup, your data directory should look like:
```
data/
├── train/
│   ├── cardboard/
│   ├── glass/
│   ├── metal/
│   ├── paper/
│   ├── plastic/
│   └── organic/
├── validation/
│   └── (same structure)
├── test/
│   └── (same structure)
└── dataset_info.json
```

### Organizing Images

Move downloaded images into the appropriate folders:
```bash
# Example: Organize TrashNet images
python organize_images.py --source data/trashnet --dest data/train
```

---

## Training the Model

### Quick Start Training

```bash
# Train with default settings (MobileNetV2)
python ecosort_model.py --train --epochs 25
```

### Custom Training Options

```bash
# Train custom CNN
python ecosort_model.py --train --model custom --epochs 50 --batch-size 32

# Train with specific data paths
python ecosort_model.py \
  --train \
  --train-dir data/train \
  --val-dir data/validation \
  --epochs 25 \
  --batch-size 16
```

### Training Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--epochs` | 25 | Number of training epochs |
| `--batch-size` | 32 | Batch size for training |
| `--learning-rate` | 0.001 | Initial learning rate |
| `--model` | mobilenet | Model type (custom/mobilenet) |

### Expected Training Time

- **CPU Only**: 2-4 hours (25 epochs)
- **GPU (CUDA)**: 30-60 minutes (25 epochs)

### Monitor Training

Training will display:
```
Epoch 1/25
234/234 [==============================] - 45s 192ms/step
loss: 1.2345 - accuracy: 0.7854 - val_loss: 0.9876 - val_accuracy: 0.8234
```

---

## Running the Demo

### Basic Usage

```bash
# Classify a single image
python ecosort_demo.py --image path/to/waste_item.jpg
```

### Advanced Usage

```bash
# Specify location for local recycling rules
python ecosort_demo.py \
  --image bottle.jpg \
  --location "New York, NY"

# Save results to JSON
python ecosort_demo.py \
  --image can.jpg \
  --save-results
```

### Example Output

```
🌍 ECOSORT AI - WASTE CLASSIFICATION RESULTS
============================================================

📸 Image: bottle.jpg

✅ Classification: PLASTIC
🎯 Confidence: 94.2%
📦 Material: PET #1 Plastic

♻️  RECYCLABLE

📋 Disposal Instructions:
   Bin Color: Blue
   
   Preparation Steps:
   1. Rinse thoroughly to remove residue
   2. Remove caps and labels if possible
   3. Crush to save space

💡 Note: Most curbside programs accept #1 and #2 plastics
```

---

## Testing the Model

### Run Unit Tests

```bash
# Install pytest if not already installed
pip install pytest

# Run all tests
pytest tests/

# Run specific test
pytest tests/test_model.py
```

### Evaluate Model Performance

```bash
# Evaluate on test set
python ecosort_model.py --evaluate --test-dir data/test
```

Expected metrics:
```
=== Test Results ===
Test Loss: 0.3456
Test Accuracy: 87.3%
Top-3 Accuracy: 96.5%
```

---

## Troubleshooting

### Common Issues

#### Issue: TensorFlow Installation Fails
```bash
# Try installing with specific version
pip install tensorflow==2.10.0

# For Apple Silicon (M1/M2)
pip install tensorflow-macos tensorflow-metal
```

#### Issue: CUDA/GPU Not Detected
```bash
# Check GPU availability
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

# Install CUDA-compatible TensorFlow
pip install tensorflow-gpu==2.10.0
```

#### Issue: Out of Memory During Training
```bash
# Reduce batch size
python ecosort_model.py --train --batch-size 8

# Or use mixed precision
python ecosort_model.py --train --mixed-precision
```

#### Issue: Dataset Not Found
```bash
# Verify data structure
python -c "from pathlib import Path; print(list(Path('data/train').glob('*')))"

# Re-run setup
python data_preparation.py --setup-structure
```

### Getting Help

1. **Check Documentation**: Review README.md
2. **GitHub Issues**: Search existing issues
3. **Discussions**: Join GitHub Discussions
4. **Debug Mode**: Run with `--verbose` flag

---

## Next Steps

After successful setup:

1. ✅ **Train the model** with your dataset
2. ✅ **Test with your own images** using the demo
3. ✅ **Contribute improvements** (see CONTRIBUTING.md)
4. ✅ **Deploy** to a mobile app or web service

---

## Additional Resources

- [TensorFlow Documentation](https://www.tensorflow.org/tutorials)
- [Keras Guide](https://keras.io/guides/)
- [OpenCV Tutorials](https://docs.opencv.org/master/d9/df8/tutorial_root.html)
- [Building AI Course](https://buildingai.elementsofai.com/)

---

**Need help? Open an issue on GitHub!** 🚀