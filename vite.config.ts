import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

export default defineConfig(() => ({
	plugins: [
		react(),
		tsConfigPaths(),
		dts({
			include: ["src"],
		}),
	],
	build: {
		lib: {
			entry: path.resolve("src", "index.ts"),
			name: "index",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format === "cjs" ? "cjs" : "es.js"}`,
		},
		optimizeDeps: {
			exclude: Object.keys(packageJson.peerDependencies),
		},
		esbuild: {
			minify: true,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
		},
	},
}));
