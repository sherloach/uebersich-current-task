#!/usr/bin/osascript

on readFile()
    -- Set the file path of the Markdown file
    set filePath to "/Users/hayden/Documents/Obsidian/daily.md"

    -- Read the contents of the file
    set fileContents to read POSIX file filePath as «class utf8»

    return fileContents
end readFile

readFile()
