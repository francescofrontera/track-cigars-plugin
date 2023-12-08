import SearchCigarsPlugin from "@src/main";

import { App, PluginSettingTab, Setting } from "obsidian";

export interface SearchCigarsSettings {
	folder: string;
}

export const DEFAULT_SETTINGS: SearchCigarsSettings = {
	folder: "cigars",
};

export default class SearchCigarsSettingsTab extends PluginSettingTab {
	plugin: SearchCigarsPlugin;

	constructor(app: App, plugin: SearchCigarsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Cigar folder")
			.setDesc("The folder in which stores the cigar")
			.addText((text) =>
				text
					.setPlaceholder("cigar")
					.setValue(this.plugin.settings.folder)
					.onChange(async (value) => {
						this.plugin.settings.folder = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
