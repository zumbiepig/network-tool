import { SpeedTest } from '../core/speedtest';
import { PortScanner } from '../core/portscanner';
document.addEventListener('DOMContentLoaded', () => {
	document
		.getElementById('runSpeedtest')?.addEventListener('click', () => {
			void (async () => {
				const speedtest = new SpeedTest();
				const results = await speedtest.measure();
				const speedtestResults = document.getElementById('speedtestResults');
				if (speedtestResults) {
					speedtestResults.innerHTML = `
					Download: ${results.download.toFixed(2)} Mbps<br>
					Upload: ${results.upload.toFixed(2)} Mbps<br>
					Ping: ${results.ping.toString()}ms
				  `;
				}
			})();
		});

	document.getElementById('runScan')?.addEventListener('click', () => {
		void (async () => {
			const host = (document.getElementById('host') as HTMLInputElement).value;
			const startPort = parseInt((document.getElementById('startPort') as HTMLInputElement).value);
			const endPort = parseInt((document.getElementById('endPort') as HTMLInputElement).value);

			const scanner = new PortScanner();
			const openPorts = await scanner.scan(host, startPort, endPort);
			const scanResults = document.getElementById('scanResults');
			if (scanResults) {
				scanResults.innerHTML = `
				Open ports: ${openPorts.join(', ')}
			  `;
			}
		})();
	});
});
