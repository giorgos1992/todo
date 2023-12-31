# Project Name

## Introduction

This project is a [React Native](https://reactnative.dev) application developed as part of an interview exercise. It was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## The approach

In order to achieve the best to follow the best practices, I started by setting up different code quality tools for the codebase.

I have added typescript for strict typing, prettier for code formatting, jest and react-testing-library for unit testing and sonar for code coverage, code smells and vulnerabilities.

In addition, I have set up a pre-commit hooks using husky, that will automaticaly format all the changed files as well as running all the typescript, eslint and test checks to ensure that nothing is merged that can potentially break the app.



## Installation

To install and run this project, you will need to follow these steps:

1. Ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step. It is important to say that for android, minimum JAVA 17 is required.
2. Clone this repository to your local machine.
3. Navigate to the project directory and install dependencies with `yarn install`.
4. Start the Metro server with `yarn start`.
5.1 In a new terminal, start the application with `yarn android`.
5.2 In a new terminal, run `xcrun simctl list devices` to find a list with the available ios devices. `yarn pod:install && yarn ios --simulator="{iphone model}"` e.g.`yarn ios --simulator="iPhone 14"`.


## Demo

https://drive.google.com/file/d/16XmEgUBo4H_CkA5_OVE9U2U6twPS1AnB/view?usp=drive_link

## Usage

After you have started the application, you can star interracting with the application.

### TodoLists

In the first screen you can see the TodoLists screen. If there are any lists already created, you will see a list of them.

Above the list, there is a button that triggers a modal so a user can add a new list. By swipping a TodoList, the user can either edit or delete a list.

By clicking a TodoList, the user will be navigated to the TodoList screen.

### TodoList

In the TodoList screen the user can see all the items associated with a specific list.

At the top there are two actions.

At the left there is an IconButton where if clicked, a menu is shown so a user can either sort the items automaticaly or by creationDate, or hide/show the completed items.

At the right hand size, there is a button so a user can add new item to the list. If the value is empty, the input is highlighted and the done button is disabled.

Below this section, the user can find all the items of the list. The items have 3 statuses. ACTIVE, INACTIVE and EDIT. By clicking an item, status is changed from ACTIVE to INACTIVE and vice versa. By swiping an item, the user can either edit or delete it.

In edit mode, the card is being replaced by an input which acts the same way as the input in the dialog. To ensure this, the Input component was build as a reusable component. The only difference is that, because the edit item is not in a dialog, there is no submit button, hence I have added an IconButton that can be enabled using a prop which when clicked, the change is submitted.

### Extra

As soon as the user puts the application in background, I trigger a push notification that will be shown after 10 seconds.

In addition to redux for state management, I also use redux-persist, which manage the transfer and synchronisation of redux state and async-storage, in order to persist the data even if the application is closed.