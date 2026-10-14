System 2: Greenhouse Sensor Logger UI  
Note to students: I have designed functionality of this assignment by using the following 
application as an inspiration: https://www.agrosense.com/ . However, you are not supposed to 
design anything mirroring the original site. Follow the instructions below to design what is 
outlined. The knowledge and skills required to complete this assignment is covered in Class 
Demo #2. Follow the lessons and make your notes.  
Assignment Category: Architecture & UX Deconstruction Schematics  
Deliverable Format: Public Link of your Github repository outlined in PDF document and 
uploaded to Moodle (uploaded as a README.md file to a dedicated Github repository) or 
formatted PDF text document uploaded to Moodle.  
Total Points: 30 Points  
Prerequisites:  
● Completion of Assignment 1A and 1B: Knowledge of HTML5 semantic tags, 
layout/anatomy of an HTML page and its styling implemented using CSS. ● JS: event 
handling concepts and persistent storage on client-side (instruction given through 
InClass Demo #2)  
1. Context & Educational Objective  
In Assignment 1*, what you developed is called a static web system. Static, because the “state” 
of the website does not change based on any kind of user interaction. From this assignment 
onwards, you will be developing “interactive” or “dynamic” web systems. Meaning, the content of 
the web UI will change depending on how users interact with it. Therefore, your frontend 
architecture bridges static HTML code with dynamic client-side state (implemented using 
JavaScript). 
As such, before writing your code, developers must (in addition to the HTML and CSS outlines) 
outline JavaScript event listeners and identify the mutating Document Object Model (DOM) (in 
simple terms, identify the HTML elements users can interact with and which HTML elements will 
be dynamically created or modified using JS through these interactions).  
To achieve this, UI schematics must sketch out:  
● User interaction paths and data entry boundaries.  
● State transitions: moving data from form inputs to in-memory collections and persistent 
storage.  
● DOM mutation maps: declaring exactly which HTML elements are static, which HTML 
elements are injected dynamically, and where event listeners attach.  
Some clarifications before we move forward:  
● Mutation meaning: In data structures, we refer to ‘mutation’ as changing the content of an 
existing data structure. For example, if you have an array like: [1, 2, 3]; you can mutate 
it by adding (or update/delete) a new entry (or existing entry) 4 to make the data 
structure: [1, 2, 3, 4].  
● Event Listeners: Is a function in your JS code that is associated with a HTML element. Its 
job is run in the background and keep track of a specific type of user interaction with that 
element. For example, suppose you have declared an event listener of type ‘mouse 
click’ on an HTML button. So anytime a user ‘clicks’ on this element, the function body of 
that event listener will get executed.  
2. Source Requirements: User Stories  
Analyze the following five user stories to derive your blueprint:  
● Story 1 (Controlled Sensor Entry): As a greenhouse technician, I want to record telemetry 
readings for a specific bay with real-time numeric bounds enforcement so that invalid 
sensor inputs (e.g., pH outside 0 to 14 or negative values) are rejected immediately.  
● Story 2 (Status Feedback): As an agronomist, I want the portal to calculate and display 
an environmental status tag ("Optimal", "Warning", "Critical Hazard") immediately upon 
input submission.  
● Story 3 (Offline Session Persistence): As a field worker moving between greenhouses, I 
want logged sensor entries saved to localStorage so that refreshing the browser retains 
active log history.  
● Story 4 (Log Removal & Queue Purging): As an operations supervisor, I want to delete 
resolved logs individually or purge the entire log history.  
● Story 5 (Dynamic Out-of-Bound Indicators): As a technician typing values into the form, I 
want input fields to show instant visual error feedback whenever entered numbers 
exceed acceptable plant growth ranges.  
Notes for Student/Additional Instructions: 
● These user stories mirror the InClass Demo #2. However, it is for a different business 
domain (instead of Healthcare, this one is in smart agriculture).  
● This is not an existing application that you will clone. You will have to build this site from 
scratch.  
● What is right/wrong, depends on addressing the requirements listed in the 
aforementioned user stories. Based on your understanding of the user stories you will 
have to:  
○ Decide what features need to be present  
○ What HTML elements will be needed  
○ Design your own CSS (layout and styling)  
○ Implement the necessary JS logic.  
○ As long as the required functionalities are met, you have the flexibility to 
test out your own creative design process.  
● To understand the domain context look up this website: https://www.agrosense.com/. 
Keep in mind that this is an inspiration website, you are not cloning this.  
3. Technical Implementation Guidelines  
Before calculating target thresholds, input fields must be constrained by physical reality bounds 
to prevent corrupt data entry. For this system, I am providing you the domain values such that 
you don’t have to look them up. Typically, these type of inputs will be provided by domain 
experts (your clients):  
● pH Input: unit: unitless  
● Electrical Conductivity (EC): unit: mS/cm  
● Air Temperature (Temp): unit: degree Celsius or degree Fahrenheit  
● Relative Humidity (RH): unit: percentage  
Classification Logic (to classify as "Optimal", "Warning", "Critical Hazard"):  
● Critical  
○ (pH < 5.0 OR pH > 7.5) AND (Temp < 55F OR Temp > 95F) AND (EC < 0.2 OR 
EC > 4.5 ) AND (RH < 30 OR RH > 90 )  
● Optimal  
○ (5.5 <= pH <= 6.5) AND (64.4F <= Temp <= 71.6F) AND (1.0 <= EC <= 2.0) AND 
(50 <= RH <= 70)  
● Warning  
○ (NOT Critical) AND (NOT Optimal)  
Note: AND, OR, NOT are logical operators.  
4. Required Deliverable Sections 
Your submitted document must follow this exact section structure shown below. If you missing 
any of the section, you will receive appropriate penalties. Make sure to carefully go through 
these instructions.  
Section 4.1: The Less-than-equal-4-Click User Journey Funnel  
Deconstruct the primary user workflow into four discrete steps or fewer, starting from initial page 
load to final user output (to simplify the process, I have given the states along with hint for each 
step):  
● Starting State: What will your UI show when it loads? (one to two sentences) UI will 
show a dashboard with a form and buttons to login and delete/reset. 
● Action 1: Data Entry & Real-Time Constraint Check. Explain this process in one to two 
sentences. How will this happen using your page elements? The user fills out the data 
information that will have some values that are required to fill. To check, it displays an 
error message if the user is using a value that is out of range. 
● Action 2: Log Submission. What will happen when user clicks submit button? The 
log record will be displayed on the dashboard after submission. 
● Action 3: Output Telemetry Inspection. How will your UI state change once it has 
received the submission? It will display on the dashboard that there is an active 
record. 
● Action 4: Output Resolution. How can your users interact with the output portion of your 
UI? The user will click a button to delete a record. 
● Terminal State. What will the final state of your UI look-like after the user is done 
interacting with your app? Remember, the correct answer here is your ability to interpret 
what a ‘completed’ user interaction looks like and in response to that explain what the UI 
state will look like.  The user will be able to type their information and click a button for 
submission and deletion. 
Section 4.2: Don Norman Usability & Constraint Audit  
Answer the questions listed in the third column of the table below in your own words. 
The system context and Don Norman learning principles are given in the 2nd and 1st columns, 
respectively. 
Norman Principle / Concept  System Context  Questions to Answer 
Using Concrete 
Implementation 
Mechanism (DOM / HTML 
/ JS) 
Gulf of Execution  Typing numeric sensor  
metrics (pH,  
ElectricalConductivity[E
C], Temp, Humidity) 
How do field labels, units 
of measure, and 
placeholder attributes 
clarify expected formats 
to the user?  It will have 
range and displays the 
ranges being bounded 
from. 
Gulf of Evaluation  Ingesting sensor values 
after clicking "Record 
Reading" 
How does the system  
immediately communicate 
whether the input given is in 
a normal, warning, or 
hazard 
 
 
  State? It will display an 
feedback based on the 
user’s data information 
System Constraint  E.g. Water pH 
Boundaries (0.0 <= pH 
<= 14.0) 
What attributes and 
validation conditions 
prevent impossible 
scientific values from 
entering state?* See hint 
after this  
Table. 
Using min, max, step will 
prevent the values being out 
of bounds. 
Visual Feedback State  
Error Recovery  
Real-Time Input Error /  
Out-of-Bounds 
Accidental or test data  
submissions 
What visual property or 
class change alerts the 
user that a typed number 
is  
dangerous/wrong 
before submission? 
The record will have 
an error icon if there 
was an error in the 
record. 
What affordance exists 
to clear bad records or  
accidental inputs from 
the active queue? It will 
be removed from the 
localStorage after 
incorrect information. 
Section 4.3: Component, DOM Tree & Event Target Architecture  
Deconstruct the full webpage UI document into a bulleted component tree modeling the DOM 
hierarchy. (using indentation as I have shown you in class demo).  
Mandatory Rules for the Tree:  
● (As) Minimal as possible Generic <div>s used: High-level sections must use semantic 
elements (<header>, <nav>, <main>, <section>, <article>, <footer>). Generic <div> tags 
may only be used for micro-groupings/containerzation for later styling if structurally 
necessary.  
● Heading Order Integrity: Headings must follow a strict logical hierarchy (<h1> then <h2> 
then <h3>) without skipping levels.  
● Form Constraint Annotations: Every input tag in the tree must explicitly state its native 
constraint attributes (e.g., type, min, max, step, required/optional).  
● CSS Properties: write CSS rules, flex directions, grid templates, or color values. Focus 
strictly on content structure and semantic tags. We are not expecting you to write the 
entire CSS style blocks associated with a HTML element. Only the major properties like 
display. See the example screenshot I have provided in Assignment 1A write up. Notice 
in the example how and where the CSS properties are written. That is what is expected 
of you - only the CSS layout properties for the major HTML elements.  
● DOM Node Classification: Explicitly label elements as [STATIC] (pre-rendered in HTML) 
or [DYNAMIC] (injected via JavaScript).  
● Event Target Declarations: Identify and label which HTML elements have event listeners 
attached (Event: submit or Event: Click etc.) 
Here is an example snippet below that covers all of these requirements:  
● <section class=”input-panel”> (CSS: flex on row, space-between, centered) [STATIC] ○ 
< header class=”input-panel-header”> [STATIC]  
■ <h2> (Text: “User Input Panel”)  
■ <button id=”btn-input”> [STATIC] (Event: type: ‘submit’)  
○ <section class=”input-feedback”> [DYNAMIC] (CSS: block display centered) 
■ And so on …..  
● <body> 
○ <Header class=”portal-header”> 
○ <Div class =”header-content”> 
■ <Div class=”brand”> 
■ <Span class=”brand-icon” 
■ <H1> (Text: Greenhouse Sensor Logger) <span 
class=”brand-sub”> 
○ <Div class=”header-status”> (Text: Active Queue:) <span 
id=”queue-count” class=”badge-count”>0 [DYNAMIC] 
○ <Main class=”portal-container”> 
■ <Aside class=”panel form-panel”> [STATIC] 
● <H2 class=”panel-title”> (Text: “Record Telemetry Readings)  
● <Div id=”form-error banner” class=”alert alert-danger hidden” 
role=”alert”> 
● <Form action=”#” id=”telemetry-form” novalidate>  
○ <Div class=”form-group”> (CSS: flex on row, column, gap, margin 
bottom) 
■ Label 
■ Input 
■ Div class=”form-row” (CSS: flex, gap) 
■ Div class=”form-group” (CSS: flex on row, column, gap, margin 
bottom) 
■  
■ Label  
■ span 
■ Input  
■ Div class=”form-row” (CSS: flex, gap) 
■ Div class=”form-group” (CSS: flex on row, column, gap, 
margin bottom) 
■ Label 
■ Input 
■ span 
■ Div class=”form-row” (CSS: flex, gap) 
■ Div class=”form-group  (CSS: flex on row, column, 
gap, margin bottom) 
■ Label 
■ span 
■ Input  
■ Div class=”form-row” (CSS: flex, gap) 
■ Div class=”form-group” (CSS: flex on row, column, gap, 
margin bottom) 
■ Label 
■ span 
■ Input 
■ Button id=”btn-submit” 
class=”btn btn-primary 
btn-block” [STATIC] (Event type 
= ‘submit’) 
■ <Section class=”panel 
records-panel”> [STATIC] 
■ <Div 
class=”records-header”> 
■ <H2 
class=”panel-title” 
(Text: Telemetry 
Queue)> 
■ <Button 
id=”btn-clear-all” 
class=”btn 
btn-outline-danger 
btn-sm”> [STATIC] 
(Event type = ‘clear’) 
■ <Div id=”empty-state” 
class=”empty-state”> 
■ <Span class=”empty-icon”> 
■ P (Text: No active records 
logged.) 
■ <Ul id =”records-list” 
class=”records-grid” aria-live=”polite”> 
■ <Footer class=”portal-footer”> 
■ <P (Text: &copy; 
Greenhouse Sensor 
Logger.)> 
■ <Script src=”app.js”> 
Section 4.4: Data Schema  
This application will take user input and store is persistently on the client-side. You can replace 
the ‘client-side’ with a server and database in some other practical setups. Regardless of where 
the data is stored, whenever data is involved, the schematics must outline the data that is being  
stored. Typically, for the Web, developers store and transfer data packets as JSON objects (read 
this up by google search: What is JSON object). JSON objects are very similar in structure to 
JavaScript objects (but not the same).  
To make things concise, answer the following question in this section:  
Write the blueprint of the JS object that will store the data for this application. The object 
must outline the exact keys and data types stored in memory (either front-end or back-end).  
const telemetryReadingsSchema = { 
Id: “Number”, // Unique integer identifier 
pH: “Number”, // pH unit 
electricalConductivity: “Number”, // EC’s unit mS/cm 
airTemp: “Number”, // degree celsius or fahrenheit 
relativeHumidity: “Number” // RH unit percentage 
}; 
Example: Lets assume you have an app that stores information about student’s personal 
records. The Data Schema for the front end will be represented as an JS object as follows:  
const studentDemographicsSchema = {  
id: "String", // Unique alphanumeric identifier  
firstName: "String", // Student's given name  
lastName: "String", // Student's family name  
dateOfBirth: "String", // date format (YYYY-MM-DD)  
email: "String", // Academic or personal email address  
phoneNumber: "String" // formatted contact number  
};  
