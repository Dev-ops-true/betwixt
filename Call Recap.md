# Recap of our call

Deployment

What is deployment ? 

- Putting your app on the actual internet and making it accessible to others
- So far, we've been running our apps on localhost:3000 - 127.0.0.1 - my local computer.
- You might have used heroku before 
    - With a little magic, you can certainly make heroku do some interesting things
    - However, so far, we've been deploying a single app to heroku
- When I refer to an app, I'm referring to:
    - Rails Project
    - Game
    - Thermostat 
- What is Sinatra ? It's a web app, but more importantly, its a WEB SERVER. i.e. It can take a request from your web browser, analyze that request, and provide an appropriate response back to the browser. Maybe that's some HTML ? Maybe that's some Text? Idk. 
- For anything to be accessible on the internet, it must be running on a web server.
- What does a Rails Project include ? What does a sinatra project include ?
    - Controller
    - Views
    - Models
    - Lib code 
- When we run a Sinatra app, we run a *single* application on localhost:4537 -> Map that -> to My Sinatra App
    - Such that, an incoming request from the browser to localhost:4537/posts goes to my Sinatra application to my `/posts` handler in my Sinatra app
    - Something interesting to note, is that my Sinatra app:
        - Takes a request
        - Performs maybe a database operation
        - Manipulates some data
        - Binds that data to an ERB template
        - Renders that data + template = HTML view
        - Returns the resultant HTML back to the browser

- In the world of React, this is a little different.
    - Let's say we create a react app with create-react-app
    - When we run `npm run dev` or `yarn dev` (which is what you should be running) it'll say `Running on port 3000`
    - Webpack Development Server
    - A true React app, is not a server at all, it doesn't run on a server, it's simply a javascript file embedded in an HTML file.
    - We have this fancy localhost:3000 thing for DEVELOPMENT ONLY. 
    - This developments servers main purpose is hot reload. So that we can instantly see changes to our code in the browser, when we're developing. If we were to try and deploy this, you would find you are left with a JS file and maybe an HTML file and some CSS. So how do you run this on the internet then ?

- You would need a SERVER. Imagine we had a sinatra server
- Remember, react is psuedo-javascript that COMPILES to javascript

// postsController.rb
def '/posts' do
    erb :posts, { myThing: "The thing!" }
end

// posts.erb

```
<body>
<script src="/your-react-app.js">
<div id="root"/>
</body>
```

- SPICY TIME. If you were to visit a react app on the internet, you might notice something funny. How is it that requests to myreactapp.com/ with no route, load a react app, but requests to myreactapp.com/api return JSON data ? 
- Often times, there are two different web servers. One of those servers is our FRONTEND SERVER. This looks alot like the development server we had running on localhost:3000 when we ran `yarn dev` 
- Now, sometimes, the frontend server and the backend server are the same server. Sometimes they aren't. In the case of Create React App, they are not. In the case of Next.js, they are. 
- If, you were to have a separate frontend and backend server, you would typically, in your browser, connect to the FRONTEND SERVER. And the APP that your FRONTEND SERVER serves, would make requests to the BACKEND SERVER. For example ...

Let's say I have a component that's a search bar. And I type in my search query, and I want to search my database for a user with that name.

I would...

1. In my React app, fill out the form
2. In my React app, I'd submit the form
3. That request would go to my  BACKEND SERVER and proxy that request to my Database. By proxy, I mean, rather than my frontend directly speaking to my database, I send a request to my backend, who speaks to my database, and then my backend sends me back the response. The backend acts as a middleman in this transaction.
4. My backend server would send my frontend server back what it needs (JSON data), and then the frontend server would display that in my app.

Maybe another way to put this, is our Model and Controller are the backend and our View is the frontend. BIG ASTERISK - they still can be the same thing, if you want them to be (it depends™️)

## NEXT - HOW DOES THIS ALL RELATE TO NEXT ?

- The problem next is attempting to solve is that the above process is actually really annoying and complicated a lot of the time. Next is attempting to simplify this process, AND make money off you. 

- It does so by providing a framework of a framework. React is a javscript framework, the same way Sinatra is a Ruby framework. Next, is a REACT FRAMEWORK. It's a framework of a framework. What it does, is implement really common best practices with React, hides them away in a nice little box so you dont have to see them, and provides you with a simple way to interface with it
- Case in point - look at the api/hello.js file. Why is there this random 'handler' function. (Authors note: You can only have ONE handler function PER api file)
- This is abstracting a common process, but in a VERY OPINIONATED WAY. In this way, it borrows from the Rails philosophy CONVENTION OVER CONFIGURATION. This means, theres one way to do things, and you have to learn that way, but its generally a battle tested good way to do things so its not all bad. 
- Next acts as both the server and the client, and automatically handles all of the deployment of both, so you don't have to think about it 🎉
- NExt encourages you to build your FE and BE at the same time. NExt assumes, all backend code relates to frontend code. IF you had a backend which did way way way more than the frontend, next probably isn't the right choice for you. If they are roughly 1:1, then next will work for you !
- Next also does some magic where it generates routes for you automatically by just placing things in the pages folder. Normally, you'd have to create and configure your own router to do this.
- If I have a file called `pages/api/hello.js`, next is going to interepret this to mean that any request from the FRONT END APPLICATION to `/api/hello` will be handled by the handler function in this file
- Because of our CONVENTION over configuration, Next is really particular about routing a particular way. If I send a request from my frontend to `google.com` my request does not go to google.com. It instead goes to, localhost:3000/google.com 
- So rather than my frontend contacting google I want to proxy it through my backend to talk to google, and give me back answers
- This is only true for next and things like next. To be clear you would just contact google directly from your front end most of the time if we aren't working within a next app.
