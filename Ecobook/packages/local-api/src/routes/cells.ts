import express from 'express';
import fs from 'fs/promises';
import path from 'path';
interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
export const createCellsRouter = (fileName: string, dir: string) => {
  const router = express.Router();
  router.use(express.json())

  const fullPath = path.join(dir, fileName);
  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
      res.send(JSON.parse(result));
    } catch (_error) {
      const error = _error as { code: string};
      if (error.code === 'ENOENT') {
        // Add code to create file and add default cells 
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw _error;
      }
    }
    
    

    // if Read throw and error 
    // Inspact the error , see if it says that the file does not exist
    // parse a list of cels out of it 
    // send list of cells back to browser
  })
  
  router.post('/cells', async (req, res) => {
    // Take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[]} = req.body;
    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'okay'});
  })
  return router;
}
