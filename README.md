Project Name = Zania Test
Made By - Yash Kushwah

### Project setup

npm install
npm run dev

port used for the project - http://localhost:5173/

# github repo - https://github.com/Yashkushwah34/zaniaTest

### Project Overview

In this project we have used React18, Typescript with tailwind CSS. Created some interfaces to create the blueprint for the data which we are going to get in response of hitting the api. For API calling we have used axios, for global state management we have used redux toolkit to store the data and persisted the data in session storage, so that if the page is reloaded, the data still remains the same and is stored in sessionStorage. You can see the configuration used to store the data in sessionStorage in store.js file which there in redux folder of the project. And with this we have created a mock server using mswjs, so that some simple api calling can be done and the response can be replicated as according to the real server.

### Challenges faced in the project

While starting the project, there are 2 ways in which this project can be started and main events of the project i.e. drag and dropevent and onClick events of card can be initialized

1. By attaching an event handler to each and every card, and by using this we can achieve the scenario that we want. But the drawback for this technique is, if the number of cards gets increased for eg. 30 cards or 100's of cards on a single page. Attacing an event handler to each and every single card for drag and drop functionality and onClick functionality will cost in more memory usage in frontend for a single page. Which can eventually lead to slower page load or slower page response, eventually decreasing the speed of the website.

2. By using event delegation techniques. In this, what we will do, that instead of attaching an event with each card on the page. We will attach some common eventHandlers that we want to a single parent elemnt, which is how it is been done in the project. This will eventually take less page memory, we donot have to keep track of the state of each and every card. Hence, not much compromising with the page speed.

While saving the data while creating a new card or rearranging the cards, there are 2 ways in which we can solve this problem i.e. calling the api in 5 seconds if any rearrangement of card has happened.

1. Throttling - With this method what we can do is, After the first api call, whatever the rearrangements you do, the second api call will only register after 5 seconds. The problem might arise with this case, As in this case if after first api call the actions are performed for 4 seconds, but not after the 4 seconds. So the api call won't happen untill and unless 5 seconds are completely passed and a new call is not made.

2. Debouncing - This is the technique we have used in the project, as in this way. It will check if any new reuqest are coming into picture and will wait for 5 seconds before making any api call, if in between any new request came up then it will cancel the previous request and check for 5 seconds with the new request data. This way, updation is alaways considered.

Please Note - To show that the data is getting saved after 5 seconds, each card has a number on top. Whihc usually tells on which position the card actually is. After reshuffling the number gets rearranged, so when the save api gets hit, you can see the order of the number which got reshuffled, getting reassigned. This way we can know that the save has happened and also once the save has happened, we can also see how many seconds, minutes and hours have passed since last update. Now setInterval can be used to check in every second how much time has passed but doing so might increase page memory. So, have given a refresh button on the left side of the date. Clicking on that we can see the updated time which has been passed after the last update. Also, to add a new card, image link has to be provided, so if the valid image link is not there. Then a dummy cat image will be displayed in place of it

For global statemanagement we can use both context or redux. But Taking the picture into account that many new states can be introduced in the future, leading to creating more context wrapper and really hard to track about the scenarios. So to overcome this problem we have used redux toolkit with built in thunk functionality and redux persist. So that even after page load the data remain the same on the page. (You can still go to the prevous data by cliking on Get Original Data Button)

### Improvements that can be further implemented

1. A new component can be created for handling the image portions. Since only on modal page and card components we have images right now so have not created a new component for it.
2. Since it was a single page, so we have not created the Main page component. instead we have used app.tsx file to make the changes. Which is fine for now, But can be improved by using app.tsx for only routing scenarios and moving all the other code to a new main component.
3. Since we only had once reducer, so no combine reducer property was used. But when the reducer has to increase, we need to configure the store for combine reducer scenario.
