// cosmic theme
export default function Theme(ThemeProvider: ng.material.IThemingProvider) {
	ThemeProvider.definePalette("cosmic-warn", ThemeProvider.extendPalette("red", {
		"500": "c31b09",
		"contrastDefaultColor": "dark"
	}));

	ThemeProvider.theme("default").primaryPalette("deep-purple").accentPalette("amber");
	ThemeProvider.theme("warn").primaryPalette("cosmic-warn").accentPalette("orange");
}