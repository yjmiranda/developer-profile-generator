const inquirer = require("inquirer");
const axios = require("axios");


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
]).then(function(response){
    callGithub(response.username);
});

function callGithub(username){

    var queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(response){
        var profileImage = response.data.avatar_url;
        var location = response.data.location;
        var githubProfile = response.data.url;
        var blog = response.data.blog;
        var bio = response.data.bio;
        var numRepos = response.data.public_repos;
        var numFollowers = response.data.followers;
        var numStars = response.data.public_gists;
        var numFollowing = response.data.following;


        console.log(username);
        console.log(profileImage);
        console.log(location);
        console.log(githubProfile);
        console.log(blog);
        console.log(bio);
        console.log(numRepos);
        console.log(numFollowers);
        console.log(numStars);
        console.log(numFollowing);
        


    });
}