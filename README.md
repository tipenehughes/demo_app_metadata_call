# Test getting and setting Zendesk Apps framework metadata

This app demonstrates usage of the [`client.metadata()`](https://developer.zendesk.com/api-reference/apps/apps-core-api/client_api/#clientmetadata) method to retrieve installation metadata such as app ID and installation ID. The app also demonstrates usage of the [Update App Installation API](https://developer.zendesk.com/api-reference/ticketing/apps/apps/#update-app-installation) to update installation metadata.

## Getting started

Follow these steps to get a local copy up and running.

<!-- Any required packages or dependencies prior to installation of the app-->
### Prerequisites

- Zendesk Command Line (ZCLI)

[Using Zendesk Command Line](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/#installing-and-updating-zcli)

### Installation
1. Clone the repo
```
git clone https://github.com/example.git
```
2. Validate and package the app
```
zcli apps:package
```
4. Upload the app to your Zendesk account and install. You will be prompted to enter an optional form name of your choosing, and enable or disable role retrictions. These are example installation settings defined under parameters in the `manifest.json` file.

[Uploading and installing a private app](https://developer.zendesk.com/documentation/apps/getting-started/uploading-and-installing-a-private-app/)

[Defining installation settings](https://developer.zendesk.com/documentation/apps/app-developer-guide/setup/#defining-installation-settings)

## NOTE:
* Despite the app successfully updating metadata/setting values, because these values are cached by ZAF at app load time, you need to do an app refresh. This reloads the app and gets the updated values via subsequent client.metadata() calls.
* PUT /api/v2/apps/installations/{id}.json API requires administrator rights. Agent level users cannot call this API.

<!-- Links to relevant resources such as help center articles or dev docs -->
## Additional Resources

- [Zendesk Apps Guide](https://developer.zendesk.com/documentation/apps/)
- [ZAF API documentation](https://developer.zendesk.com/api-reference/apps/apps-support-api/introduction/)
- [Manifest Reference - Parameters](https://developer.zendesk.com/documentation/apps/app-developer-guide/manifest/#parameters)

<!-- Issue reporting with link to repo issues page -->
## Issues
You can [create an issue on Github](https://github.com/zendesk/example/issues/new),
reach out in our [Developer Community](https://support.zendesk.com/hc/en-us/community/topics),
or report the issue in the [Zendesk Developers Slack group](https://docs.google.com/forms/d/e/1FAIpQLScm_rDLWwzWnq6PpYWFOR_PwMaSBcaFft-1pYornQtBGAaiJA/viewform).