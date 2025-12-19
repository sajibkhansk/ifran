#!/bin/bash

echo "🚀 GitHub Repository Setup"
echo "=========================="
echo ""
echo "Please follow these steps:"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Repository name: ifran"
echo "3. Description: Modern architecture portfolio website with database integration"
echo "4. Choose Public or Private"
echo "5. DO NOT initialize with README"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter after creating the repository on GitHub..."
echo ""
read -p "Enter your GitHub username: " username
echo ""

# Add remote
git remote add origin https://github.com/$username/ifran.git

echo ""
echo "✅ Remote added successfully!"
echo ""
echo "Now pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📦 Your repository: https://github.com/$username/ifran"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add environment variable: DATABASE_URL"
echo "4. Deploy!"
echo ""
echo "See DEPLOYMENT.md for detailed instructions."
