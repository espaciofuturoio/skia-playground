// This file should only import and register the root. No components or exports
// should be added here.

import "@expo/metro-runtime";
import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";

// RN Skia (WASM)
import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

// First create a root element to render to
const rootElement = document.getElementById("root") || document.createElement("div");
if (!document.getElementById("root")) {
	rootElement.id = "root";
	document.body.appendChild(rootElement);
}

// Create a modern loading animation with a pulse effect
const loadingElement = document.createElement("div");
loadingElement.style.cssText = `
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #121212, #232323);
	transition: opacity 0.5s ease;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

// Create a logo placeholder
const logoElement = document.createElement("div");
logoElement.style.cssText = `
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: linear-gradient(135deg, #3498db, #9b59b6);
	margin-bottom: 24px;
	position: relative;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	animation: pulse 2s infinite, rotate 8s linear infinite;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

// Add an "S" letter inside the logo for Skia
const letterElement = document.createElement("div");
letterElement.textContent = "S";
letterElement.style.cssText = `
	color: white;
	font-size: 32px;
	font-weight: bold;
	z-index: 2;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
logoElement.appendChild(letterElement);

// Add loading text
const loadingTextElement = document.createElement("div");
loadingTextElement.textContent = "Loading Skia...";
loadingTextElement.style.cssText = `
	color: white;
	font-size: 16px;
	margin-top: 16px;
	opacity: 0.8;
`;

// Add progress dots animation
const dotsElement = document.createElement("div");
dotsElement.style.cssText = `
	display: flex;
	margin-top: 12px;
`;

// Create three dots with staggered animations
for (let i = 0; i < 3; i++) {
	const dot = document.createElement("div");
	dot.style.cssText = `
		width: 8px;
		height: 8px;
		background-color: white;
		border-radius: 50%;
		margin: 0 4px;
		opacity: 0.6;
		animation: fadeDots 1.5s infinite ${i * 0.2}s;
	`;
	dotsElement.appendChild(dot);
}

const style = document.createElement("style");
style.textContent = `
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
	}
	
	@keyframes rotate {
		0% { background-position: 0% 50%; }
		100% { background-position: 100% 50%; }
	}
	
	@keyframes fadeDots {
		0%, 100% { opacity: 0.3; transform: scale(0.8); }
		50% { opacity: 1; transform: scale(1); }
	}
	
	body {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	
	#root {
		height: 100vh;
		width: 100vw;
	}
`;

document.head.appendChild(style);
loadingElement.appendChild(logoElement);
loadingElement.appendChild(loadingTextElement);
loadingElement.appendChild(dotsElement);
rootElement.appendChild(loadingElement);

// Load the WASM file for react-native-skia
LoadSkiaWeb({ locateFile: (file) => `/${file}` }).then(() => {
	// Fade out loading animation
	loadingElement.style.opacity = "0";

	// Remove the loading animation after transition
	setTimeout(() => {
		if (loadingElement.parentNode) {
			loadingElement.parentNode.removeChild(loadingElement);
		}
	}, 500);

	// Render the actual app
	renderRootComponent(App);
});
