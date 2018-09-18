#!/bin/bash
echo "Building"
cd api && npm install && npm run build && cd ../
echo "Running"
pm2-runtime start ecosystem.config.js --env production