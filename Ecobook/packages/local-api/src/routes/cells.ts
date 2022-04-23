import express from 'express';
import fs from 'fs/promises';
import path from 'path';
interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
const defaultCells = [
  {
    content:"## Eco-Book\n**This is an  interactive coding environment, You can write JavaScript, see it executed, and write comprehensive using markdown**\n\n- Click any text cell (including this one ) to edit\n\n- The code in each code editor is all joined together into one file. if you define a variable in cell #1, you can refer to it in any following cell.\n\n- You can show any React component, string, number, or anything else by calling the `show `function. This is a function built into this environment. Call show multiple times to show multiple values.\n\n- Re-order or delete cells using the button on the top right\n\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened notebook with, So if you ran `npx eco-note serve test.js`, all of the text and code you write wil be saved to the` test.js` file\n\n",
    type:"text",
    id:"default78"
  }, {
    content: `
    import React from 'react';
    import ReactDOM from 'react-dom';

    const rootElement = document.querySelector('#root');

    const defaultProps = {
      title: 'Hello World',
      color: 'red'
    }

    const App = (props) => {
      return (
        <div>
          <h1 style={{ color: props.color }}>{props.title}</h1>
        </div>
      );
    };

    ReactDOM.render(<App {...defaultProps} />, rootElement);
    /**
     * you can comment previous command ReactDOM.render(<App {...defaultProps} />, rootElement);
     * and unComment the show function 
     */
    // show(<App {...defaultProps} /> )
    `,
    type:"code",
    id:"default45"
  }
]
export const createCellsRouter = (fileName: string, dir: string) => {
  const router = express.Router();
  router.use(express.json())
  debugger;
  const fullPath = path.join(dir, fileName);
  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
      debugger;
      res.send(JSON.parse(result));
    } catch (_error) {
      const error = _error as { code: string};
      if (error.code === 'ENOENT') {
        // Add code to create file and add default cells 
        await fs.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8');
        const result = await fs.readFile(fullPath, { encoding: 'utf-8'});
        res.send(JSON.parse(result));
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
