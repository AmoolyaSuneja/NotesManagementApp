#!/bin/bash

echo "Starting Notes Manager App..."
echo ""

echo "Installing dependencies..."
npm run install-all

echo ""
echo "Starting development servers..."
echo "Backend will run on http://localhost:5000"
echo "Frontend will run on http://localhost:3000"
echo ""

npm run dev
