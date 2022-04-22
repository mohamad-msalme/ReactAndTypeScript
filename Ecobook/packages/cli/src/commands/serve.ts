import { Command } from "commander";
import { serve } from '@eco-note/local-api';
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: {port: string}) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      const _fileName =  path.basename(filename);
      await serve(parseInt(options.port) , _fileName, dir, !isProduction);
      console.log(`
      Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`)
    } catch (_error) {
      const error = _error as { message: string, code: string };
      if (error.code === 'EADDRINUSE') {
        console.log('Port is in use, Try running on a diffrent port');
      } else {
        console.log('The propblem is', error.message);
      }
      process.exit(1);
    }
  });