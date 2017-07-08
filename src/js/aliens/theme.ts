// themes for alien-related items
export function Theme(ThemeProvider: ng.material.IThemingProvider) {
	createPalette(0, "alien-green", "green", "189247");
	createPalette(1, "alien-yellow", "yellow", "c39c07");
	createPalette(2, "alien-red", "red", "c31b09");

	function createPalette(index: number, name: string, base: string, main: string): void {
		ThemeProvider.definePalette(name, ThemeProvider.extendPalette(base, {
			500: main,
			contrastDefaultColor: "light"
		}));
		ThemeProvider.theme("alien" + index).primaryPalette(name).accentPalette("deep-purple");
	}
}