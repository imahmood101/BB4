#!/bin/bash

# Change to the project directory
cd "$(dirname "$0")"

# Open terminals and run dev commands
if [ "$(uname)" == "Darwin" ]; then
  # macOS
  osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"'/backend && pnpm run dev"'
  osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"'/frontend && pnpm run dev"'
else
  # Linux/other
  gnome-terminal --tab -- bash -c "cd $(pwd)/backend && pnpm run dev; bash"
  gnome-terminal --tab -- bash -c "cd $(pwd)/frontend && pnpm run dev; bash"
fi

echo "Development servers started!"