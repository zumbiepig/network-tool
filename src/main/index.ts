import { Command } from 'commander';
import { SpeedTest } from '../core/speedtest';
import { PortScanner } from '../core/portscanner';
import "../gui/index.ts" with { type: "file" };

const program = new Command();

program.version('0.1.0');

program.action(() => {
	if (program.args.length === 0) {
		Bun.spawn(['bun', 'run', '-c', 'electron', './src/gui/index.ts'], {
			stdio: ['inherit', 'inherit', 'inherit'],
			env: { ...process.env, NODE_OPTIONS: '--import=tsx' },
		});
	} else {
		console.log(`error: unknown command '${program.args[0] ?? ''}'`);
		process.exit(1);
	}
});

program
	.command('speedtest')
	.description('Run a speed test')
	.action(async () => {
		const speedtest = new SpeedTest();
		const results = await speedtest.measure();
		console.log(results);
	});

program
	.command('scan')
	.description('Scan ports on a host')
	.argument('<host>', 'Target host')
	.option('-s, --start <port>', 'Start port', '1')
	.option('-e, --end <port>', 'End port', '1024')
	.action(async (host: string, options: { start: string; end: string }) => {
		const scanner = new PortScanner();
		const openPorts = await scanner.scan(
			host,
			parseInt(options.start),
			parseInt(options.end),
		);
		console.log('Open ports:\n', openPorts.join(', '));
	});

await program.parseAsync();
