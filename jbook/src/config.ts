
export const HTML = `
<html>
  <head>
    <style>
      html { background-color: white;}
    </style
  </head>
  <body>
    <div id='root'></div>
    <script>
      const handelError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' +err + '</div>';
        console.error(err)
      }
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handelError(event.error.message);
      });
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handelError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;
export const DEBOUNCE: number = 1000;