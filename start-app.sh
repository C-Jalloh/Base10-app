#!/bin/bash

# Script to start Expo with the OLED-optimized configuration
# This uses --tunnel to ensure it works on physical devices across different networks

echo "🚀 Starting Base10 App in Development Mode..."
echo "📱 Optimized for OLED (Deep Emerald Theme)"

# Check if tunnel is needed or if we should use LAN
# Tunnel is most reliable for physical devices
# Added NODE_OPTIONS to handle potential fetch issues in Node 18+
# Removed --clear by default to make subsequent starts faster and more stable for Fast Refresh
# You can still run with --clear manually if needed: ./start-app.sh --clear
NODE_OPTIONS="--dns-result-order=ipv4first" npx expo start --tunnel "$@"
