![picture alt](http://static.weboffice.uwa.edu.au/visualid/core-rebrand/img/uwacrest/uwacrest-blue.svg)
# CITS3403-Project-2

# Stage 2: Backend functionality

The project Stage II is to develop a reactive web application to fill in the functionality of your webpage. This is **worth 20%** of the total assessment. **Stage II is due Friday 11:59pm May 26.**

The second stage will combine the best parts of each groups submission for part I and add backend functionality (user authentication, matching algorithm, notification services). The web application should be implmented using a MEAN stack, and provide at least the following functionality:

  * A user account and login feature.
  * The ability to edit personal details and preferences.
  * A method to browse potential matches, and initiate some form of contact or communication.
  
Bonus marks will be available for the following types of features:

  * Reacting to other users events (a new match has logged on, or some is viewing your profile...).
  * Realtime chat between logged in users.
  * Graphical representations of match quality.
  * Location based matching.
  * and feel free to propose other types of features I can include here...
  
The second part of the project has the following deliverables:

A complete MEAN stack providing the functionality of the project. This should be submitted as a code repository with instructions for launching the application on a cloud platform.

The application should include an HTML5 website with the following pages (or functions):
  * a page collecting user data
  * a page displaying potential matches (a a list or individually, or both)
  * a page explaining the matching algorithm
  * at least one page describing the architecture you used, the design choices you made and any difficulties encountered along the way.
  * one page describing the test and validation strategy and results.
  * one page giving short bios of yourself, and any references used.

## Marking Scheme
  * Javascript-code quality, difficulty, execution 20%
  * Persistence and User authentication 20%
  * Testing 10%
  * Design 20%
  * Style - look and feel, usability 15%
  * Content - coherence, effectiveness 15%
  * Bonus marks - 5% per element
  
## Running the App
The application requires that node be installed and is also dependent on the following npm packages: 
 * express
 * mongoose
 * @google/maps
 * passport
 * passport-local
 * passport-local-mongoose
 * express-session
With all these dependencies installed all you have to do is run the command 'npm start' from within the project's root directory.  


