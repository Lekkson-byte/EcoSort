# Contributing to EcoSort AI

Thank you for your interest in contributing to EcoSort! This project aims to improve recycling accuracy through AI, and we welcome contributions from everyone.

## How to Contribute

### 1. Reporting Issues
- Use GitHub Issues to report bugs or suggest features
- Provide detailed descriptions with screenshots if applicable
- Check existing issues before creating new ones

### 2. Contributing Code

#### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/yourusername/ecosort.git
cd ecosort

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Making Changes
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Commit with clear messages: `git commit -m "Add: Brief description"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

### 3. Contributing Data

We need diverse waste images to improve model accuracy:

#### Image Contribution Guidelines
- **Quality**: Clear, well-lit photos
- **Variety**: Different angles, lighting conditions, backgrounds
- **Labels**: Properly categorized (plastic, glass, metal, etc.)
- **Format**: JPEG or PNG, minimum 500x500 pixels
- **Privacy**: No personal information visible

#### How to Submit Images
1. Organize images by category
2. Create a pull request with images in appropriate folders
3. Include a CSV with metadata (optional):
   - Image filename
   - Category
   - Material type
   - Condition (clean/dirty/crushed)
   - Location captured (optional)

### 4. Improving Documentation

Help us improve:
- README clarity
- Code comments
- Tutorial creation
- Translation to other languages

### 5. Testing

Help test the model:
- Try with your own waste images
- Report accuracy issues
- Test on different devices
- Verify location-specific recycling rules

## Code Style

- Follow PEP 8 for Python code
- Use meaningful variable names
- Add docstrings to functions
- Comment complex logic
- Keep functions focused and small

## Commit Message Guidelines

Use clear, descriptive commit messages:
- `Add: New feature or file`
- `Fix: Bug fix`
- `Update: Modify existing feature`
- `Docs: Documentation changes`
- `Test: Add or modify tests`

## Pull Request Process

1. Update README.md with details of changes if needed
2. Ensure all tests pass
3. Update documentation
4. Get approval from at least one maintainer
5. Squash commits if requested

## Community Guidelines

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the project goals
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Acknowledged in project presentations

## Questions?

- Open a discussion on GitHub
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make recycling easier and more accurate! 🌍♻️**