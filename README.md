
# Cloudflare based Telegram Form Submission

This is a simple Cloudflare worker script that can submitt html form data with help of Cloudflare worker and Telegram bot api.

## What You need to get started:

To run this project, you will need a Cloudflare account and have to add the following environment variables to your Cloudflare workers settings.

`TELEGRAM_API_KEY` = "You get it from @Botfather"

`TELEGRAM_CHAT_ID` = "Your telegram Group id you get using @MissRose_bot "

## Setting up Telegram

### Step 1:
Open Botfather and create a new bot and you will get an API key keep it safe to use later

### Step 2:
Create a Group and add your newly created bot in the Group and give admin permission to it.(Its important to give admin permission to receive messages)

### Step 3:
You have to figure out your Group id, it can be done by adding another popular bot in your Group which is MissRose_bot ` https://t.me/MissRose_bot`
Give it admin permission and send `/id` in the group. You will get your group id which looks something like this `-10069696969669`

#### Ya, everything is done here for Telegram part 
## Setting up the Cloudflare part
### Step 1:
First of all login to cloudflare and make an account if you don't have one.

[![portfolio](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)](https://www.cloudflare.com/)

### Step 2:
Head towards Workers & Pages section and Create a new worker

### Step 3:
Give a name to your worker, it will be the final link that will be necessary later.

### Step 4:
click on Continue to project and head towards Setting > Variables > Add Variables.

And add the following Variables

`TELEGRAM_API_KEY` = "You get it from @Botfather"

`TELEGRAM_CHAT_ID` = "Your telegram Group id you get using @MissRose_bot "

and press "Deploy".

### Step 5:

Click on the Edit Code button located at the top rught corner. 
Copy the code from this repositories worker.js file and paste it there in cloudflare.

#### Locate the following line of code 
"Its locate at the 6th line"

```bash
  async function handleRequest(request) {
  const allowedOrigin = 'valid_url_here'; //your url goes here
```
#### Replace the "valid_url_here" with your website url and > Press "Deploy"
it is the url of your website from where you wanna allow to take html form data.
This will serve as the authorised website where this thing will be allowed to use.

### Step 6: 
Open the worker url and keep it safe for later use.

### Step 7: 

Use the worker link in your website, I have given a simple format in the repo as ```form.txt``` 

### And, Its done. Lets hop into the next step.

## HTML form Use case 
Html use case is farely simple just replace the `POST` `action` url to cloudflare workers url
#### Make sure for="" and id="" values are similar
I have given the minimum code for demonstration purposes please feel free  to use your creativity.

Here is the code you need to replace the `https://yourcloudflare.workers.dev/` to your workers url.
```
<form id="contactForm" action="https://yourcloudflare.workers.dev/" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
   		<label for="Phone">Phone No:</label>
        <input type="number" id="Phone" name="Phone" required>
   <br/>
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="Subject" required>
        <br>
      <!--   <label for="options">Options:</label>
        <select id="options" name="options" required>
            <option value="" disabled selected>Select an option</option>
            <option value="option1">cause one</option>
            <option value="option2">cause 2</option>
            <!-- Add more options as needed 
        </select>-->
        
```
#### All done Hope this becomes helpful for others thats it.
## Thank You
