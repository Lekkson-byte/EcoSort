# EcoSort AI - Quick Start Guide

Get EcoSort running in 5 minutes! ⚡

## 🚀 Fast Track Installation

```bash
# 1. Clone and navigate
git clone https://github.com/lekkson-byte/ecosort.git
cd ecosort

# 2. Setup Python environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Verify installation
python ecosort_model.py
```

**Done!** ✅ Your environment is ready.

---

## 🎯 Try the Demo (No Training Required)

Test with a sample image immediately:

```bash
# Download a sample image (or use your own)
curl -o bottle.jpg https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400

# Run classification
python ecosort_demo.py --image bottle.jpg

# Try with different location
python ecosort_demo.py --image bottle.jpg --location "New York, NY"
```

**Output Example**:
```
🌍 ECOSORT AI - WASTE CLASSIFICATION RESULTS
============================================================
📸 Image: bottle.jpg
✅ Classification: PLASTIC
🎯 Confidence: 94.2%
♻️  RECYCLABLE
```

---

## 📊 Setup Data (5-10 minutes)

### Quick Option: TrashNet Only
```bash
python data_preparation.py --download-trashnet --setup-structure
```

### Full Dataset Setup
Follow instructions for:
1. **TrashNet** - Auto-download available
2. **TACO** - Manual download from http://tacodataset.org/
3. **Kaggle** - Requires API setup (see SETUP.md)

---

## 🎓 Train Your First Model (30-60 minutes)

```bash
# Quick training (5 epochs for testing)
python ecosort_model.py --train --epochs 5 --batch-size 16

# Full training (recommended)
python ecosort_model.py --train --epochs 25
```

**Training Progress**:
```
Epoch 1/25
234/234 [======] - 45s 192ms/step
loss: 1.2345 - accuracy: 0.7854
```

---

## 🧪 Test Your Model

```bash
# Evaluate performance
python ecosort_model.py --evaluate --test-dir data/test

# Test with your own images
python ecosort_demo.py --image your_waste.jpg
```

---

## 📱 What's Next?

### Immediate Actions
- [ ] Try the demo with 5 different waste items
- [ ] Review classification accuracy
- [ ] Read full README.md

### Short-term Goals
- [ ] Download complete datasets
- [ ] Train model for 25 epochs
- [ ] Achieve 85%+ accuracy
- [ ] Test with real household waste

### Long-term Vision
- [ ] Contribute new training images
- [ ] Improve model accuracy
- [ ] Add new waste categories
- [ ] Deploy as mobile app

---

## 🆘 Common Quick Fixes

### Issue: TensorFlow Not Installing
```bash
pip install tensorflow==2.10.0
```

### Issue: CUDA Not Found
```bash
# CPU-only version (slower but works)
pip install tensorflow-cpu
```

### Issue: Data Directory Missing
```bash
python data_preparation.py --setup-structure
```

---

## 📚 Essential Links

- **Full Setup Guide**: [SETUP.md](SETUP.md)
- **How to Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Project Structure**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Dataset Sources**:
  - TrashNet: https://github.com/garythung/trashnet
  - TACO: http://tacodataset.org/
  - Kaggle: https://kaggle.com/datasets/techsash/waste-classification-data

---

## 💡 Pro Tips

1. **Start Small**: Use 5 epochs to test your setup first
2. **GPU Training**: Much faster if you have CUDA-compatible GPU
3. **Data Matters**: More diverse images = better accuracy
4. **Test Often**: Try real-world images to validate performance
5. **Contribute**: Share your improvements with the community!

---

## 🎉 You're Ready!

Congratulations! You now have EcoSort running. Start classifying waste and help make recycling easier for everyone! 🌍♻️

**Questions?** Open an issue on GitHub or check the full documentation.

---

**Time to First Prediction**: < 5 minutes  
**Time to First Training**: < 1 hour  
**Time to Production**: Your contribution matters! 🚀