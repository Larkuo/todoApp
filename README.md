# ToDo App with React-Native

This is a simple todo list application to help me get familiar with [ReactJs](https://reactjs.org/)

This project was built to complete the Technical Assessment part of a job application. Instructions for this project can be found [here](https://docs.google.com/document/d/1DZx-Srfs6KBpq6cbFhHjOyEc--IkaJjhiNgXffsWRTg/edit)

## More Details
The ***components folder*** in the project contains the ***Task.js*** file; a component of the application which renders a task in an expandible card containing task details

The ***json_files folder*** contains 2 files;

***Tasks.json*** containing a JSON array of all tasks.
And, ***TaskCategories.json*** containing a JSON array of all existing task categories.

***App.js*** is the main application where all tasks are rendered in a list. It also has two button with new tasks & new categories can be added.


## Installation

Setup your development environment with [these](https://reactnative.dev/docs/environment-setup) instructions from the official [React-Native](https://reactnative.dev) website.

Clone this repository and change directory to the cloned respository
```bash
git clone https://github.com/Larkuo/todoApp
cd todoApp
```
To run the project in expo cli, cd into the project folder and
```bash
npm start
```

## How it Works

* Tap/Click the task to expand it
* Tap/Click the delete button to delete a task
* Tap/Click the square to mark a task as complete or incomplete
* Tap/Click the Add New Task button to add a new task
* Tap/Click the Add New Category but to add a new task category

[GIF of how the app works](https://github.com/Larkuo/todoApp/blob/main/assets/demo_MP4_AdobeCreativeCloudExpress.gif)

***In the app, there are tasks loaded before any new tasks/categories are added, these are from the Tasksjson file***


## Project Status
This project is mostly complete will be put on hold till I finish my semester at the end of May 2022. After which I'll attempt to improve the UI and UX plus add logins, etc.