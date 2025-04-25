#!/bin/bash

output="all_files_combined.txt"
> "$output"  # Clear if it exists

find . -type f | while read file; do
    echo "===== $file =====" >> "$output"
    cat "$file" >> "$output"
    echo -e "\n" >> "$output"
done
