import axios, { AxiosResponse } from 'axios';

interface Response {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then((res: AxiosResponse<Response>) => logTodo(res.data.title, res.data.id, res.data.completed));

const logTodo = (title: string, id: number, Finished: boolean): void => (
  console.log(`
  Todo title is: ${title}
  Todo Id is ${id}
  is Todo Finished ${Finished}`
  )
)
type Point_2D = {
  x: number;
  y: number;
}
const json = '{"x": 10, "y": 20}';
const coord = JSON.parse(json) as Point_2D;

const add = (a: number, b: number): number => a + b;
const divider = function(a: number, b: number): number {
  return b !== 0 ? a / b : NaN
}

function multiply(a: number, b: number): number {
  return a*b;
}

interface Forcast {
  date: Date,
  weather: 'sunny',
}
const forcast: Forcast = {
  date: new Date(),
  weather: 'sunny',
}

const logWeather = ({date, weather}: Forcast): void => {
  console.log(`Date is ${date.getDate()} weather is ${weather}`);
}
logWeather(forcast);

type DrinkType = [ color: string, carbonated: boolean, sugar: number]

const drinks: DrinkType[] = [['red', true, 40], ['red', true, 40]];

class Vehicle {
  drive(): void {
    console.log('Hello World');
  }
}

const vehicle = new Vehicle();
vehicle.drive();