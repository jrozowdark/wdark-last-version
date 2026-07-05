#!/bin/bash
set -e

echo "Installing dependencies..."
npm ci --legacy-peer-deps || npm install --legacy-peer-deps

echo "Rebuilding native modules for Linux..."
npm rebuild

echo "Building application..."
npm run build

echo "Build completed successfully!"
