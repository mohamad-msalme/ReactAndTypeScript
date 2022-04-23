"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const defaultCells = [
    {
        content: "## Eco-Book\n**This is an  interactive coding environment, You can write JavaScript, see it executed, and write comprehensive using markdown**\n\n- Click any text cell (including this one ) to edit\n\n- The code in each code editor is all joined together into one file. if you define a variable in cell #1, you can refer to it in any following cell.\n\n- You can show any React component, string, number, or anything else by calling the `show `function. This is a function built into this environment. Call show multiple times to show multiple values.\n\n- Re-order or delete cells using the button on the top right\n\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened notebook with, So if you ran `npx eco-note serve test.js`, all of the text and code you write wil be saved to the` test.js` file\n\n",
        type: "text",
        id: "default78"
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
        type: "code",
        id: "default45"
    }
];
const createCellsRouter = (fileName, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    debugger;
    const fullPath = path_1.default.join(dir, fileName);
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Read the file
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
            debugger;
            res.send(JSON.parse(result));
        }
        catch (_error) {
            const error = _error;
            if (error.code === 'ENOENT') {
                // Add code to create file and add default cells 
                yield promises_1.default.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8');
                const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf-8' });
                res.send(JSON.parse(result));
            }
            else {
                throw _error;
            }
        }
        // if Read throw and error 
        // Inspact the error , see if it says that the file does not exist
        // parse a list of cels out of it 
        // send list of cells back to browser
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Take the list of cells from the request obj
        // serialize them
        const { cells } = req.body;
        // Write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: 'okay' });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
