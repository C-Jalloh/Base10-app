#!/bin/bash

# Script to start Expo with the OLED-optimized configuration
# This uses --tunnel to ensure it works on physical devices across different networks

echo "🚀 Starting Base10 App in Development Mode..."
echo "📱 Optimized for OLED (Deep Emerald Theme)"

# Check if tunnel is needed or if we should use LAN
# Tunnel is most reliable for physical devices
npx expo start --tunnel --clear
