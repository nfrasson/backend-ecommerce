#!/bin/bash

# Directory where the subfolders are located
PARENT_DIR="./layers"

# Iterate over each subdirectory in the specified parent directory
for dir in "$PARENT_DIR"/*; do
    if [ -d "$dir" ] && [ -d "$dir/nodejs" ]; then
        echo "Processing directory: $dir"

        # Run npm ci in the nodejs subdirectory
        (cd "$dir/nodejs" && npm ci)

        echo "Compressing directory: $dir, do not interrupt..."
        # Compress the nodejs directory into a zip file
        (cd "$dir" && zip -rq "nodejs.zip" .)
    else
        echo "Skipping $dir, either not a directory or nodejs subdirectory does not exist"
    fi
done
