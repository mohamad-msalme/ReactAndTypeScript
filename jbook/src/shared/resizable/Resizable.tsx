import React from 'react';
import { ResizableBox, ResizableProps } from 'react-resizable';
import './Resizable.css';

interface ResizableBoxProps {
  vertical: ResizableProps,
  horizontal: ResizableProps,
}

interface Props  {
  direction: 'vertical' | 'horizontal'
}

export const Resizable: React.FC<Props> = ({direction, children}) => {

  const [innerHeight, setInnerHeight] = React.useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = React.useState<number>(window.innerWidth);
  const [width, setWidth] = React.useState<number>(window.innerWidth*0.75);

  const resizableBoxProps: ResizableBoxProps = {
    vertical: {
      height: 300 ,
      width: Infinity,
      resizeHandles: ['s'],
      axis: "y",
      maxConstraints: [Infinity, innerHeight*0.9],
      minConstraints: [Infinity, innerHeight*0.1],
    },
    horizontal: {
      className: 'resize-horizontal',
      height: Infinity ,
      width: width,
      resizeHandles: ['e'],
      axis: "x",
      maxConstraints: [innerWidth*0.75, Infinity],
      minConstraints: [innerWidth*0.2, Infinity],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      }
    },
  }

  React.useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth*0.75 < width) {
          setWidth(window.innerWidth*0.75);
        }
      }, 100)
    }
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width])

  return <ResizableBox  {...resizableBoxProps[direction]}>{children}</ResizableBox>
}