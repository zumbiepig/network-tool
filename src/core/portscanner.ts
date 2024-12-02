import net from 'net';

export class PortScanner {
	async scan(
		host: string,
		startPort: number,
		endPort: number,
	): Promise<number[]> {
		const openPorts: number[] = [];

		for (let port = startPort; port <= endPort; port++) {
			try {
				const isOpen = await this.checkPort(host, port);
				if (isOpen) {
					openPorts.push(port);
				}
			} catch {
				continue;
			}
		}

		return openPorts;
	}

	private checkPort(host: string, port: number): Promise<boolean> {
		return new Promise((resolve) => {
			const socket = new net.Socket();

			const onError = () => {
				socket.destroy();
				resolve(false);
			};

			socket.setTimeout(1000);
			socket.once('error', onError);
			socket.once('timeout', onError);

			socket.connect(port, host, () => {
				socket.end();
				resolve(true);
			});
		});
	}
}
