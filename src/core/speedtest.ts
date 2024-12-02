import https from 'https';

export class SpeedTest {
	async measure(): Promise<{ download: number; upload: number; ping: number }> {
		// Simple ping test using a HEAD request
		const pingResult = await this.measurePing();

		// Download speed test
		const downloadSpeed = await this.measureDownload();

		// Upload speed test
		const uploadSpeed = await this.measureUpload();

		return {
			download: downloadSpeed,
			upload: uploadSpeed,
			ping: pingResult,
		};
	}

	private async measurePing(): Promise<number> {
		const startTime = Date.now();
		return new Promise((resolve) => {
			https.get('https://www.google.com', () => {
				resolve(Date.now() - startTime);
			});
		});
	}

	private async measureDownload(): Promise<number> {
		// Using a sample file to test download speed
		return new Promise((resolve) => {
			const startTime = Date.now();
			https.get('https://speed.cloudflare.com/cdn-cgi/trace', (res) => {
				let data = 0;
				res.on('data', (chunk: Buffer) => {
					data += chunk.length;
				});
				res.on('end', () => {
					const duration = (Date.now() - startTime) / 1000; // seconds
					const speed = (data * 8) / (1024 * 1024 * duration); // Mbps
					resolve(speed);
				});
			});
		});
	}

	private async measureUpload(): Promise<number> {
		// Simplified upload test
		const data = Buffer.alloc(1024 * 1024); // 1MB of data
		return new Promise((resolve) => {
			const startTime = Date.now();
			const req = https.request(
				{
					hostname: 'speed.cloudflare.com',
					method: 'POST',
					path: '/cdn-cgi/trace',
				},
				() => {
					const duration = (Date.now() - startTime) / 1000;
					const speed = (data.length * 8) / (1024 * 1024 * duration);
					resolve(speed);
				},
			);
			req.write(data);
			req.end();
		});
	}
}
