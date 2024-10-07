
  ![License](https://img.shields.io/badge/license-mit-blue.svg)
  
## Description
A back-end social networking app built using MongoDB, Mongoose, and TypeScript provides a robust platform for managing user interactions, content, and connections. MongoDB's document-based NoSQL database allows for flexible storage of user profiles, posts, comments, and friendships, while Mongoose ensures schema-based data validation and structure. TypeScript enhances the app with static typing, improving type safety and reducing development errors. The app features RESTful APIs for user authentication, post creation, commenting, and managing connections or friend requests. Middleware handles input validation and error responses, ensuring reliability. Additionally, the app supports real-time features like notifications and live updates, leveraging WebSocket or similar technologies. The combination of MongoDB, Mongoose, and TypeScript results in a clean, scalable, and maintainable codebase.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Video](#video)
- [Tests](#tests)
- [Questions](#questions)

## Installation
1. Clone the repository: `git clone <your-repo-url>` and navigate to the project directory: `cd <your-repo-directory>`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Seed the database: `npm run seed`
5. Start the application: `npm start`

## Usage
Using Insomnia, you can interact with the back-end social media app by performing a variety of actions. You can manage users by adding new users, deleting existing users, and altering user details. Additionally, you can add and remove friends from your friend list. For posts and interactions, you can create, alter, and delete thoughts (posts) and add or remove reactions to these thoughts. You also have the ability to view all users, view specific thoughts, and see reactions associated with those thoughts. All of these functions are accessible through API endpoints, making Insomnia a powerful tool for testing and interacting with the app.

## Features

Route to get all friends
``` Route to get all friends
router.route('/:userId/friends').get(getAllFriends)

------------------------------------------------------

export const getAllFriends = async(req: Request, res: Response) => {
  try {
      const friends = await User.findOne({ id: req.params.id }, 'friends');
      res.json(friends);
      if (!friends) {
          res.status(404).json({ message: 'No friends found!' });
      }
  } catch(error: any){
      res.status(500).json({
          message: error.message
      });
  }
}
```

Route to get all reactions
``` Route to get all reactions
router.route('/:thoughtId/reactions').get(getReactions).post(createReaction);

------------------------------------------------------

export const getReactions = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought.reactions);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}
```

## Contributing
At this time, contributions are not being accepted for this project.

## License
This project is licensed under the MIT license.

## Video
[Watch the walkthrough video using this Google Drive Link](https://drive.google.com/drive/u/0/folders/1Zks_OHYze7cgAsKfNa-FxLruwauXen0L)

## Tests
There are currently no tests written for this application.

## Questions
If you have any questions, please reach out to me:
- Github: [vtencouchclimbr](https://github.com/vtencouchclimbr)
- Email: lmntrylmnt@gmail.com
  