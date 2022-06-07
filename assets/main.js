const client = ZAFClient.init();
client.invoke("resize", { width: "100%", height: "300px" });

// Don't know app's Installation ID yet.
let installationId = 0;

// Name input field
const formName = document.getElementById("formName");

// Checkbox input
const myCheckbox = document.getElementById("myCheckbox");

async function getMetaData() {
	const metadata = await client.metadata();
	console.log("metadata:", metadata);

	// Need Installation ID when saving later.
	installationId = metadata["installationId"];
	console.log("installationId:", metadata["installationId"]);

	// Get and display app setting called "form_name" of type "text"
	formName.value = metadata.settings["form_name"];
	console.log("form_name:", metadata.settings["form_name"]);

	// Get and display app setting called "enable_role_restriction" of type "checkbox"
	let role_restriciton = metadata.settings["enable_role_restriction"];
	console.log("enable_role_restriction:", role_restriciton);

	// Set state of checkbox in the app UI
	if (role_restriciton == true) {
		return (myCheckbox.checked = true);
	} else {
		return (myCheckbox.checked = false);
	}
}

async function setMetaData() {

	// Get new values from user for form_name and enable_role_restriction app setting fields.
	const newFormName = formName.value;
	const newCheckboxValue = myCheckbox.checked;
	const data = { settings: { form_name: newFormName, enable_role_restriction: newCheckboxValue } };
	console.log("data:", data);

	const updateSettingsConfig = {
		url: `/api/v2/apps/installations/${installationId}.json`,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: "json",
	};

	// Update app settings and display result.
	const updateSettings = await client.request(updateSettingsConfig);
	console.log("Result:", updateSettings);
}
