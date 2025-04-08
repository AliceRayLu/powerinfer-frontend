export const parseJson = (str) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

export const bytesToKB = (bytes) => {
    if (bytes === null) {
        return null;
    }
    return (bytes / 1024).toFixed(2);
}

export const bytesToMB = (bytes) => {
    if (bytes === null) {
        return null;
    }
  return (bytes / (1024 * 1024)).toFixed(2);
}

export const bytesToGB = (bytes) => {
    if (bytes === null) {
        return null;
    }
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export const autoFormatBytes = (bytes) => {
    if (bytes === null || bytes === undefined) {
        return null;
    }
    if (bytes < 1024) {
        return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
        return `${bytesToKB(bytes)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${bytesToMB(bytes)} MB`;
    } else {
        return `${bytesToGB(bytes)} GB`;
    }
}

import { marked } from 'marked';

export const markdownToHtml = (markdown) => {
    if (!markdown) {
        return null;
    }
    try {
        return marked.parse(markdown);
    } catch (error) {
        console.error("Failed to convert Markdown to HTML:", error);
        return null;
    }
}