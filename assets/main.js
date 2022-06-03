let client = ZAFClient.init();
client.invoke("resize", { width: "100%", height: "300px" });

// Don't know app's Installation ID yet.
let installationId = 0;

// Name input field
const formName = document.getElementById("formName");

// Checkbox input
const myCheckbox = document.getElementById("myCheckbox");

function getMetaData() {
	client.metadata().then(function (metadata) {
		console.log("metadata:", metadata);

		// Need Installation ID when saving later.
		console.log("installationId:", metadata["installationId"]);
		installationId = metadata["installationId"];

		// Get and display app setting called "form_name" of type "text"
		console.log("form_name:", metadata.settings["form_name"]);
		formName.value = metadata.settings["form_name"];

		// Get and display app setting called "enable_role_restriction" of type "checkbox"
		let role_restriciton = metadata.settings["enable_role_restriction"];
		console.log("enable_role_restriction:", role_restriciton);
		if (role_restriciton == true) {
			return (myCheckbox.checked = true);
		} else {
			return (myCheckbox.checked = false);
		}
	});
}

function setMetaData() {
	console.log(installationId);

	// Get new values from user for form_name and enable_role_restriction app setting fields.
	let newFormName = formName.value;
	let newCheckboxValue = myCheckbox.checked;
	let data = { settings: { form_name: newFormName, enable_role_restriction: newCheckboxValue } };
	console.log("data:", data);

	let updateSettings = {
		url: `/api/v2/apps/installations/${installationId}.json`,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: "json",
	};

	// Update app settings.
	client
		.request(updateSettings)
		.then((success) => console.log("success:", success))
		.catch((error) => console.log("error:", error));
}
