var bleat = require('./index');

function logStatus(message) {
	console.log(message);
}

bleat.init(function() {
	logStatus("bluetooth ready");
	bleat.startScan(function(device) {

		bleat.stopScan();
		logStatus("found device: " + device.name);

		device.connect(function() {
			logStatus("connected to: " + device.name);

			Object.keys(device.services).forEach(function(serviceID) {
				var service = device.services[serviceID];
				logStatus("\nservice: " + service.uuid);

				Object.keys(service.characteristics).forEach(function(characteristicID) {
					var characteristic = service.characteristics[characteristicID];
					logStatus("\t└characteristic: " + characteristic.uuid);

					Object.keys(characteristic.descriptors).forEach(function(descriptorID) {
						var descriptor = characteristic.descriptors[descriptorID];
						logStatus("\t\t└descriptor: " + descriptor.uuid);
					});
				});
			});

			device.disconnect();
		}, function() {
			logStatus("\ndisconnected from: " + device.name);
			process.exit();
		});
	});
}, logStatus);