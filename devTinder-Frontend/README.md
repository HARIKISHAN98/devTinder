# DevTinder

1.

- Create a Vite + React application
- Remove Unecessary code and create a Hello World App
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar Component to App.jsx
- Create a NavBar.jsx seperate component file
- Install react router dom
- Create BrowserRouter > Rotues > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer

2. 

- Create a Login Page 
- Install Axios 
- CORS - Install Cors in backend - Add middleware to with configuration: origin, credentials: true
- whenever you are making API Call so pass axios => { withCredentials: true }

3. 

- Install react-redux + @reduxjs/toolkit 
- configureStore => Provider => createSlice => add reducer in store  
- Add redux devtools in chrome
- login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in 
- Refactor our code to add constants file + create a component folder
- you should not be access other routes without login 
- if token is not present, redirect user to login page
- Logout feature
