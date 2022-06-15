const client = ZAFClient.init();
client.invoke("resize", { width: "100%", height: "300px" });

// initializing the installationId
let installationId = 0;

// Name input field
const formName = document.getElementById("formName");

// Checkbox input
const myCheckbox = document.getElementById("myCheckbox");

async function getMetaData() {
	// Get app metadata
	const metadata = await client.metadata();
	console.log("metadata:", metadata);

	// Assigning the installationId to be used in setMetaData()
	installationId = metadata["installationId"];
	console.log("installationId:", metadata["installationId"]);

	// Get and display app setting called "form_name" of type "text"
	formName.value = metadata.settings["form_name"];
	console.log("form_name:", metadata.settings["form_name"]);

	// Get and display app setting called "enable_role_restriction" of type "checkbox"
	let role_restriction = metadata.settings["enable_role_restriction"];
	console.log("enable_role_restriction:", role_restriction);

	// Set state of checkbox in the app UI
	setCheckbox(role_restriction);
}

// Sets the checkbox.checked value based on role_restriction passed in freom getMetaData()
function setCheckbox(checkboxState) {
	if (checkboxState == true) {
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

	const updateSettingsConfig = {
		url: `/api/v2/apps/installations/${installationId}.json`,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: "json",
	};

	// Update app settings and display result.
	try {
		const updateSettings = await client.request(updateSettingsConfig);
		client.invoke("notify", "Metadata succesfullly updated");
		console.log("Success:", updateSettings);
	} catch (err) {
		client.invoke("notify", `Error: ${err.responseText}`, "error");
		console.log("Error:", err);
	}
}
