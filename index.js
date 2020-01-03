const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        message: "Enter your Github username: ",
        name: "username"
    },
    {
        type: "input",
        message: "Enter your favorite color: ",
        name: "color"
    }
])
.then(function(response){

    //store the responses into variables
    var username = response.username;
    var color = response.color.toLowerCase();

    //call the github api
    var queryURL = `https://api.github.com/users/${username}`

    axios.get(queryURL)
        .then(function(response){  

            //store all the relevant data into variables
            var profileImage = response.data.avatar_url;
            var name = response.data.name;
            var location = response.data.location;
            var githubProfile = response.data.url;
            var blog = response.data.blog;
            var bio = response.data.bio;
            var numRepos = response.data.public_repos;
            var numFollowers = response.data.followers;
            var numStars = response.data.public_gists;
            var numFollowing = response.data.following;
            
            //a variable to contain the html file to be generated
            var htmlFile = 
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${name} Profile</title>
                    <link rel="stylesheet" href="assets/css/reset.css">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <link rel="stylesheet" href="assets/css/style.css">
                    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
                </head>
                <body>
                    <style>
                        .card{
                            background-color: ${color};
                        }
                    </style>
                    <div class="container">
                        <div class="card text-center text-white mt-3">
                            <div class="card-body">
                
                                <img id="profile-img" src="${profileImage}" alt="Profile Image">
                
                                <h1 class="mt-3">Hello, My name is ${name}</h1>
                
                                <a class="info-link text-white" href="https://www.google.com/maps/place/${location}" target="#blank"><i class="fas fa-map-marker-alt"></i> San Francisco, CA</a>
                                <a class="info-link text-white ml-3" href="${githubProfile}"><i class="fab fa-github"></i> GitHub</a>
                                <a class="info-link text-white ml-3" href="${blog}"><i class="fas fa-rss"></i> Blog</a>
                            </div>
                        </div>
                
                        <p class="text-center mt-3" id="bio">${bio}</p>
                
                        <div class="container">
                            <div class="row justify-content-around mb-3">
                                <div class="card text-center text-white col-12 col-md-5 mb-3">
                                    <div class="card-body">
                                        <h2>Public Repositories</h2>
                                        <h2>${numRepos}</h2>
                                    </div>
                                </div>
                                <div class="card text-center text-white col-12 col-md-5 mb-3">
                                    <div class="card-body">
                                        <h2>Followers</h2>
                                        h2>${numFollowers}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-around">
                                <div class="card text-center text-white col-12 col-md-5 mb-3">
                                    <div class="card-body">
                                        <h2>Github Stars</h2>
                                        h2>${numStars}</h2>
                                    </div>
                                </div>
                                <div class="card text-center text-white col-12 col-md-5 mb-3">
                                    <div class="card-body">
                                        <h2>Following</h2>
                                        h2>${numFollowing}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                </body>
                </html>                
                `
                
        });
});