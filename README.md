# Project: Todo App

[Live Preview](https://sagewelky.github.io/battleship/)

## Description:

### Overview:

A simple SPA implementation of the game Battleship made with TDD for base components, a state machine and queue system for control flow, and a first-attempt at putting deeper emphasis on decoupled code through design patterns and pre-planning.

### Features:
* Start screen to Play screen cross-screen animations. mpa-viewTransitions-esque animations achieved through careful namespace handoff during SPA startViewTransition sequences.
* Human vs. Human, Human vs. CPU, and CPU vs. CPU modes with tailored features, such as anti-cheating modal for passing the laptop only activated when both players are human.
* Drag and drop ship placement that contextualizes the drop location to the location the on the ship the mouse is holding it from, and a preview highlight for clarity.
* Keyboard-controlled toggle of ship orientation for convenient interfacing when placing ships either vertically or horizontally.
* Granting of an additional guess before ending turn upon landing hits.
* Flashing indicator showing rejection of a guess that has already been tried.
* Turn-sensitive preview highlight on grid square hover for making guesses in order to help indicate both guess placement and that it is actively your turn to make a guess/follow-up guess.
* Display for status of last guess, such as miss, hit, ship has been sunk, or victory.
* Display for remaining ships for each player as a health amount.
* A dynamic instruction panel to help clarify controls and how to play.
* A color key to indicate what the color of a grid-tile indicates.
* Responsive and dynamic layout for different window or device sizes.
* A game board that scales size dynamically based on the dynamic viewport while also retaining its square shape.
* Artificial delays in transition between sequential animations and for CPU actions to keep the user experience feeling smooth.


## Personal Goals for the Project:

### Initial:
 My goals for this project are to get practice with TDD via my core logical components, improve my ability to construct control flow by investigating and implementing new design patterns, reduce the complexity of maintaining my css, learn and use some of the newer features of css to make my ui components more responsive; dynamic; and maintainable, and refine my ability to write modular and loosely coupled code. Though more vaguely defined, I also intend to be more deliberate in my planning process, and as part of that developing a better sense of what challenges/requirements are reasonable for me to predict needing to account for at a given stage of planning/development and what is a reasonably fleshed out working solution planned out to iterate on later. I intend this to be a combination learning what I should be comfortable not knowing at which stages, alongside it being an attempt to create some heuristic for good planning.

### Reflection:

The most immediate thing that stands out while reflecting on this project is the sheer amount of time I ended up spending on learning new things as a part of both the planning and development stages this time around, as well as how much it ended up paying off. Keeping the code for control flow clean has been a thorn in my side for prior projects, and the things I ended up learning in the pursuit of tackling that issue ended up being even more insightful and broadly applicable than I had hoped. For example, delving deeper into how things like SOLID Principles apply to something multi-paradigm like JavaScript that uses duck-typing and lacks interfaces lead me down an exploration of programming paradigms and design patterns which, among other things, helped inform my choice of finite-state machine as the primary mechanism for managing control flow in a clean and less tightly coupled way. Many of my design choices arose from elements of what I learned, in fact. As another related example, the use of a queue built into my state machine came out of learning about the component decoupling and asynchronous processing enabled by task queues. My implementation was ultimately constructed more around both the concept of pausing execution during event driven input such that execution order could be preserved and the concept of keeping the call stack from getting too many layers deep.

The next thing that stands out was how useful or not different (newish) css features ended up being in practice. The viewTransitions turned out to largely be more headache than they were worth, with many of the details for how the browser performed an animation being less than ideal. The most frustrating was having the board’s side container animation expanding in both the Y-axis and X-axis for the setup phase transition when the css dimensions only had the X-axis changing. It was also needlessly complicated to transition one element in a given component A into becoming a different element in a given component B for this SPA despite it being a fairly simple thing to do for MPAs. My takeaway from it was that the slight automation of animations is very selectively useful, and comes at a steeper performance cost than is often worth it, and as such the main use I would have for it would be simple (and limited) MPA transitions to make navigating between pages within the same domain feel more responsive. On the other end of the spectrum, container units and queries, dynamic viewport units, custom css properties, and css layers each pulled more weight than I had expected. The layers in particular fit incredibly naturally into my work flow, and removed a lot of the headache from working on components that often comes from writing css rules for different goals of a component, or the specificity of selectors getting out of hand to manage. I think I need more practice with them in order to get the most out of their potential, as I definitely could use a little work keeping the method of selection and grouping components more logical and consistent, but even untangling and organizing my css through the use of layers as is has helped make potential areas to improve easier to see and conceptualize how to do. Container units were helpful once I got a feel for them, and has already changed how I intend to go about planning out my next project. Dynamic viewport units feel like they should very much be used as a companion to container units, and will likely be what I primarily use outside of container units in future projects. I still find other units to have their place, but I find them less broadly appropriate than before this project. Container queries I still want to get more practice with, but I can already see their potential for conditional rescaling having a solid place in my tool belt.

Moving to some of the things I want to learn from, the use of css grid for making grid tiles I’ll eventually need append items to was a bit of a nightmare, especially when trying to line up the coordinates for those grid lines to my coordinate storing functions on the logical component side. Keeping the ui model and logic model in line with each other was something that I accounted for, but the numbering system for grid lines was not. In the future I’ll know to start with a model made in terms of css grid, and make an immediate helper function to translate back and forth into a coordinate system more explicitly designed to be more clearly and cleanly be translated with css grid. Much of “more explicitly designed” will simply be defining the direction and indexing to line up better with css grid’s, however It might extend to a coordinate offset function so an append always happens from left-to-right and up-to-down. The next lesson I want to carry forward would be creating more explicitly drawn up version of both the ui and logic representations of items similar to the battleships, ensure that I am storing a reference to the html element inside my logic-side representation and the object representation’s ID inside a dataset value in the ui representation, and make a very explicit format converter earlier on than I did so I can more reasonably input any version of an object into a helper function and it can automatically handle retrieval or creation of the appropriate format where necessary. Test driven development also proved difficult to keep myself to at times, as visualizing what I needed a component to handle was often easier to draft a rough model of than to arrive at through writing tests for code that doesn’t exist. I largely chalk that up to experience, and I’ll probably improve with practice, but I’d still like to attempt to develop a more formal heuristic on how I should be shifting my perspective to be most effective going forward.

## What I'd Want To Do Returning To This Project:

Despite getting to most of the features I wanted, there’s actually a lot I’d want to do returning to this project. Some of it due to regrets I’d like to amend, but also some of it due to successes I’d like to capitalize and expand on. Firstly, I vehemently dislike how my ship placement code looks for the setup phase. I’d love to go back and remake those functions in a format that allows for cleaner reuse assigning any given element to be a container for any given draggable object. On a related note, I’d also like to clean up how my html element representations of game board pieces are stored, so I can unify the creation of the element and logic component, and pull that out into a helper function. I’d also love to go back and better organize both the helper functions and my folder structure for better clarity.

The next adjustment I’d make would be to the control flow. I likely could find a way to offload handling the asynchronous nature of human player inputs to pausing the task queue with some adjustment, which would allow me to trim down the coupling between the FSM and the components a given state operates on. By making the FSM promise-agnostic, I can actually edit and more dynamically define the steps for a given FSM state based on other variables. This is plausible because of how well separated the components for the project are, and would give me a good reason to further decouple and modularize my design. I’d pair this with making the functions I’ve written have more input fields with default assignments, such that more fundamental traits of the game could be altered without issue, such as changing the number of players part way through a game, or allowing extra ships to be spawned in. At this point it really wouldn’t be battleship, but I like to see this project as the machine for handling a given game or ruleset fed into it more than a particular game itself, and this would help transform it into something entirely unique.

The fun concept I have is to replace the interior of each FSM state with slightly modified observer pattern style notify functions. The notify function would be a class method of the Observer class, and the subscriber array would be paired with a state ‘getter’ data structure populated with what properties of which class instances need to be accessed in order for the subscribers to be fed the proper input. This would contain dependency graph that relates functions to specific state info requested to a value of the object’s property that has the corresponding getter and to any prior nodes they rely on executing as a contextual step. This could be dynamically constructed such that the execution rules for a given game state are incredibly dynamic, allowing for how a “turn” plays out to influence what the rules are. To put it concretely, I would love to clean up the project and adjust the existing code to meet that level of flexibility and decoupling because I find flexible, decoupled, modular code to be incredibly satisfying to write and build upon, and having a task that imposes a high degree of those qualities as requirements would lend excellently to building even better habits and deeper intuition about the traits of that kind of code. Outside of that, I think the challenge of planning out and implementing a combination of complex (in its designing, not its functioning) data structures to enable the dynamic insertion of steps into game states would be interesting in its own right.  Lastly, I made “perfect is the enemy of good” style sacrifice with the project, making sure that the features I set as the minimum bar were all reached, and forcing myself to prioritize anything past that against time put into this project versus continuing the curriculum. This project took a long time, partially due to the amount of things this course was trying to embody being represented through this project, partially due to the amount of added goals I put on top of that in order to feel like I was meeting the spirit of the lessons to this point, and partially due to expected and unexpected life events colliding. Most of what fell by the wayside I’m pretty okay with, especially compared to my todo app project, but that difference was born out of deliberate efforts to make what I “would have wanted to do coming back” to the last project instead “happen the first go-around” of the next project. In this case, that is absolutely the aesthetic design of my project. The visual design arose mostly from happenstance as I tested out different css tricks and tools to build broader experience, and the parts I ended up most satisfied with were those which I made very functional but also flexible. My working hypothesis is that this is largely due to my lack of focused experience with how to make stylistic themes in a sleek way for web components being paved over somewhat by ease of iteration and adjustment, and the overall problem being symptomatic of my struggle with planning a theme thoroughly enough ahead of time to foresee what I need to account for in designing a layout or component. So coming back I’d love to rip up a lot of the structure given by the root components, and the implementation of the ui components, so I can attempt to remake the ui components in a way that is less reliant on the parent layout, and instead is contained within something that can be the interface between them. I feel like this is somewhat obvious to do, and in fact I often try to think of how I structure my html to account for that, but if I could come back to this project already having a sense for what is and isn’t needed, I think I could throw out enough of the bloat to really get a sense of what is absolutely essential. This would also let me consolidate some of the problem solving I’ve had to do into more clear heuristics. A big example being how minimum heights has caused me headache with overflows when working with css grid, and how solving that should tell me about how to predict the structural needs and behavioral traits of a ui component for planning a layout and account for it, but so far has mostly just told me how to smooth over the problem with a considered implementation when I see what I’m currently working on has the potential to cause that type of friction. Reducing the complexity, and generalizing roles in a way that has better defined lines would also open the way to expanding my application of styles to better match the simplified and unified css rules often used in some large-scale modern applications to keep a consistent theme through consolidated styles applied to broad categories. I’m hoping to get a better swing at this next go-around, and have a result that lets me very easily test out sweeping theme changes, especially by better leveraging css layers now that I’m comfortable with them, but if I ever return to this project I still want to rip up the html and css so I can take full advantage of the potential this type of project has for creative expression in its visual design.
