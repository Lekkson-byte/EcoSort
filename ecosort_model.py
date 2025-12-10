"""
EcoSort AI - Interactive Demo Script
Building AI Course Final Project

This script provides a command-line interface for testing
the EcoSort waste classification system.
"""

import argparse
import json
import cv2
import numpy as np
from pathlib import Path
import sys

# Recycling rules database (simulated)
RECYCLING_RULES = {
    'plastic': {
        'recyclable': True,
        'material_type': 'PET #1 Plastic',
        'preparation': [
            'Rinse thoroughly to remove residue',
            'Remove caps and labels if possible',
            'Crush to save space'
        ],
        'bin_color': 'Blue',
        'notes': 'Most curbside programs accept #1 and #2 plastics'
    },
    'glass': {
        'recyclable': True,
        'material_type': 'Clear/Colored Glass',
        'preparation': [
            'Rinse clean',
            'Remove metal caps',
            'Do not break glass'
        ],
        'bin_color': 'Green',
        'notes': 'Broken glass may not be accepted - check local rules'
    },
    'metal': {
        'recyclable': True,
        'material_type': 'Aluminum/Steel',
        'preparation': [
            'Rinse can',
            'Crush if possible',
            'Remove paper labels'
        ],
        'bin_color': 'Blue',
        'notes': 'Metal has high recycling value'
    },
    'paper': {
        'recyclable': True,
        'material_type': 'Mixed Paper',
        'preparation': [
            'Keep dry',
            'Remove plastic windows from envelopes',
            'Flatten boxes'
        ],
        'bin_color': 'Blue',
        'notes': 'Wet or greasy paper cannot be recycled'
    },
    'cardboard': {
        'recyclable': True,
        'material_type': 'Corrugated Cardboard',
        'preparation': [
            'Flatten boxes',
            'Remove tape and labels',
            'Keep dry'
        ],
        'bin_color': 'Blue',
        'notes': 'Pizza boxes with grease are not recyclable'
    },
    'organic': {
        'recyclable': False,
        'material_type': 'Organic Waste',
        'preparation': [
            'Place in compost bin if available',
            'Otherwise dispose in regular trash'
        ],
        'bin_color': 'Green (compost) or Gray (trash)',
        'notes': 'Check if your area has composting programs'
    }
}

# Location-specific variations (simulated)
LOCATION_RULES = {
    'Portland, OR': {
        'accepts_glass': True,
        'accepts_plastic_types': [1, 2, 5],
        'composting_available': True,
        'special_notes': 'Portland has comprehensive recycling programs'
    },
    'New York, NY': {
        'accepts_glass': True,
        'accepts_plastic_types': [1, 2],
        'composting_available': False,
        'special_notes': 'No plastic bags in blue bins'
    },
    'San Francisco, CA': {
        'accepts_glass': True,
        'accepts_plastic_types': [1, 2, 4, 5],
        'composting_available': True,
        'special_notes': 'Mandatory composting program'
    }
}


def simulate_prediction(image_path):
    """
    Simulate AI prediction (for demo purposes)
    In production, this would use the trained model
    
    Args:
        image_path (str): Path to image file
        
    Returns:
        dict: Simulated prediction results
    """
    # For demo, randomly select a category
    # In production, this would be: model.predict(image_path)
    import random
    
    categories = list(RECYCLING_RULES.keys())
    predicted_category = random.choice(categories)
    confidence = random.uniform(0.75, 0.98)
    
    # Generate top 3 predictions
    other_categories = [cat for cat in categories if cat != predicted_category]
    random.shuffle(other_categories)
    
    top_3 = [
        {'category': predicted_category, 'confidence': confidence}
    ]
    
    remaining_prob = 1.0 - confidence
    for i, cat in enumerate(other_categories[:2]):
        prob = remaining_prob * random.uniform(0.3, 0.7)
        top_3.append({'category': cat, 'confidence': prob})
        remaining_prob -= prob
    
    return {
        'category': predicted_category,
        'confidence': confidence,
        'top_3': top_3
    }


def get_recycling_instructions(category, location='Portland, OR'):
    """
    Get recycling instructions for a category and location
    
    Args:
        category (str): Waste category
        location (str): User location
        
    Returns:
        dict: Complete recycling instructions
    """
    rules = RECYCLING_RULES.get(category, {})
    location_info = LOCATION_RULES.get(location, {})
    
    return {
        **rules,
        'location': location,
        'location_specific': location_info
    }


