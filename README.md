# React Google API Loader

React wrapper for Google API Loader script (https://apis.google.com/js/api.js).

## Usage

Simple example:

```js
import { useGoogleApi } from "@react-google-api/loader";

const loaded = useGoogleApi({
	onScriptLoadSuccess: () => {
		// Your success callback logic.
	},
});
```

For example you want to load Google Drive Picker library, this is simple usage of it:

```js
import React, { useState } from "react";
import { useGoogleApi } from "@react-google-api/loader";

export default function PickerLoader({ children }) {
	const [isPickerApiLoaded, setIsPickerApiLoaded] = useState(false);
	const isInjected = useGoogleApi({
		onScriptLoadSuccess: () => {
			window.gapi.load("picker", () => setIsPickerApiLoaded(true));
		},
	});
	return isInjected && isPickerApiLoaded ? children : <React.Fragment />;
}
```

Then in children of that component you can use `window.google` object.

### Example Integration with @react-oauth/google and use google picker

```js
const handleOpenPicker = (accessToken) => {
	const google = window.google;
	const picker = new google.picker.PickerBuilder()
		.addView(google.picker.ViewId.DOCS)
		.setOAuthToken(accessToken)
		.setDeveloperKey("YOUR_API_KEY")
		.setCallback(() => {
			let url = "nothing";
			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
				let doc = data[google.picker.Response.DOCUMENTS][0];
				url = doc[google.picker.Document.URL];
			}
			let message = `You picked: ${url}`;
			alert(message);
		})
		.build();

	picker.setVisible(true);
};

const handleGoogleLogin = useGoogleLogin({
	onSuccess: (tokenResponse) => handleOpenPicker(tokenResponse.access_token),
	scope: "https://www.googleapis.com/auth/drive.file",
});
```

This `useGoogleApi` hooks is adjustment of `useLoadGsiScript` hooks from [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
