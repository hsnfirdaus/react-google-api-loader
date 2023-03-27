import { useState, useEffect, useRef } from "react";

interface UseGoogleApiOptions {
	/**
	 * Nonce applied to Google API script tag. Propagates to Google API's inline style tag
	 */
	nonce?: string;
	/**
	 * Callback fires on load [Google API](https://apis.google.com/js/api.js) script success
	 */
	onScriptLoadSuccess?: () => void;
	/**
	 * Callback fires on load [Google API](https://apis.google.com/js/api.js) script failure
	 */
	onScriptLoadError?: () => void;
}
export default function useGoogleApi(options: UseGoogleApiOptions) {
	const { nonce, onScriptLoadSuccess, onScriptLoadError } = options;

	const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] =
		useState(false);

	const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;

	const onScriptLoadErrorRef = useRef(onScriptLoadError);
	onScriptLoadErrorRef.current = onScriptLoadError;

	useEffect(() => {
		const scriptTag = document.createElement("script");
		scriptTag.src = "https://apis.google.com/js/api.js";
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.nonce = nonce;
		scriptTag.onload = () => {
			setScriptLoadedSuccessfully(true);
			onScriptLoadSuccessRef.current?.();
		};
		scriptTag.onerror = () => {
			setScriptLoadedSuccessfully(false);
			onScriptLoadErrorRef.current?.();
		};

		document.body.appendChild(scriptTag);

		return () => {
			document.body.removeChild(scriptTag);
		};
	}, [nonce]);

	return scriptLoadedSuccessfully;
}