def print_results(prediction, instructions, image_path):
    """
    Pretty print the classification results
    
    Args:
        prediction (dict): Prediction results
        instructions (dict): Recycling instructions
        image_path (str): Path to classified image
    """
    print("\n" + "="*60)
    print("🌍 ECOSORT AI - WASTE CLASSIFICATION RESULTS")
    print("="*60)
    
    print(f"\n📸 Image: {Path(image_path).name}")
    
    # Main prediction
    print(f"\n✅ Classification: {prediction['category'].upper()}")
    print(f"🎯 Confidence: {prediction['confidence']:.1%}")
    
    # Material type
    if instructions.get('material_type'):
        print(f"📦 Material: {instructions['material_type']}")
    
    # Recyclability status
    print(f"\n{'♻️  RECYCLABLE' if instructions.get('recyclable') else '🗑️  NOT RECYCLABLE'}")
    
    # Disposal instructions
    print(f"\n📋 Disposal Instructions:")
    print(f"   Bin Color: {instructions.get('bin_color', 'N/A')}")
    
    if instructions.get('preparation'):
        print("\n   Preparation Steps:")
        for i, step in enumerate(instructions['preparation'], 1):
            print(f"   {i}. {step}")
    
    # Special notes
    if instructions.get('notes'):
        print(f"\n💡 Note: {instructions['notes']}")
    
    # Location-specific info
    if instructions.get('location_specific'):
        loc_info = instructions['location_specific']
        print(f"\n📍 Local Guidelines ({instructions['location']}):")
        if loc_info.get('special_notes'):
            print(f"   {loc_info['special_notes']}")
    
    # Top 3 predictions
    print(f"\n🏆 Top 3 Predictions:")
    for i, pred in enumerate(prediction['top_3'], 1):
        print(f"   {i}. {pred['category'].capitalize()}: {pred['confidence']:.1%}")
    
    # Environmental impact
    if instructions.get('recyclable'):
        print("\n🌱 Environmental Impact:")
        print("   By recycling this item correctly, you help:")
        print("   • Reduce landfill waste")
        print("   • Conserve natural resources")
        print("   • Decrease carbon emissions")
    
    print("\n" + "="*60)


def load_and_display_image(image_path):
    """
    Load and display basic image info
    
    Args:
        image_path (str): Path to image file
    """
    try:
        img = cv2.imread(image_path)
        if img is None:
            print(f"❌ Error: Could not load image from {image_path}")
            return False
        
        height, width = img.shape[:2]
        print(f"\n📊 Image Info: {width}x{height} pixels")
        return True
    except Exception as e:
        print(f"❌ Error loading image: {e}")
        return False


def main():
    """
    Main demo function
    """
    parser = argparse.ArgumentParser(
        description='EcoSort AI - Waste Classification Demo'
    )
    parser.add_argument(
        '--image',
        type=str,
        required=True,
        help='Path to waste item image'
    )
    parser.add_argument(
        '--location',
        type=str,
        default='Portland, OR',
        help='Your location (e.g., "Portland, OR")'
    )
    parser.add_argument(
        '--save-results',
        action='store_true',
        help='Save results to JSON file'
    )
    
    args = parser.parse_args()
    
    # Check if image exists
    if not Path(args.image).exists():
        print(f"❌ Error: Image file not found: {args.image}")
        sys.exit(1)
    
    # Load image
    print("\n🔍 Loading image...")
    if not load_and_display_image(args.image):
        sys.exit(1)
    
    # Simulate AI prediction
    print("🤖 Analyzing waste item with AI...")
    prediction = simulate_prediction(args.image)
    
    # Get recycling instructions
    instructions = get_recycling_instructions(
        prediction['category'],
        args.location
    )
    
    # Display results
    print_results(prediction, instructions, args.image)
    
    # Save results if requested
    if args.save_results:
        output_file = Path(args.image).stem + '_results.json'
        results = {
            'image': args.image,
            'prediction': prediction,
            'instructions': instructions
        }
        
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n💾 Results saved to: {output_file}")
    
    print("\n✅ Classification complete!\n")


if __name__ == "__main__":
    # If no arguments provided, show help
    if len(sys.argv) == 1:
        print("\n🌍 EcoSort AI - Waste Classification Demo")
        print("="*50)
        print("\nUsage examples:")
        print('  python ecosort_demo.py --image waste.jpg')
        print('  python ecosort_demo.py --image bottle.jpg --location "New York, NY"')
        print('  python ecosort_demo.py --image can.jpg --save-results')
        print("\nFor full help:")
        print('  python ecosort_demo.py --help\n')
    else:
        main()