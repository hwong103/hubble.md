// @vitest-environment happy-dom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { filePathForTitlePreview, SourceModeToggle } from "./FileInfoBar";

describe("file info title preview", () => {
	it("shows a pending title before its file is renamed", () => {
		expect(
			filePathForTitlePreview("/workspace/draft-2.md", {
				path: "/workspace/draft-2.md",
				previewPath: "/workspace/draft.md",
			}),
		).toBe("/workspace/draft.md");
	});

	it("does not show another tab's pending title", () => {
		expect(
			filePathForTitlePreview("/workspace/notes.md", {
				path: "/workspace/draft-2.md",
				previewPath: "/workspace/draft.md",
			}),
		).toBe("/workspace/notes.md");
	});
});

describe("SourceModeToggle", () => {
	let container: HTMLDivElement;
	let root: Root;

	beforeEach(() => {
		vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
		container = document.createElement("div");
		document.body.append(container);
		root = createRoot(container);
	});

	afterEach(async () => {
		await act(async () => root.unmount());
		container.remove();
		vi.unstubAllGlobals();
	});

	async function renderSourceModeToggle(
		viewMode: "rich" | "source",
		onChange: (viewMode: "rich" | "source") => void,
	) {
		await act(async () =>
			root.render(<SourceModeToggle viewMode={viewMode} onChange={onChange} />),
		);
	}

	it("shows the active editor view and switches in either direction", async () => {
		const onChange = vi.fn();
		await renderSourceModeToggle("rich", onChange);

		const buttons = Array.from(
			container.querySelectorAll<HTMLButtonElement>("button"),
		);
		expect(
			buttons.map((button) => [
				button.textContent,
				button.getAttribute("aria-pressed"),
			]),
		).toEqual([
			["Rich text", "true"],
			["Markdown", "false"],
		]);

		await act(async () => buttons[1]?.click());
		expect(onChange).toHaveBeenCalledWith("source");

		await renderSourceModeToggle("source", onChange);
		expect(
			container
				.querySelector('[aria-label="Markdown"]')
				?.getAttribute("aria-pressed"),
		).toBe("true");

		await act(async () =>
			container
				.querySelector<HTMLButtonElement>('[aria-label="Rich text"]')
				?.click(),
		);
		expect(onChange).toHaveBeenNthCalledWith(2, "rich");
	});
});
