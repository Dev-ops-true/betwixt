Hey Gunel,
I've linked my things below that I've tried but nothing has 
been successful.
Not 100% where to put things. 

## EXAMPLE: Console Error Message - LDN to NYC by driving.
In Scripts/directions.js:201 it returns "Directions request returned no results"
There is also a response from Index.js:87 which gives out:
response: 

Object
- geocoded_waypoints: [{}, {}] (2)
- request: {destination: Object, origin: Object, travelMode: "DRIVING"}
- routes: [] (0)
- status: "ZERO_RESULTS"

### What I want to say 
IF  the console returns "Directions request returned no results"  flash "ERROR - Midpoint not available" 
ELSE
return the result

### Where I'm stuck
I dont know where to put the lines of code LOL. 
I litereally just want to render a message if no results returned.
This is from the first link:

render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }


### What I've tried
https://reactjs.org/docs/error-boundaries.html 
https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
https://dev.to/cesareferrari/how-to-display-error-messages-in-a-react-application-3g48 


